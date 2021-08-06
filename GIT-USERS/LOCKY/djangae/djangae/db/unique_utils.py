from hashlib import md5
from google.appengine.api import datastore


def _unique_combinations(model, ignore_pk=False):
    unique_names = [
        [model._meta.get_field(y).name for y in x] for x in model._meta.unique_together
    ]

    for field in model._meta.fields:
        if field.primary_key and ignore_pk:
            continue

        if field.unique:
            unique_names.append([field.name])

    return [sorted(x) for x in unique_names]


def _format_value_for_identifier(value):
    # AppEngine max key length is 500 chars, so if the value is a string we hexdigest it to reduce the length
    # otherwise we str() it as it's probably an int or bool or something.
    return (
        md5(value.encode("utf-8")).hexdigest()
        if isinstance(value, basestring)
        else str(value)
    )


def unique_identifiers_from_entity(
    model, entity, ignore_pk=False, ignore_null_values=True
):
    """
        Given an instance, this function returns a list of identifiers that represent
        unique field/value combinations.
    """

    UNSUPPORTED_DB_TYPES = {"ListField", "SetField", "DictField"}

    unique_combinations = _unique_combinations(model, ignore_pk)

    meta = model._meta

    identifiers = []
    for combination in unique_combinations:
        identifier = []

        include_combination = True

        for field_name in combination:
            field = meta.get_field(field_name)
            if field.get_internal_type() in UNSUPPORTED_DB_TYPES:
                raise TypeError(
                    "Unique support for {} is not yet implemented".format(
                        field.get_internal_type()
                    )
                )

            if field.primary_key:
                value = entity.key().id_or_name()
            else:
                value = entity.get(field.column)  # Get the value from the entity

            if value is None and ignore_null_values:
                include_combination = False

            identifier.append(
                "{}:{}".format(field_name, _format_value_for_identifier(value))
            )

        if include_combination:
            identifiers.append(model._meta.db_table + "|" + "|".join(identifier))

    return identifiers


def query_is_unique(model, query):
    """
        If the query is entirely on unique constraints then return the unique identifier for
        that unique combination. Otherwise return False
    """

    if isinstance(query, datastore.MultiQuery):
        # By definition, a multiquery is not unique
        return False

    combinations = _unique_combinations(model)

    queried_fields = [x.strip() for x in query.keys()]

    for combination in combinations:
        unique_match = True
        for field in combination:
            if field == model._meta.pk.column:
                field = "__key__"

            # We don't match this combination if the field didn't exist in the queried fields
            # or if it was, but the value was None (you can have multiple NULL values, they aren't unique)
            key = "{} =".format(field)
            if key not in queried_fields or query[key] is None:
                unique_match = False
                break

        if unique_match:
            return "|".join(
                [model._meta.db_table]
                + [
                    "{}:{}".format(
                        x, _format_value_for_identifier(query["{} =".format(x)])
                    )
                    for x in combination
                ]
            )

    return False
