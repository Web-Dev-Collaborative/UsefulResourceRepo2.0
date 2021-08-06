import threading
import new
import logging
from itertools import chain

from django.contrib.contenttypes.models import ContentType
from django.db import DEFAULT_DB_ALIAS, router, connections
from django.db.models import get_model, get_models, UnavailableApp, signals, Manager, get_apps
from django.utils.encoding import smart_text
from django.utils import six
from django.utils.six.moves import input

from djangae.crc64 import CRC64


class SimulatedContentTypeManager(Manager):
    """
        Simulates content types without actually hitting the datastore.
    """

    _store = threading.local()

    def _get_id(self, app_label, model):
        crc = CRC64()
        crc.append(app_label)
        crc.append(model)
        return crc.fini() - (2 ** 63) #GAE integers are signed so we shift down

    def _get_opts(self, model, for_concrete_model):
        if for_concrete_model:
            model = model._meta.concrete_model
        elif model._deferred:
            model = model._meta.proxy_for_model
        return model._meta

    def _update_queries(self, models):
        """
            This is just to satisfy the contenttypes tests which check that queries are executed at certain
            times. It's a bit hacky but it works for that purpose.
        """
        conn = connections[router.db_for_write(ContentType)]

        if conn.use_debug_cursor:
            for model in models or []:
                if model not in self._store.queried_models:
                    conn.queries.append("select * from {}".format(ContentType._meta.db_table))
                    break

        self._store.queried_models |= set(models or [])

    def _repopulate_if_necessary(self, models=None):
        if not hasattr(self._store, "queried_models"):
            self._store.queried_models = set()

        if not hasattr(self._store, "constructed_instances"):
            self._store.constructed_instances = {}

        self._update_queries(models)

        if not hasattr(self._store, "content_types"):
            all_models = [ (x._meta.app_label, x._meta.model_name, x) for x in chain(*[ get_models(y) for y in get_apps() ]) ]

            self._update_queries([(x[0], x[1]) for x in all_models])

            content_types = {}
            for app_label, model_name, model in all_models:
                content_type_id = self._get_id(app_label, model_name)

                content_types[content_type_id] = {
                    "id": content_type_id,
                    "app_label": app_label,
                    "model": model_name,
                    "name": smart_text(model._meta.verbose_name_raw)
                }

            self._store.content_types = content_types

    def get_by_natural_key(self, app_label, model):
        self._repopulate_if_necessary(models=[(app_label, model)])
        return self.get(id=self._get_id(app_label, model))

    def get_for_model(self, model, for_concrete_model=True):
        opts = self._get_opts(model, for_concrete_model)
        self._repopulate_if_necessary(models=[(opts.app_label, opts.model_name)])
        return self.get_by_natural_key(opts.app_label, opts.model_name)

    def get_for_models(self, *models, **kwargs):
        for_concrete_model = kwargs.get("for_concrete_models", True)

        self._update_queries(
            [ (self._get_opts(x, for_concrete_model).app_label, self._get_opts(x, for_concrete_model).model_name) for x in models ]
        )
        ret = {}
        for model in models:
            ret[model] = self.get_for_model(model, for_concrete_model)

        return ret

    def get_for_id(self, id):
        return self.get(pk=id)

    def clear_cache(self):
        self._store.queried_models = set()

    def _get_from_store(self, id):
        try:
            return self._store.content_types[id]
        except KeyError:
            raise ContentType.DoesNotExist()

    def get(self, **kwargs):
        self._repopulate_if_necessary()

        if "pk" in kwargs:
            kwargs["id"] = kwargs["pk"]
            del kwargs["pk"]

        if "id" in kwargs:
            dic = self._get_from_store(int(kwargs["id"]))
        else:
            for ct in self._store.content_types.values():
                for k, v in kwargs.items():
                    if k not in ct:
                        raise ContentType.DoesNotExist()

                    if ct[k] != v:
                        break
                else:
                    dic = ct
                    break
            else:
                raise ContentType.DoesNotExist()

        def disable_save(*args, **kwargs):
            raise NotImplementedError("You can't save simulated content types")

        # We do this because some tests to comparisons with 'is' so we store
        # constructed ContentTypes in the thread local and return them if possible
        if dic["id"] in self._store.constructed_instances:
            return self._store.constructed_instances[dic["id"]]
        else:
            result = ContentType(**dic)
            result.save = new.instancemethod(disable_save, ContentType, result)
            self._store.constructed_instances[dic["id"]] = result
            return result

    def create(self, **kwargs):
        try:
            return self.get(**kwargs)
        except ContentType.DoesNotExist:
            logging.warning("Created simulated content type, this will not persist and will remain thread-local")
            new_id = self._get_id(kwargs["app_label"], kwargs["model"])
            kwargs["id"] = new_id
            if "pk" in kwargs:
                del kwargs["pk"]
            self._store.content_types[new_id] = kwargs
            return self.get(id=new_id)

    def get_or_create(self, **kwargs):
        try:
            del kwargs["defaults"]
            return self.get(**kwargs)
        except ContentType.DoesNotExist:
            raise NotImplementedError("You can't manually create simulated content types")

    def filter(self, **kwargs):
        raise NotImplementedError()

    def all(self, **kwargs):
        result = []

        for ct in self._store.content_types.keys():
            result.append(self.get(id=ct))
        return result


