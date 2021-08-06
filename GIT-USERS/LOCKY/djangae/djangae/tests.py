import os

from cStringIO import StringIO
import datetime
import unittest
from string import letters
from hashlib import md5

# LIBRARIES
from django.core.files.uploadhandler import StopFutureHandlers
from django.core.cache import cache
from django.core.signals import request_finished, request_started
from django.db import connections
from django.db import DataError, models
from django.db.models.query import Q
from django.forms import ModelForm
from django.http import HttpRequest
from django.test import TestCase, RequestFactory
from django.forms.models import modelformset_factory
from django.db.models.sql.datastructures import EmptyResultSet
from google.appengine.api.datastore_errors import EntityNotFoundError
from google.appengine.api import datastore
from django.test.utils import override_settings
from django.contrib.contenttypes.models import ContentType

# DJANGAE
from djangae.contrib import sleuth
from django.db import IntegrityError as DjangoIntegrityError
from djangae.db.backends.appengine.dbapi import CouldBeSupportedError, NotSupportedError, IntegrityError
from djangae.db.constraints import UniqueMarker
from djangae.indexing import add_special_index
from djangae.db.utils import entity_matches_query
from djangae.db.backends.appengine import caching
from djangae.db.unique_utils import query_is_unique
from djangae.db import transaction
from djangae.fields import ComputedCharField, ShardedCounterField, SetField, ListField, GenericRelationField
from djangae.models import CounterShard
from djangae.db.backends.appengine.dnf import parse_dnf
from .storage import BlobstoreFileUploadHandler
from .wsgi import DjangaeApplication
from djangae.core import paginator

try:
    import webtest
except ImportError:
    webtest = NotImplemented


class TestUser(models.Model):
    username = models.CharField(max_length=32)
    email = models.EmailField()
    last_login = models.DateField(auto_now_add=True)
    field2 = models.CharField(max_length=32)

    def __unicode__(self):
        return self.username


class UniqueModel(models.Model):
    unique_field = models.CharField(max_length=100, unique=True)
    unique_combo_one = models.IntegerField(blank=True, default=0)
    unique_combo_two = models.CharField(max_length=100, blank=True, default="")

    unique_relation = models.ForeignKey('self', null=True, blank=True, unique=True)

    class Meta:
        unique_together = [
            ("unique_combo_one", "unique_combo_two")
        ]


class TestFruit(models.Model):
    name = models.CharField(primary_key=True, max_length=32)
    color = models.CharField(max_length=32)


class Permission(models.Model):
    user = models.ForeignKey(TestUser)
    perm = models.CharField(max_length=32)

    def __unicode__(self):
        return u"{0} for {1}".format(self.perm, self.user)

    class Meta:
        ordering = ('user__username', 'perm')


class SelfRelatedModel(models.Model):
    related = models.ForeignKey('self', blank=True, null=True)


class MultiTableParent(models.Model):
    parent_field = models.CharField(max_length=32)


class MultiTableChildOne(MultiTableParent):
    child_one_field = models.CharField(max_length=32)


class MultiTableChildTwo(MultiTableParent):
    child_two_field = models.CharField(max_length=32)


class Relation(models.Model):
    pass


class Related(models.Model):
    headline = models.CharField(max_length=500)
    relation = models.ForeignKey(Relation)


class CachingTests(TestCase):
    def test_query_is_unique(self):
        qry = datastore.Query(UniqueModel._meta.db_table)
        qry["unique_field ="] = "test"
        self.assertTrue(query_is_unique(UniqueModel, qry))
        del qry["unique_field ="]

        qry["unique_field >"] = "test"
        self.assertFalse(query_is_unique(UniqueModel, qry))
        del qry["unique_field >"]

        qry["unique_combo_one ="] = "one"
        self.assertFalse(query_is_unique(UniqueModel, qry))

        qry["unique_combo_two ="] = "two"
        self.assertTrue(query_is_unique(UniqueModel, qry))

    def test_insert_adds_to_context_cache(self):
        original_keys = caching.context.cache.keys()
        original_rc_keys = caching.context.reverse_cache.keys()

        instance = UniqueModel.objects.create(unique_field="test")

        #There are 3 unique combinations (id, unique_field, unique_combo), we should've cached under all of them
        self.assertEqual(3, len(caching.context.cache.keys()) - len(original_keys))

        new_keys = list(set(caching.context.reverse_cache.keys()) - set(original_rc_keys))
        self.assertEqual(new_keys[0].id_or_name(), instance.pk)

    def test_pk_queries_hit_the_context_cache(self):
        instance = UniqueModel.objects.create(unique_field="test") #Create an instance

        #With the context cache enabled, make sure we don't hit the DB
        with sleuth.watch("google.appengine.api.datastore.Query.Run") as rpc_run:
            with sleuth.watch("djangae.db.backends.appengine.caching.get_from_cache") as cache_hit:
                UniqueModel.objects.get(pk=instance.pk)
                self.assertTrue(cache_hit.called)
                self.assertFalse(rpc_run.called)

    def test_transactions_clear_the_context_cache(self):
        UniqueModel.objects.create(unique_field="test") #Create an instance

        with transaction.atomic():
            self.assertFalse(caching.context.cache)
            UniqueModel.objects.create(unique_field="test2", unique_combo_one=1) #Create an instance
            self.assertTrue(caching.context.cache)

        self.assertFalse(caching.context.cache)

    def test_insert_then_unique_query_returns_from_cache(self):
        UniqueModel.objects.create(unique_field="test")  # Create an instance

        # With the context cache enabled, make sure we don't hit the DB
        with sleuth.watch("google.appengine.api.datastore.Query.Run") as rpc_wrapper:
            with sleuth.watch("djangae.db.backends.appengine.caching.get_from_cache") as cache_hit:
                instance_from_cache = UniqueModel.objects.get(unique_field="test")
                self.assertTrue(cache_hit.called)
                self.assertFalse(rpc_wrapper.called)

        # Disable the context cache, make sure that we hit the database
        with caching.disable_context_cache():
            with sleuth.watch("google.appengine.api.datastore.Query.Run") as rpc_wrapper:
                with sleuth.watch("djangae.db.backends.appengine.caching.get_from_cache") as cache_hit:
                    instance_from_database = UniqueModel.objects.get(unique_field="test")
                    self.assertTrue(cache_hit.called)
                    self.assertTrue(rpc_wrapper.called)

        self.assertEqual(instance_from_cache, instance_from_database)

    def test_context_cache_cleared_after_request(self):
        """ The context cache should be cleared bewteen requests. """
        UniqueModel.objects.create(unique_field="test")
        with sleuth.watch("google.appengine.api.datastore.Query.Run") as query:
            UniqueModel.objects.get(unique_field="test")
            self.assertEqual(query.call_count, 0)
            # Now start a new request, which should clear the cache
            request_started.send(HttpRequest())
            UniqueModel.objects.get(unique_field="test")
            self.assertEqual(query.call_count, 1)
            # Now do another call, which should use the cache (because it would have been
            # populated by the previous call)
            UniqueModel.objects.get(unique_field="test")
            self.assertEqual(query.call_count, 1)
            # Now clear the cache again by *finishing* a request
            request_finished.send(HttpRequest())
            UniqueModel.objects.get(unique_field="test")
            self.assertEqual(query.call_count, 2)


