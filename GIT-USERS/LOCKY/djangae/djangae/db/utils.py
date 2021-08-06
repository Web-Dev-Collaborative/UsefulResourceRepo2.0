# STANDARD LIB
from datetime import datetime
from decimal import Decimal
from itertools import chain

import warnings

# LIBRARIES
from django.conf import settings
from django.db.backends.util import format_number
from django.db import IntegrityError
from django.utils import timezone
from google.appengine.api import datastore
from google.appengine.api.datastore import Key, Query

# DJANGAE
from djangae.indexing import special_indexes_for_column, REQUIRES_SPECIAL_INDEXES
from djangae.db.backends.appengine.dbapi import CouldBeSupportedError


def make_timezone_naive(value):
    if value is None:
        return None

    if timezone.is_aware(value):
        if settings.USE_TZ:
            value = value.astimezone(timezone.utc).replace(tzinfo=None)
        else:
            raise ValueError(
                "Djangae backend does not support timezone-aware datetimes when USE_TZ is False."
            )
    return value


def decimal_to_string(value, max_digits=16, decimal_places=0):
    """
    Converts decimal to a unicode string for storage / lookup by nonrel
    databases that don't support decimals natively.

    This is an extension to `django.db.backends.util.format_number`
    that preserves order -- if one decimal is less than another, their
    string representations should compare the same (as strings).

    TODO: Can't this be done using string.format()?
          Not in Python 2.5, str.format is backported to 2.6 only.
    """

    # Handle sign separately.
    if value.is_signed():
        sign = u"-"
        value = abs(value)
    else:
        sign = u""

    # Let Django quantize and cast to a string.
    value = format_number(value, max_digits, decimal_places)

    # Pad with zeroes to a constant width.
    n = value.find(".")
    if n < 0:
        n = len(value)
    if n < max_digits - decimal_places:
        value = u"0" * (max_digits - decimal_places - n) + value
    return sign + value


def normalise_field_value(value):
    """ Converts a field value to a common type/format to make comparable to another. """
    if isinstance(value, datetime):
        return make_timezone_naive(value)
    elif isinstance(value, Decimal):
        return decimal_to_string(value)
    return value


def get_datastore_kind(model):
    return get_top_concrete_parent(model)._meta.db_table


def get_prepared_db_value(connection, instance, field, raw=False):
    value = (
        getattr(instance, field.attname)
        if raw
        else field.pre_save(instance, instance._state.adding)
    )

    if hasattr(value, "prepare_database_save"):
        value = value.prepare_database_save(field)
    else:
        value = field.get_db_prep_save(value, connection=connection)

    value = connection.ops.value_for_db(value, field)

    return value


def get_concrete_parents(model):
    ret = [
        x
        for x in model.mro()
        if hasattr(x, "_meta") and not x._meta.abstract and not x._meta.proxy
    ]
    return ret


def get_top_concrete_parent(model):
    return get_concrete_parents(model)[-1]


def has_concrete_parents(model):
    return get_concrete_parents(model) != [model]


def django_instance_to_entity(connection, model, fields, raw, instance):
    # uses_inheritance = False
    inheritance_root = get_top_concrete_parent(model)
    db_table = get_datastore_kind(inheritance_root)

    def value_from_instance(_instance, _field):
        value = get_prepared_db_value(connection, _instance, _field, raw)

        if (not _field.null and not _field.primary_key) and value is None:
            raise IntegrityError(
                "You can't set %s (a non-nullable " "field) to None!" % _field.name
            )

        is_primary_key = False
        if _field.primary_key and _field.model == inheritance_root:
            is_primary_key = True

        return value, is_primary_key

    concrete_classes = get_concrete_parents(model)
    classes = None
    if len(concrete_classes) > 1:
        classes = [x._meta.db_table for x in concrete_classes]

        for klass in concrete_classes[1:]:  # Ignore the current model
            for field in klass._meta.fields:
                fields.append(field)  # Add any parent fields

    field_values = {}
    primary_key = None

    for field in fields:
        value, is_primary_key = value_from_instance(instance, field)
        if is_primary_key:
            primary_key = value
        else:
            field_values[field.column] = value

        # Add special indexed fields
        for index in special_indexes_for_column(model, field.column):
            indexer = REQUIRES_SPECIAL_INDEXES[index]
            field_values[
                indexer.indexed_column_name(field.column)
            ] = indexer.prep_value_for_database(value)

    kwargs = {}
    if primary_key:
        if isinstance(primary_key, (int, long)):
            kwargs["id"] = primary_key
        elif isinstance(primary_key, basestring):
            if len(primary_key) >= 500:
                warnings.warn(
                    "Truncating primary key that is over 500 characters. "
                    "THIS IS AN ERROR IN YOUR PROGRAM.",
                    RuntimeWarning,
                )
                primary_key = primary_key[:500]

            kwargs["name"] = primary_key
        else:
            raise ValueError("Invalid primary key value")

    entity = datastore.Entity(db_table, **kwargs)
    entity.update(field_values)

    if classes:
        entity["class"] = classes

    return entity