def update_contenttypes(app, created_models, verbosity=2, db=DEFAULT_DB_ALIAS, **kwargs):
    """
        Django's default update_contenttypes relies on many inconsistent queries which causes problems
        with syncdb. This monkeypatch replaces it with a version that does look ups on unique constraints
        which are slightly better protected from eventual consistency issues by the context cache.
    """
    if verbosity >= 2:
        print("Running Djangae version of update_contenttypes on {}".format(app))

    try:
        get_model('contenttypes', 'ContentType')
    except UnavailableApp:
        return

    if not router.allow_syncdb(db, ContentType):
        return

    ContentType.objects.clear_cache()
    app_models = get_models(app)
    if not app_models:
        return
    # They all have the same app_label, get the first one.
    app_label = app_models[0]._meta.app_label
    app_models = dict(
        (model._meta.model_name, model)
        for model in app_models
    )

    created_or_existing_pks = []
    created_or_existing_by_unique = {}

    for (model_name, model) in six.iteritems(app_models):
        # Go through get_or_create any models that we want to keep
        ct, created = ContentType.objects.get_or_create(
            app_label=app_label,
            model=model_name,
            defaults = {
                "name": smart_text(model._meta.verbose_name_raw)
            }
        )

        if verbosity >= 2 and created:
            print("Adding content type '%s | %s'" % (ct.app_label, ct.model))

        created_or_existing_pks.append(ct.pk)
        created_or_existing_by_unique[(app_label, model_name)] = ct.pk

    # Now lets see if we should remove any

    to_remove = [x for x in ContentType.objects.filter(app_label=app_label) if x.pk not in created_or_existing_pks]

    # Now it's possible that our get_or_create failed because of consistency issues and we create a duplicate.
    # Then the original appears in the to_remove and we remove the original. This is bad. So here we go through the
    # to_remove list, and if we created the content type just now, we delete that one, and restore the original in the
    # cache
    for ct in to_remove:
        unique = (ct.app_label, ct.model)
        if unique in created_or_existing_by_unique:
            # We accidentally created a duplicate above due to HRD issues, delete the one we created
            ContentType.objects.get(pk=created_or_existing_by_unique[unique]).delete()
            created_or_existing_by_unique[unique] = ct.pk
            ct.save()  # Recache this one in the context cache

    to_remove = [ x for x in to_remove if (x.app_label, x.model) not in created_or_existing_by_unique ]

    # Now, anything left should actually be a stale thing. It's still possible we missed some but they'll get picked up
    # next time. Confirm that the content type is stale before deletion.
    if to_remove:
        if kwargs.get('interactive', False):
            content_type_display = '\n'.join([
                '    %s | %s' % (x.app_label, x.model)
                for x in to_remove
            ])
            ok_to_delete = input("""The following content types are stale and need to be deleted:

%s

Any objects related to these content types by a foreign key will also
be deleted. Are you sure you want to delete these content types?
If you're unsure, answer 'no'.

    Type 'yes' to continue, or 'no' to cancel: """ % content_type_display)
        else:
            ok_to_delete = False

        if ok_to_delete == 'yes':
            for ct in to_remove:
                if verbosity >= 2:
                    print("Deleting stale content type '%s | %s'" % (ct.app_label, ct.model))
                ct.delete()
        else:
            if verbosity >= 2:
                print("Stale content types remain.")


def patch():
    from django.contrib.contenttypes.management import update_contenttypes as original
    signals.post_syncdb.disconnect(original)

    from django.conf import settings
    if getattr(settings, "DJANGAE_SIMULATE_CONTENTTYPES", False):
        from django.contrib.contenttypes import models

        if not isinstance(models.ContentType.objects, SimulatedContentTypeManager):
            models.ContentType.objects = SimulatedContentTypeManager()
    else:
        signals.post_syncdb.connect(update_contenttypes)