class NullDate(models.Model):
    date = models.DateField(null=True, default=None)
    datetime = models.DateTimeField(null=True, default=None)
    time = models.TimeField(null=True, default=None)

class BackendTests(TestCase):
    def test_entity_matches_query(self):
        entity = datastore.Entity("test_model")
        entity["name"] = "Charlie"
        entity["age"] = 22

        query = datastore.Query("test_model")
        query["name ="] = "Charlie"
        self.assertTrue(entity_matches_query(entity, query))

        query["age >="] = 5
        self.assertTrue(entity_matches_query(entity, query))
        del query["age >="]

        query["age <"] = 22
        self.assertFalse(entity_matches_query(entity, query))
        del query["age <"]

        query["age <="] = 22
        self.assertTrue(entity_matches_query(entity, query))
        del query["age <="]

        query["name ="] = "Fred"
        self.assertFalse(entity_matches_query(entity, query))

        # If the entity has a list field, then if any of them match the
        # query then it's a match
        entity["name"] = [ "Bob", "Fred", "Dave" ]
        self.assertTrue(entity_matches_query(entity, query))  # ListField test

    def test_gae_conversion(self):
        # A PK IN query should result in a single get by key

        with sleuth.switch("djangae.db.backends.appengine.commands.datastore.Get", lambda *args, **kwargs: []) as get_mock:
            list(TestUser.objects.filter(pk__in=[1, 2, 3]))  # Force the query to run
            self.assertEqual(1, get_mock.call_count)

        with sleuth.switch("djangae.db.backends.appengine.commands.datastore.Query.Run", lambda *args, **kwargs: []) as query_mock:
            list(TestUser.objects.filter(username="test"))
            self.assertEqual(1, query_mock.call_count)

        with sleuth.switch("djangae.db.backends.appengine.commands.datastore.MultiQuery.Run", lambda *args, **kwargs: []) as query_mock:
            list(TestUser.objects.filter(username__in=["test", "cheese"]))
            self.assertEqual(1, query_mock.call_count)

        with sleuth.switch("djangae.db.backends.appengine.commands.datastore.Get", lambda *args, **kwargs: []) as get_mock:
            list(TestUser.objects.filter(pk=1))
            self.assertEqual(1, get_mock.call_count)

        #FIXME: Issue #80
        with self.assertRaises(CouldBeSupportedError):
            with sleuth.switch("djangae.db.backends.appengine.commands.datastore.MultiQuery.Run", lambda *args, **kwargs: []) as query_mock:
                list(TestUser.objects.exclude(username__startswith="test"))
                self.assertEqual(1, query_mock.call_count)

        with sleuth.switch("djangae.db.backends.appengine.commands.datastore.Get", lambda *args, **kwargs: []) as get_mock:
            list(TestUser.objects.filter(pk__in=[1, 2, 3, 4, 5, 6, 7, 8]).
                filter(username__in=["test", "test2", "test3"]).filter(email__in=["test@example.com", "test2@example.com"]))

            self.assertEqual(1, get_mock.call_count)



    def test_null_date_field(self):
        null_date = NullDate()
        null_date.save()

        null_date = NullDate.objects.get()
        self.assertIsNone(null_date.date)
        self.assertIsNone(null_date.time)
        self.assertIsNone(null_date.datetime)

    def test_convert_unicode_subclasses_to_unicode(self):
        # The App Engine SDK raises BadValueError if you try saving a SafeText
        # string to a CharField. Djangae explicitly converts it to unicode.
        from django.template.defaultfilters import slugify

        grue = slugify(u'grue')

        self.assertIsInstance(grue, unicode)
        self.assertNotEqual(type(grue), unicode)

        obj = TestFruit.objects.create(name=u'foo', color=grue)

        self.assertEqual(type(obj.color), unicode)


class ModelFormsetTest(TestCase):
    def test_reproduce_index_error(self):
        class TestModelForm(ModelForm):
            class Meta:
                model = TestUser

        test_model = TestUser.objects.create(username='foo', field2='bar')
        TestModelFormSet = modelformset_factory(TestUser, form=TestModelForm, extra=0)
        TestModelFormSet(queryset=TestUser.objects.filter(pk=test_model.pk))

        data = {
            'form-INITIAL_FORMS': 0,
            'form-MAX_NUM_FORMS': 0,
            'form-TOTAL_FORMS': 0,
            'form-0-id': test_model.id,
            'form-0-field1': 'foo_1',
            'form-0-field2': 'bar_1',
        }
        factory = RequestFactory()
        request = factory.post('/', data=data)

        TestModelFormSet(request.POST, request.FILES)


class CacheTests(TestCase):

    def test_cache_set(self):
        cache.set('test?', 'yes!')
        self.assertEqual(cache.get('test?'), 'yes!')

    def test_cache_timeout(self):
        cache.set('test?', 'yes!', 1)
        import time
        time.sleep(1)
        self.assertEqual(cache.get('test?'), None)


class TransactionTests(TestCase):
    def test_atomic_decorator(self):

        @transaction.atomic
        def txn():
            TestUser.objects.create(username="foo", field2="bar")
            raise ValueError()

        with self.assertRaises(ValueError):
            txn()

        self.assertEqual(0, TestUser.objects.count())

    def test_atomic_context_manager(self):

        with self.assertRaises(ValueError):
            with transaction.atomic():
                TestUser.objects.create(username="foo", field2="bar")
                raise ValueError()

        self.assertEqual(0, TestUser.objects.count())

    def test_xg_argument(self):

        @transaction.atomic(xg=True)
        def txn(_username):
            TestUser.objects.create(username=_username, field2="bar")
            TestFruit.objects.create(name="Apple", color="pink")
            raise ValueError()

        with self.assertRaises(ValueError):
            txn("foo")

        self.assertEqual(0, TestUser.objects.count())
        self.assertEqual(0, TestFruit.objects.count())

    def test_independent_argument(self):
        """
            We would get a XG error if the inner transaction was not independent
        """

        @transaction.atomic
        def txn1(_username, _fruit):
            @transaction.atomic(independent=True)
            def txn2(_fruit):
                TestFruit.objects.create(name=_fruit, color="pink")
                raise ValueError()

            TestUser.objects.create(username=_username)
            txn2(_fruit)


        with self.assertRaises(ValueError):
            txn1("test", "banana")