def get_datastore_key(model, pk):
    """ Return a datastore.Key for the given model and primary key.
    """

    kind = get_top_concrete_parent(model)._meta.db_table
    return Key.from_path(kind, model._meta.pk.get_prep_value(pk))


class MockInstance(object):
    """
        This creates a mock instance for use when passing a datastore entity
        into get_prepared_db_value. This is used when performing updates to prevent a complete
        conversion to a Django instance before writing back the entity
    """

    def __init__(self, **kwargs):
        is_adding = kwargs.pop("_is_adding", False)

        class State:
            adding = is_adding

        self.fields = {}
        for field_name, value in kwargs.items():
            self.fields[field_name] = value

        self._state = State()

    def __getattr__(self, attr):
        if attr in self.fields:
            return self.fields[attr]
        raise AttributeError(attr)


def key_exists(key):
    qry = Query(keys_only=True)
    qry.Ancestor(key)
    return qry.Count(limit=1) > 0


def django_ordering_comparison(ordering, lhs, rhs):
    if not ordering:
        return -1  # Really doesn't matter

    ASCENDING = 1
    DESCENDING = 2

    for order, direction in ordering:
        if direction == ASCENDING and lhs[order] != rhs[order]:
            return -1 if lhs[order] < rhs[order] else 1
        elif direction == DESCENDING and lhs[order] != rhs[order]:
            return 1 if lhs[order] < rhs[order] else -1

    return 0


def entity_matches_query(entity, query):
    """
        Return True if the entity would potentially be returned by the datastore
        query
    """
    OPERATORS = {
        "=": lambda x, y: x == y,
        "<": lambda x, y: x < y,
        ">": lambda x, y: x > y,
        "<=": lambda x, y: x <= y,
        ">=": lambda x, y: x >= y,
    }

    queries = [query]
    if isinstance(query, datastore.MultiQuery):
        raise CouldBeSupportedError(
            "We just need to separate the multiquery "
            "into 'queries' then everything should work"
        )

    for query in queries:
        comparisons = chain(
            [("kind", "=", "_Query__kind")],
            [tuple(x.split(" ") + [x]) for x in query.keys()],
        )

        for ent_attr, op, query_attr in comparisons:
            if ent_attr == "__key__":
                continue

            op = OPERATORS[
                op
            ]  # We want this to throw if there's some op we don't know about

            if ent_attr == "kind":
                ent_attr = entity.kind()
            else:
                ent_attr = entity.get(ent_attr)

            if callable(ent_attr):
                # entity.kind() is a callable, so we need this to save special casing it in a more
                # ugly way
                ent_attr = ent_attr()

            if not isinstance(query_attr, (list, tuple)):
                query_attrs = [query_attr]
            else:
                # The query value can be a list of ANDed values
                query_attrs = query_attr

            query_attrs = [
                getattr(query, x) if x == "_Query__kind" else query.get(x)
                for x in query_attrs
            ]

            if not isinstance(ent_attr, (list, tuple)):
                ent_attr = [ent_attr]

            matches = False
            for query_attr in query_attrs:  # [22, 23]
                # If any of the values don't match then this query doesn't match
                if not any([op(attr, query_attr) for attr in ent_attr]):
                    matches = False
                    break
            else:
                # One of the ent_attrs matches the query_attrs
                matches = True

            if not matches:
                # One of the AND values didn't match
                break
        else:
            # If we got through the loop without breaking, then the entity matches
            return True

    return False