class QueryNormalizationTests(TestCase):
    """
        The parse_dnf function takes a Django where tree, and converts it
        into a tree of one of the following forms:

        [ (column, operator, value), (column, operator, value) ] <- AND only query
        [ [(column, operator, value)], [(column, operator, value) ]] <- OR query, of multiple ANDs
    """

    def test_and_queries(self):
        connection = connections['default']

        qs = TestUser.objects.filter(username="test").all()

        self.assertEqual(('OR', [('LIT', ('username', '=', 'test'))]), parse_dnf(qs.query.where, connection=connection)[0])

        qs = TestUser.objects.filter(username="test", email="test@example.com")

        expected = ('OR', [('AND', [('LIT', ('username', '=', 'test')), ('LIT', ('email', '=', 'test@example.com'))])])

        self.assertEqual(expected, parse_dnf(qs.query.where, connection=connection)[0])
        #
        qs = TestUser.objects.filter(username="test").exclude(email="test@example.com")

        expected = ('OR', [
            ('AND', [('LIT', ('username', '=', 'test')), ('LIT', ('email', '>', 'test@example.com'))]),
            ('AND', [('LIT', ('username', '=', 'test')), ('LIT', ('email', '<', 'test@example.com'))])
        ])

        self.assertEqual(expected, parse_dnf(qs.query.where, connection=connection)[0])

        qs = TestUser.objects.filter(username__lte="test").exclude(email="test@example.com")
        expected = ('OR', [
            ('AND', [("username", "<=", "test"), ("email", ">", "test@example.com")]),
            ('AND', [("username", "<=", "test"), ("email", "<", "test@example.com")]),
        ])

        #FIXME: This will raise a BadFilterError on the datastore, we should instead raise NotSupportedError in that case
        #with self.assertRaises(NotSupportedError):
        #    parse_dnf(qs.query.where, connection=connection)

        instance = Relation(pk=1)
        qs = instance.related_set.filter(headline__startswith='Fir')

        expected = ('OR', [('AND', [('LIT', ('relation_id', '=', 1)), ('LIT', ('_idx_startswith_headline', '=', u'Fir'))])])

        norm = parse_dnf(qs.query.where, connection=connection)[0]

        self.assertEqual(expected, norm)

    def test_or_queries(self):

        connection = connections['default']

        qs = TestUser.objects.filter(
            username="python").filter(
            Q(username__in=["ruby", "jruby"]) | (Q(username="php") & ~Q(username="perl"))
        )

        # After IN and != explosion, we have...
        # (AND: (username='python', OR: (username='ruby', username='jruby', AND: (username='php', AND: (username < 'perl', username > 'perl')))))

        # Working backwards,
        # AND: (username < 'perl', username > 'perl') can't be simplified
        # AND: (username='php', AND: (username < 'perl', username > 'perl')) can become (OR: (AND: username = 'php', username < 'perl'), (AND: username='php', username > 'perl'))
        # OR: (username='ruby', username='jruby', (OR: (AND: username = 'php', username < 'perl'), (AND: username='php', username > 'perl')) can't be simplified
        # (AND: (username='python', OR: (username='ruby', username='jruby', (OR: (AND: username = 'php', username < 'perl'), (AND: username='php', username > 'perl'))
        # becomes...
        # (OR: (AND: username='python', username = 'ruby'), (AND: username='python', username='jruby'), (AND: username='python', username='php', username < 'perl') \
        #      (AND: username='python', username='php', username > 'perl')

        expected = ('OR', [
            ('AND', [('LIT', ('username', '=', 'python')), ('LIT', ('username', '=', 'ruby'))]),
            ('AND', [('LIT', ('username', '=', 'python')), ('LIT', ('username', '=', 'jruby'))]),
            ('AND', [('LIT', ('username', '=', 'python')), ('LIT', ('username', '=', 'php')), ('LIT', ('username', '>', 'perl'))]),
            ('AND', [('LIT', ('username', '=', 'python')), ('LIT', ('username', '=', 'php')), ('LIT', ('username', '<', 'perl'))])
        ])

        self.assertEqual(expected, parse_dnf(qs.query.where, connection=connection)[0])
        #

        qs = TestUser.objects.filter(username="test") | TestUser.objects.filter(username="cheese")

        expected = ('OR', [
            ('LIT', ("username", "=", "test")),
            ('LIT', ("username", "=", "cheese")),
        ])

        self.assertEqual(expected, parse_dnf(qs.query.where, connection=connection)[0])

        qs = TestUser.objects.using("default").filter(username__in=set()).values_list('email')

        with self.assertRaises(EmptyResultSet):
            parse_dnf(qs.query.where, connection=connection)

        qs = TestUser.objects.filter(username__startswith='Hello') |  TestUser.objects.filter(username__startswith='Goodbye')
        expected = ('OR', [
            ('LIT', ('_idx_startswith_username', '=', u'Hello')),
            ('LIT', ('_idx_startswith_username', '=', u'Goodbye'))
        ])
        self.assertEqual(expected, parse_dnf(qs.query.where, connection=connection)[0])

        qs = TestUser.objects.filter(pk__in=[1, 2, 3])

        expected = ('OR', [
            ('LIT', ("id", "=", datastore.Key.from_path(TestUser._meta.db_table, 1))),
            ('LIT', ("id", "=", datastore.Key.from_path(TestUser._meta.db_table, 2))),
            ('LIT', ("id", "=", datastore.Key.from_path(TestUser._meta.db_table, 3))),
        ])

        self.assertEqual(expected, parse_dnf(qs.query.where, connection=connection)[0])

        qs = TestUser.objects.filter(pk__in=[1, 2, 3]).filter(username="test")

        expected = ('OR', [
            ('AND', [
                ('LIT', (u'id', '=', datastore.Key.from_path(TestUser._meta.db_table, 1))),
                ('LIT', ('username', '=', 'test'))
            ]),
            ('AND', [
                ('LIT', (u'id', '=', datastore.Key.from_path(TestUser._meta.db_table, 2))),
                ('LIT', ('username', '=', 'test'))
            ]),
            ('AND', [
                ('LIT', (u'id', '=', datastore.Key.from_path(TestUser._meta.db_table, 3))),
                ('LIT', ('username', '=', 'test'))
            ])
        ])
        self.assertEqual(expected, parse_dnf(qs.query.where, connection=connection)[0])


class ModelWithUniques(models.Model):
    name = models.CharField(max_length=64, unique=True)


class ModelWithDates(models.Model):
    start = models.DateField()
    end = models.DateField()


class ModelWithUniquesAndOverride(models.Model):
    name = models.CharField(max_length=64, unique=True)

    class Djangae:
        disable_constraint_checks = False


class ConstraintTests(TestCase):
    """
        Tests for unique constaint handling
    """

    def test_update_updates_markers(self):
        initial_count = datastore.Query(UniqueMarker.kind()).Count()

        instance = ModelWithUniques.objects.create(name="One")

        self.assertEqual(1, datastore.Query(UniqueMarker.kind()).Count() - initial_count)

        qry = datastore.Query(UniqueMarker.kind())
        qry.Order(("created", datastore.Query.DESCENDING))

        marker = [x for x in qry.Run()][0]
        # Make sure we assigned the instance
        self.assertEqual(datastore.Key(marker["instance"]), datastore.Key.from_path(instance._meta.db_table, instance.pk))

        expected_marker = "{}|name:{}".format(ModelWithUniques._meta.db_table, md5("One").hexdigest())
        self.assertEqual(expected_marker, marker.key().id_or_name())

        instance.name = "Two"
        instance.save()

        self.assertEqual(1, datastore.Query(UniqueMarker.kind()).Count() - initial_count)
        marker = [x for x in qry.Run()][0]
        # Make sure we assigned the instance
        self.assertEqual(datastore.Key(marker["instance"]), datastore.Key.from_path(instance._meta.db_table, instance.pk))

        expected_marker = "{}|name:{}".format(ModelWithUniques._meta.db_table, md5("Two").hexdigest())
        self.assertEqual(expected_marker, marker.key().id_or_name())

    def test_conflicting_insert_throws_integrity_error(self):
        ModelWithUniques.objects.create(name="One")

        with self.assertRaises((IntegrityError, DataError)):
            ModelWithUniques.objects.create(name="One")

    def test_conflicting_update_throws_integrity_error(self):
        ModelWithUniques.objects.create(name="One")

        instance = ModelWithUniques.objects.create(name="Two")
        with self.assertRaises((IntegrityError, DataError)):
            instance.name = "One"
            instance.save()

    def test_error_on_update_doesnt_change_markers(self):
        initial_count = datastore.Query(UniqueMarker.kind()).Count()

        instance = ModelWithUniques.objects.create(name="One")

        self.assertEqual(1, datastore.Query(UniqueMarker.kind()).Count() - initial_count)

        qry = datastore.Query(UniqueMarker.kind())
        qry.Order(("created", datastore.Query.DESCENDING))

        marker = [ x for x in qry.Run()][0]
        # Make sure we assigned the instance
        self.assertEqual(datastore.Key(marker["instance"]), datastore.Key.from_path(instance._meta.db_table, instance.pk))

        expected_marker = "{}|name:{}".format(ModelWithUniques._meta.db_table, md5("One").hexdigest())
        self.assertEqual(expected_marker, marker.key().id_or_name())

        instance.name = "Two"

        from djangae.db.backends.appengine.commands import datastore as to_patch

        try:
            original = to_patch.Put

            def func(*args, **kwargs):
                kind = args[0][0].kind() if isinstance(args[0], list) else args[0].kind()

                if kind == UniqueMarker.kind():
                    return original(*args, **kwargs)

                raise AssertionError()

            to_patch.Put = func

            with self.assertRaises(Exception):
                instance.save()
        finally:
            to_patch.Put = original

        self.assertEqual(1, datastore.Query(UniqueMarker.kind()).Count() - initial_count)
        marker = [x for x in qry.Run()][0]
        # Make sure we assigned the instance
        self.assertEqual(datastore.Key(marker["instance"]), datastore.Key.from_path(instance._meta.db_table, instance.pk))

        expected_marker = "{}|name:{}".format(ModelWithUniques._meta.db_table, md5("One").hexdigest())
        self.assertEqual(expected_marker, marker.key().id_or_name())

    def test_error_on_insert_doesnt_create_markers(self):
        initial_count = datastore.Query(UniqueMarker.kind()).Count()

        from djangae.db.backends.appengine.commands import datastore as to_patch
        try:
            original = to_patch.Put

            def func(*args, **kwargs):
                kind = args[0][0].kind() if isinstance(args[0], list) else args[0].kind()

                if kind == UniqueMarker.kind():
                    return original(*args, **kwargs)

                raise AssertionError()

            to_patch.Put = func

            with self.assertRaises(AssertionError):
                ModelWithUniques.objects.create(name="One")
        finally:
            to_patch.Put = original

        self.assertEqual(0, datastore.Query(UniqueMarker.kind()).Count() - initial_count)

    def test_delete_clears_markers(self):
        initial_count = datastore.Query(UniqueMarker.kind()).Count()

        instance = ModelWithUniques.objects.create(name="One")
        self.assertEqual(1, datastore.Query(UniqueMarker.kind()).Count() - initial_count)
        instance.delete()
        self.assertEqual(0, datastore.Query(UniqueMarker.kind()).Count() - initial_count)

    @override_settings(DJANGAE_DISABLE_CONSTRAINT_CHECKS=True)
    def test_constraints_disabled_doesnt_create_or_check_markers(self):
        initial_count = datastore.Query(UniqueMarker.kind()).Count()

        instance1 = ModelWithUniques.objects.create(name="One")

        self.assertEqual(initial_count, datastore.Query(UniqueMarker.kind()).Count())

        instance2 = ModelWithUniques.objects.create(name="One")

        self.assertEqual(instance1.name, instance2.name)
        self.assertFalse(instance1 == instance2)

    @override_settings(DJANGAE_DISABLE_CONSTRAINT_CHECKS=True)
    def test_constraints_can_be_enabled_per_model(self):

        initial_count = datastore.Query(UniqueMarker.kind()).Count()
        ModelWithUniquesAndOverride.objects.create(name="One")

        self.assertEqual(1, datastore.Query(UniqueMarker.kind()).Count() - initial_count)


class EdgeCaseTests(TestCase):
    def setUp(self):
        add_special_index(TestUser, "username", "iexact")

        self.u1 = TestUser.objects.create(username="A", email="test@example.com", last_login=datetime.datetime.now().date())
        self.u2 = TestUser.objects.create(username="B", email="test@example.com", last_login=datetime.datetime.now().date())
        TestUser.objects.create(username="C", email="test2@example.com", last_login=datetime.datetime.now().date())
        TestUser.objects.create(username="D", email="test3@example.com", last_login=datetime.datetime.now().date())
        TestUser.objects.create(username="E", email="test3@example.com", last_login=datetime.datetime.now().date())

        self.apple = TestFruit.objects.create(name="apple", color="red")
        self.banana = TestFruit.objects.create(name="banana", color="yellow")

    def test_querying_by_date(self):
        instance1 = ModelWithDates.objects.create(start=datetime.date(2014, 1, 1), end=datetime.date(2014, 1, 20))
        instance2 = ModelWithDates.objects.create(start=datetime.date(2014, 2, 1), end=datetime.date(2014, 2, 20))

        self.assertEqual(instance1, ModelWithDates.objects.get(start__lt=datetime.date(2014, 1, 2)))
        self.assertEqual(2, ModelWithDates.objects.filter(start__lt=datetime.date(2015, 1, 1)).count())

        self.assertEqual(instance2, ModelWithDates.objects.get(start__gt=datetime.date(2014, 1, 2)))
        self.assertEqual(instance2, ModelWithDates.objects.get(start__gte=datetime.date(2014, 2, 1)))

    def test_double_starts_with(self):
        qs = TestUser.objects.filter(username__startswith='Hello') |  TestUser.objects.filter(username__startswith='Goodbye')

        self.assertEqual(0, qs.count())

        TestUser.objects.create(username="Hello")
        self.assertEqual(1, qs.count())

        TestUser.objects.create(username="Goodbye")
        self.assertEqual(2, qs.count())

        TestUser.objects.create(username="Hello and Goodbye")
        self.assertEqual(3, qs.count())

    def test_impossible_starts_with(self):
        TestUser.objects.create(username="Hello")
        TestUser.objects.create(username="Goodbye")
        TestUser.objects.create(username="Hello and Goodbye")

        qs = TestUser.objects.filter(username__startswith='Hello') &  TestUser.objects.filter(username__startswith='Goodbye')
        self.assertEqual(0, qs.count())

    def test_combinations_of_special_indexes(self):
        qs = TestUser.objects.filter(username__iexact='Hello') | TestUser.objects.filter(username__contains='ood')

        self.assertEqual(0, qs.count())

        TestUser.objects.create(username="Hello")
        self.assertEqual(1, qs.count())

        TestUser.objects.create(username="Goodbye")
        self.assertEqual(2, qs.count())

        TestUser.objects.create(username="Hello and Goodbye")
        self.assertEqual(3, qs.count())

    def test_multi_table_inheritance(self):

        parent = MultiTableParent.objects.create(parent_field="parent1")
        child1 = MultiTableChildOne.objects.create(parent_field="child1", child_one_field="child1")
        child2 = MultiTableChildTwo.objects.create(parent_field="child2", child_two_field="child2")

        self.assertEqual(3, MultiTableParent.objects.count())
        self.assertItemsEqual([parent.pk, child1.pk, child2.pk],
            list(MultiTableParent.objects.values_list('pk', flat=True)))
        self.assertEqual(1, MultiTableChildOne.objects.count())
        self.assertEqual(child1, MultiTableChildOne.objects.get())

        self.assertEqual(1, MultiTableChildTwo.objects.count())
        self.assertEqual(child2, MultiTableChildTwo.objects.get())

        self.assertEqual(child2, MultiTableChildTwo.objects.get(pk=child2.pk))
        self.assertTrue(MultiTableParent.objects.filter(pk=child2.pk).exists())

    def test_anding_pks(self):
        results = TestUser.objects.filter(id__exact=self.u1.pk).filter(id__exact=self.u2.pk)
        self.assertEqual(list(results), [])

    def test_unusual_queries(self):

        results = TestFruit.objects.filter(name__in=["apple", "orange"])
        self.assertEqual(1, len(results))
        self.assertItemsEqual(["apple"], [x.name for x in results])

        results = TestFruit.objects.filter(name__in=["apple", "banana"])
        self.assertEqual(2, len(results))
        self.assertItemsEqual(["apple", "banana"], [x.name for x in results])

        results = TestFruit.objects.filter(name__in=["apple", "banana"]).values_list('pk', 'color')
        self.assertEqual(2, len(results))
        self.assertItemsEqual([(self.apple.pk, self.apple.color), (self.banana.pk, self.banana.color)], results)

        results = TestUser.objects.all()
        self.assertEqual(5, len(results))

        results = TestUser.objects.filter(username__in=["A", "B"])
        self.assertEqual(2, len(results))
        self.assertItemsEqual(["A", "B"], [x.username for x in results])

        results = TestUser.objects.filter(username__in=["A", "B"]).exclude(username="A")
        self.assertEqual(1, len(results), results)
        self.assertItemsEqual(["B"], [x.username for x in results])

        results = TestUser.objects.filter(username__lt="E")
        self.assertEqual(4, len(results))
        self.assertItemsEqual(["A", "B", "C", "D"], [x.username for x in results])

        results = TestUser.objects.filter(username__lte="E")
        self.assertEqual(5, len(results))

        #Double exclude on different properties not supported
        with self.assertRaises(DataError):
            #FIXME: This should raise a NotSupportedError, but at the moment it's thrown too late in
            #the process and so Django wraps it as a DataError
            list(TestUser.objects.exclude(username="E").exclude(email="A"))

        results = list(TestUser.objects.exclude(username="E").exclude(username="A"))
        self.assertItemsEqual(["B", "C", "D"], [x.username for x in results ])

        results = TestUser.objects.filter(username="A", email="test@example.com")
        self.assertEqual(1, len(results))

        results = TestUser.objects.filter(username__in=["A", "B"]).filter(username__in=["A", "B"])
        self.assertEqual(2, len(results))
        self.assertItemsEqual(["A", "B"], [x.username for x in results])

        results = TestUser.objects.filter(username__in=["A", "B"]).filter(username__in=["A"])
        self.assertEqual(1, len(results))
        self.assertItemsEqual(["A"], [x.username for x in results])

        results = TestUser.objects.filter(pk__in=[self.u1.pk, self.u2.pk]).filter(username__in=["A"])
        self.assertEqual(1, len(results))
        self.assertItemsEqual(["A"], [x.username for x in results])

        results = TestUser.objects.filter(username__in=["A"]).filter(pk__in=[self.u1.pk, self.u2.pk])
        self.assertEqual(1, len(results))
        self.assertItemsEqual(["A"], [x.username for x in results])

        results = list(TestUser.objects.all().exclude(username__in=["A"]))
        self.assertItemsEqual(["B", "C", "D", "E"], [x.username for x in results ])

        results = list(TestFruit.objects.filter(name='apple', color__in=[]))
        self.assertItemsEqual([], results)

    def test_or_queryset(self):
        """
            This constructs an OR query, this is currently broken in the parse_where_and_check_projection
            function. WE MUST FIX THIS!
        """
        q1 = TestUser.objects.filter(username="A")
        q2 = TestUser.objects.filter(username="B")

        self.assertItemsEqual([self.u1, self.u2], list(q1 | q2))

    def test_or_q_objects(self):
        """ Test use of Q objects in filters. """
        query = TestUser.objects.filter(Q(username="A") | Q(username="B"))
        self.assertItemsEqual([self.u1, self.u2], list(query))

    def test_extra_select(self):
        results = TestUser.objects.filter(username='A').extra(select={'is_a': "username = 'A'"})
        self.assertEqual(1, len(results))
        self.assertItemsEqual([True], [x.is_a for x in results])

        results = TestUser.objects.all().exclude(username='A').extra(select={'is_a': "username = 'A'"})
        self.assertEqual(4, len(results))
        self.assertEqual(not any([x.is_a for x in results]), True)

        # Up for debate
        # results = User.objects.all().extra(select={'truthy': 'TRUE'})
        # self.assertEqual(all([x.truthy for x in results]), True)

        results = TestUser.objects.all().extra(select={'truthy': True})
        self.assertEqual(all([x.truthy for x in results]), True)

    def test_counts(self):
        self.assertEqual(5, TestUser.objects.count())
        self.assertEqual(2, TestUser.objects.filter(email="test3@example.com").count())
        self.assertEqual(3, TestUser.objects.exclude(email="test3@example.com").count())
        self.assertEqual(1, TestUser.objects.filter(username="A").exclude(email="test3@example.com").count())
        self.assertEqual(3, TestUser.objects.exclude(username="E").exclude(username="A").count())

    def test_deletion(self):
        count = TestUser.objects.count()
        self.assertTrue(count)

        TestUser.objects.filter(username="A").delete()
        self.assertEqual(count - 1, TestUser.objects.count())

        TestUser.objects.filter(username="B").exclude(username="B").delete() #Should do nothing
        self.assertEqual(count - 1, TestUser.objects.count())

        TestUser.objects.all().delete()
        count = TestUser.objects.count()
        self.assertFalse(count)

    def test_insert_with_existing_key(self):
        user = TestUser.objects.create(id=999, username="test1", last_login=datetime.datetime.now().date())
        self.assertEqual(999, user.pk)

        with self.assertRaises(DjangoIntegrityError):
            TestUser.objects.create(id=999, username="test2", last_login=datetime.datetime.now().date())

    def test_included_pks(self):
        ids = [ TestUser.objects.get(username="B").pk, TestUser.objects.get(username="A").pk ]
        results = TestUser.objects.filter(pk__in=ids).order_by("username")

        self.assertEqual(results[0], self.u1)
        self.assertEqual(results[1], self.u2)

    def test_select_related(self):
        """ select_related should be a no-op... for now """
        user = TestUser.objects.get(username="A")
        Permission.objects.create(user=user, perm="test_perm")
        select_related = [ (p.perm, p.user.username) for p in user.permission_set.select_related() ]
        self.assertEqual(user.username, select_related[0][1])

    def test_cross_selects(self):
        user = TestUser.objects.get(username="A")
        Permission.objects.create(user=user, perm="test_perm")
        with self.assertRaises(NotSupportedError):
            perms = list(Permission.objects.all().values_list("user__username", "perm"))
            self.assertEqual("A", perms[0][0])

    def test_values_list_on_pk_does_keys_only_query(self):
        from google.appengine.api.datastore import Query

        def replacement_init(*args, **kwargs):
            replacement_init.called_args = args
            replacement_init.called_kwargs = kwargs
            original_init(*args, **kwargs)

        replacement_init.called_args = None
        replacement_init.called_kwargs = None

        try:
            original_init = Query.__init__
            Query.__init__ = replacement_init
            list(TestUser.objects.all().values_list('pk', flat=True))
        finally:
            Query.__init__ = original_init

        self.assertTrue(replacement_init.called_kwargs.get('keys_only'))
        self.assertEqual(5, len(TestUser.objects.all().values_list('pk')))

    def test_iexact(self):
        user = TestUser.objects.get(username__iexact="a")
        self.assertEqual("A", user.username)

    def test_ordering(self):
        users = TestUser.objects.all().order_by("username")

        self.assertEqual(["A", "B", "C", "D", "E"], [x.username for x in users])

        users = TestUser.objects.all().order_by("-username")

        self.assertEqual(["A", "B", "C", "D", "E"][::-1], [x.username for x in users])

    def test_dates_query(self):
        z_user = TestUser.objects.create(username="Z", email="z@example.com")
        z_user.last_login = datetime.date(2013, 4, 5)
        z_user.save()

        last_a_login = TestUser.objects.get(username="A").last_login

        dates = TestUser.objects.dates('last_login', 'year')

        self.assertItemsEqual(
            [datetime.date(2013, 1, 1), datetime.date(last_a_login.year, 1, 1)],
            dates
        )

        dates = TestUser.objects.dates('last_login', 'month')
        self.assertItemsEqual(
            [datetime.date(2013, 4, 1), datetime.date(last_a_login.year, last_a_login.month, 1)],
            dates
        )

        dates = TestUser.objects.dates('last_login', 'day')
        self.assertItemsEqual(
            [datetime.date(2013, 4, 5), last_a_login],
            dates
        )

        dates = TestUser.objects.dates('last_login', 'day', order='DESC')
        self.assertItemsEqual(
            [last_a_login, datetime.date(2013, 4, 5)],
            dates
        )

    def test_in_query(self):
        """ Test that the __in filter works, and that it cannot be used with more than 30 values,
            unless it's used on the PK field.
        """
        # Check that a basic __in query works
        results = list(TestUser.objects.filter(username__in=['A', 'B']))
        self.assertItemsEqual(results, [self.u1, self.u2])
        # Check that it also works on PKs
        results = list(TestUser.objects.filter(pk__in=[self.u1.pk, self.u2.pk]))
        self.assertItemsEqual(results, [self.u1, self.u2])
        # Check that using more than 30 items in an __in query not on the pk causes death
        query = TestUser.objects.filter(username__in=list([x for x in letters[:31]]))
        # This currently rasies an error from App Engine, should we raise our own?
        self.assertRaises(Exception, list, query)
        # Check that it's ok with PKs though
        query = TestUser.objects.filter(pk__in=list(xrange(1, 32)))
        list(query)

    def test_self_relations(self):
        obj = SelfRelatedModel.objects.create()
        obj2 = SelfRelatedModel.objects.create(related=obj)
        self.assertEqual(list(obj.selfrelatedmodel_set.all()), [obj2])


class BlobstoreFileUploadHandlerTest(TestCase):
    boundary = "===============7417945581544019063=="

    def setUp(self):
        self.request = RequestFactory().get('/')
        self.request.META = {
            'wsgi.input': self._create_wsgi_input(),
            'content-type': 'message/external-body; blob-key="PLOF0qOie14jzHWJXEa9HA=="; access-type="X-AppEngine-BlobKey"'
        }
        self.uploader = BlobstoreFileUploadHandler(self.request)

    def _create_wsgi_input(self):
        return StringIO('--===============7417945581544019063==\r\nContent-Type:'
                        ' text/plain\r\nContent-Disposition: form-data;'
                        ' name="field-nationality"\r\n\r\nAS\r\n'
                        '--===============7417945581544019063==\r\nContent-Type:'
                        ' message/external-body; blob-key="PLOF0qOie14jzHWJXEa9HA==";'
                        ' access-type="X-AppEngine-BlobKey"\r\nContent-Disposition:'
                        ' form-data; name="field-file";'
                        ' filename="Scan.tiff"\r\n\r\nContent-Type: image/tiff'
                        '\r\nContent-Length: 19837164\r\nContent-MD5:'
                        ' YjI1M2Q5NjM5YzdlMzUxYjMyMjA0ZTIxZjAyNzdiM2Q=\r\ncontent-disposition:'
                        ' form-data; name="field-file";'
                        ' filename="Scan.tiff"\r\nX-AppEngine-Upload-Creation: 2014-03-07'
                        ' 14:48:03.246607\r\n\r\n\r\n'
                        '--===============7417945581544019063==\r\nContent-Type:'
                        ' text/plain\r\nContent-Disposition: form-data;'
                        ' name="field-number"\r\n\r\n6\r\n'
                        '--===============7417945581544019063==\r\nContent-Type:'
                        ' text/plain\r\nContent-Disposition: form-data;'
                        ' name="field-salutation"\r\n\r\nmrs\r\n'
                        '--===============7417945581544019063==--')

    def test_non_existing_files_do_not_get_created(self):
        file_field_name = 'field-file'
        length = len(self._create_wsgi_input().read())
        self.uploader.handle_raw_input(self.request.META['wsgi.input'], self.request.META, length, self.boundary, "utf-8")
        self.assertRaises(StopFutureHandlers, self.uploader.new_file, file_field_name, 'file_name', None, None)
        self.assertRaises(EntityNotFoundError, self.uploader.file_complete, None)

    def test_blob_key_creation(self):
        file_field_name = 'field-file'
        length = len(self._create_wsgi_input().read())
        self.uploader.handle_raw_input(self.request.META['wsgi.input'], self.request.META, length, self.boundary, "utf-8")
        self.assertRaises(
            StopFutureHandlers,
            self.uploader.new_file, file_field_name, 'file_name', None, None
        )
        self.assertIsNotNone(self.uploader.blobkey)


class ApplicationTests(TestCase):

    @unittest.skipIf(webtest is NotImplemented, "pip install webtest to run functional tests")
    def test_environ_is_patched_when_request_processed(self):
        def application(environ, start_response):
            # As we're not going through a thread pool the environ is unset.
            # Set it up manually here.
            # TODO: Find a way to get it to be auto-set by webtest
            from google.appengine.runtime import request_environment
            request_environment.current_request.environ = environ

            # Check if the os.environ is the same as what we expect from our
            # wsgi environ
            import os
            self.assertEqual(environ, os.environ)
            start_response("200 OK", [])
            return ["OK"]

        djangae_app = DjangaeApplication(application)
        test_app = webtest.TestApp(djangae_app)
        old_environ = os.environ
        try:
            test_app.get("/")
        finally:
            os.environ = old_environ


class ComputedFieldModel(models.Model):
    def computer(self):
        return "%s_%s" % (self.int_field, self.char_field)

    int_field = models.IntegerField()
    char_field = models.CharField(max_length=50)
    test_field = ComputedCharField(computer, max_length=50)


class ComputedFieldTests(TestCase):
    def test_computed_field(self):
        instance = ComputedFieldModel(int_field=1, char_field="test")
        instance.save()
        self.assertEqual(instance.test_field, "1_test")

        # Try getting and saving the instance again
        instance = ComputedFieldModel.objects.get(test_field="1_test")
        instance.save()


class ModelWithCounter(models.Model):
    counter = ShardedCounterField()


class ShardedCounterTest(TestCase):
    def test_basic_usage(self):
        instance = ModelWithCounter.objects.create()

        self.assertEqual(0, instance.counter.value())

        instance.counter.increment()

        self.assertEqual(30, len(instance.counter))
        self.assertEqual(30, CounterShard.objects.count())
        self.assertEqual(1, instance.counter.value())

        instance.counter.increment()
        self.assertEqual(2, instance.counter.value())

        instance.counter.decrement()
        self.assertEqual(1, instance.counter.value())

        instance.counter.decrement()

        self.assertEqual(0, instance.counter.value())

        instance.counter.decrement()
        self.assertEqual(0, instance.counter.value())


class IterableFieldModel(models.Model):
    set_field = SetField(models.CharField(max_length=1))
    list_field = ListField(models.CharField(max_length=1))


class IterableFieldTests(TestCase):
    def test_empty_iterable_fields(self):
        """ Test that an empty set field always returns set(), not None """
        instance = IterableFieldModel()
        # When assigning
        self.assertEqual(instance.set_field, set())
        self.assertEqual(instance.list_field, [])
        instance.save()

        instance = IterableFieldModel.objects.get()
        # When getting it from the db
        self.assertEqual(instance.set_field, set())
        self.assertEqual(instance.list_field, [])

    def test_list_field(self):
        instance = IterableFieldModel.objects.create()
        self.assertEqual([], instance.list_field)
        instance.list_field.append("One")
        self.assertEqual(["One"], instance.list_field)
        instance.save()

        self.assertEqual(["One"], instance.list_field)

        instance = IterableFieldModel.objects.get(pk=instance.pk)
        self.assertEqual(["One"], instance.list_field)

        instance.list_field = None

        # Or anything else for that matter!
        with self.assertRaises(ValueError):
            instance.list_field = "Bananas"
            instance.save()

        with self.assertRaises(ValueError):
            instance.list_field = set([1])

    def test_set_field(self):
        instance = IterableFieldModel.objects.create()
        self.assertEqual(set(), instance.set_field)
        instance.set_field.add("One")
        self.assertEqual(set(["One"]), instance.set_field)
        instance.save()

        self.assertEqual(set(["One"]), instance.set_field)

        instance = IterableFieldModel.objects.get(pk=instance.pk)
        self.assertEqual(set(["One"]), instance.set_field)

        instance.set_field = None

        # Or anything else for that matter!
        with self.assertRaises(ValueError):
            instance.set_field = "Bananas"
            instance.save()

        # Assigning a list to a set
        with self.assertRaises(ValueError):
            instance.set_field = [1]

from djangae.fields import RelatedSetField

class ISOther(models.Model):
    name = models.CharField(max_length=500)

    def __unicode__(self):
        return "%s:%s" % (self.pk, self.name)

class RelationWithoutReverse(models.Model):
    name = models.CharField(max_length=500)

class ISModel(models.Model):
    related_things = RelatedSetField(ISOther)
    limted_related = RelatedSetField(RelationWithoutReverse, limit_choices_to={'name': 'banana'}, related_name="+")
    children = RelatedSetField("self", related_name="+")

class InstanceSetFieldTests(TestCase):

    def test_basic_usage(self):
        main = ISModel.objects.create()
        other = ISOther.objects.create(name="test")
        other2 = ISOther.objects.create(name="test2")

        main.related_things.add(other)
        main.save()

        self.assertEqual({other.pk}, main.related_things_ids)
        self.assertEqual(list(ISOther.objects.filter(pk__in=main.related_things_ids)), list(main.related_things.all()))

        self.assertEqual([main], list(other.ismodel_set.all()))

        main.related_things.remove(other)
        self.assertFalse(main.related_things_ids)

        main.related_things = {other2}
        self.assertEqual({other2.pk}, main.related_things_ids)

        with self.assertRaises(AttributeError):
            other.ismodel_set = {main}

        without_reverse = RelationWithoutReverse.objects.create(name="test3")
        self.assertFalse(hasattr(without_reverse, "ismodel_set"))

    def test_save_and_load_empty(self):
        """
        Create a main object with no related items,
        get a copy of it back from the db and try to read items.
        """
        main = ISModel.objects.create()
        main_from_db = ISModel.objects.get(pk=main.pk)

        # Fetch the container from the database and read its items
        self.assertItemsEqual(main_from_db.related_things.all(), [])

    def test_add_to_empty(self):
        """
        Create a main object with no related items,
        get a copy of it back from the db and try to add items.
        """
        main = ISModel.objects.create()
        main_from_db = ISModel.objects.get(pk=main.pk)

        other = ISOther.objects.create()
        main_from_db.related_things.add(other)
        main_from_db.save()

    def test_add_another(self):
        """
        Create a main object with related items,
        get a copy of it back from the db and try to add more.
        """
        main = ISModel.objects.create()
        other1 = ISOther.objects.create()
        main.related_things.add(other1)
        main.save()

        main_from_db = ISModel.objects.get(pk=main.pk)
        other2 = ISOther.objects.create()

        main_from_db.related_things.add(other2)
        main_from_db.save()

    def test_deletion(self):
        """
        Delete one of the objects referred to by the related field
        """
        main = ISModel.objects.create()
        other = ISOther.objects.create()
        main.related_things.add(other)
        main.save()

        other.delete()
        self.assertEqual(main.related_things.count(), 0)

class RelationWithOverriddenDbTable(models.Model):
    class Meta:
        db_table = "bananarama"

class GenericRelationModel(models.Model):
    relation_to_content_type = GenericRelationField(ContentType, null=True)
    relation_to_weird = GenericRelationField(RelationWithOverriddenDbTable, null=True)

class TestGenericRelationField(TestCase):
    def test_basic_usage(self):
        instance = GenericRelationModel.objects.create()
        self.assertIsNone(instance.relation_to_content_type)

        ct = ContentType.objects.create()
        instance.relation_to_content_type = ct
        instance.save()

        self.assertTrue(instance.relation_to_content_type_id)

        instance = GenericRelationModel.objects.get()
        self.assertEqual(ct, instance.relation_to_content_type)

    def test_overridden_dbtable(self):
        instance = GenericRelationModel.objects.create()
        self.assertIsNone(instance.relation_to_weird)

        ct = ContentType.objects.create()
        instance.relation_to_weird = ct
        instance.save()

        self.assertTrue(instance.relation_to_weird_id)

        instance = GenericRelationModel.objects.get()
        self.assertEqual(ct, instance.relation_to_weird)


class PaginatorModel(models.Model):
    foo = models.IntegerField()


class DatastorePaginatorTest(TestCase):

    def setUp(self):
        for i in range(15):
            PaginatorModel.objects.create(foo=i)

    def test_basic_usage(self):
        def qs():
            return PaginatorModel.objects.all().order_by('foo')

        p1 = paginator.DatastorePaginator(qs(), 5).page(1)
        self.assertFalse(p1.has_previous())
        self.assertTrue(p1.has_next())
        self.assertEqual(p1.start_index(), 1)
        self.assertEqual(p1.end_index(), 5)
        self.assertEqual(p1.next_page_number(), 2)
        self.assertEqual([x.foo for x in p1], [0, 1, 2, 3, 4])

        p2 = paginator.DatastorePaginator(qs(), 5).page(2)
        self.assertTrue(p2.has_previous())
        self.assertTrue(p2.has_next())
        self.assertEqual(p2.start_index(), 6)
        self.assertEqual(p2.end_index(), 10)
        self.assertEqual(p2.previous_page_number(), 1)
        self.assertEqual(p2.next_page_number(), 3)
        self.assertEqual([x.foo for x in p2], [5, 6, 7, 8, 9])

        p3 = paginator.DatastorePaginator(qs(), 5).page(3)
        self.assertTrue(p3.has_previous())
        self.assertFalse(p3.has_next())
        self.assertEqual(p3.start_index(), 11)
        self.assertEqual(p3.end_index(), 15)
        self.assertEqual(p3.previous_page_number(), 2)
        self.assertEqual([x.foo for x in p3], [10, 11, 12, 13, 14])

    def test_empty(self):
        qs = PaginatorModel.objects.none()
        p1 = paginator.DatastorePaginator(qs, 5).page(1)
        self.assertFalse(p1.has_previous())
        self.assertFalse(p1.has_next())
        self.assertEqual(p1.start_index(), 0)
        self.assertEqual(p1.end_index(), 0)
        self.assertEqual([x for x in p1], [])
