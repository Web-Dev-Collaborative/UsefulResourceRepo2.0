# STANDARD LIB
from datetime import datetime, date
import logging
import copy
from functools import partial
from itertools import chain, groupby

# LIBRARIES
from django.core.cache import cache
from django.db.backends.mysql.compiler import SQLCompiler
from django.db import IntegrityError
from django.db.models import Field
from django.db.models.sql.datastructures import EmptyResultSet
from django.db.models.sql.where import AND, OR, Constraint
from django.db.models.sql.where import EmptyWhere
from django.db.models.query_utils import InvalidQuery
from django import dispatch
from google.appengine.api import datastore, datastore_errors
from google.appengine.api.datastore import Query
from google.appengine.ext import db

# DJANGAE
from djangae.db.backends.appengine.dbapi import CouldBeSupportedError, NotSupportedError
from djangae.db.utils import (
    get_datastore_key,
    django_instance_to_entity,
    get_datastore_kind,
    get_prepared_db_value,
    MockInstance,
    get_top_concrete_parent,
    get_concrete_parents,
    has_concrete_parents,
)
from djangae.indexing import (
    special_indexes_for_column,
    REQUIRES_SPECIAL_INDEXES,
    add_special_index,
)
from djangae.utils import on_production, in_testing
from djangae.db import constraints, utils
from djangae.db.backends.appengine import caching
from djangae.db.unique_utils import query_is_unique
from djangae.db.backends.appengine import transforms

DATE_TRANSFORMS = {
    "year": transforms.year_transform,
    "month": transforms.month_transform,
    "day": transforms.day_transform,
    "hour": transforms.hour_transform,
    "minute": transforms.minute_transform,
    "second": transforms.second_transform,
}

DJANGAE_LOG = logging.getLogger("djangae")

OPERATORS_MAP = {
    "exact": "=",
    "gt": ">",
    "gte": ">=",
    "lt": "<",
    "lte": "<=",
    # The following operators are supported with special code below.
    "isnull": None,
    "in": None,
    "range": None,
}

REVERSE_OP_MAP = {"=": "exact", ">": "gt", ">=": "gte", "<": "lt", "<=": "lte"}

INEQUALITY_OPERATORS = frozenset([">", "<", "<=", ">="])


def get_field_from_column(model, column):
    # FIXME: memoize this
    for field in model._meta.fields:
        if field.column == column:
            return field
    return None


def field_conv_year_only(value):
    value = ensure_datetime(value)
    return datetime(value.year, 1, 1, 0, 0)


def field_conv_month_only(value):
    value = ensure_datetime(value)
    return datetime(value.year, value.month, 1, 0, 0)


def field_conv_day_only(value):
    value = ensure_datetime(value)
    return datetime(value.year, value.month, value.day, 0, 0)


def ensure_datetime(value):
    """
        Painfully, sometimes the Datastore returns dates as datetime objects, and sometimes
        it returns them as unix timestamps in microseconds!!
    """
    if isinstance(value, long):
        return datetime.fromtimestamp(value / 1000000)
    return value


FILTER_CMP_FUNCTION_MAP = {
    "exact": lambda a, b: a == b,
    "iexact": lambda a, b: a.lower() == b.lower(),
    "gt": lambda a, b: a > b,
    "lt": lambda a, b: a < b,
    "gte": lambda a, b: a >= b,
    "lte": lambda a, b: a <= b,
    "isnull": lambda a, b: (b and (a is None)) or (a is not None),
    "in": lambda a, b: a in b,
    "startswith": lambda a, b: a.startswith(b),
    "range": lambda a, b: b[0] < a < b[1],  # I'm assuming that b is a tuple
    "year": lambda a, b: field_conv_year_only(a) == b,
}


def log_once(logging_call, text, args):
    """
        Only logs one instance of the combination of text and arguments to the passed
        logging function
    """
    identifier = "%s:%s" % (text, args)
    if identifier in log_once.logged:
        return
    logging_call(text % args)
    log_once.logged.add(identifier)


log_once.logged = set()


def parse_constraint(child, connection, negated=False):
    # First, unpack the constraint
    constraint, op, annotation, value = child
    was_list = isinstance(value, (list, tuple))
    packed, value = constraint.process(op, value, connection)
    alias, column, db_type = packed

    if constraint.field.db_type(connection) in ("bytes", "text"):
        raise NotSupportedError(
            "Text and Blob fields are not indexed by the datastore, so you can't filter on them"
        )

    if op not in REQUIRES_SPECIAL_INDEXES:
        # Don't convert if this op requires special indexes, it will be handled there
        value = [
            connection.ops.prep_lookup_value(
                constraint.field.model, x, constraint.field, constraint=constraint
            )
            for x in value
        ]

        # Don't ask me why, but constraint.process on isnull wipes out the value (it returns an empty list)
        # so we have to special case this to use the annotation value instead
        if op == "isnull":
            value = [annotation]

            if constraint.field.primary_key and value[0]:
                raise EmptyResultSet()

        if not was_list:
            value = value[0]
    else:
        if negated:
            raise CouldBeSupportedError(
                "Special indexing does not currently supported negated queries. See #80"
            )

        if not was_list:
            value = value[0]

        add_special_index(
            constraint.field.model, column, op
        )  # Add the index if we can (e.g. on dev_appserver)

        if op not in special_indexes_for_column(constraint.field.model, column):
            raise RuntimeError(
                "There is a missing index in your djangaeidx.yaml - \n\n{0}:\n\t{1}: [{2}]".format(
                    constraint.field.model, column, op
                )
            )

        indexer = REQUIRES_SPECIAL_INDEXES[op]
        column = indexer.indexed_column_name(column)
        value = indexer.prep_value_for_query(value)
        op = indexer.prep_query_operator(op)

    return column, op, value


def convert_keys_to_entities(results):
    """
        If for performance reasons we do a keys_only query, then the result
        of the query will be a list of keys, not a list of entities. Here
        we convert to a FakeEntity type which should be enough for the rest of the
        pipeline to process without knowing any different!
    """

    class FakeEntity(dict):
        def __init__(self, key):
            self._key = key

        def key(self):
            return self._key

    for result in results:
        yield FakeEntity(result)


def _convert_entity_based_on_query_options(entity, opts):
    if opts.keys_only:
        return entity.key()

    if opts.projection:
        for k in entity.keys()[:]:
            if k not in list(opts.projection) + ["class"]:
                del entity[k]

    return entity


def _get_key(query):
    return query["__key__ ="]


class QueryByKeys(object):
    def __init__(self, queries, ordering):
        self.queries = queries
        self.queries_by_key = {
            a: list(b) for a, b in groupby(queries, lambda x: _get_key(x))
        }
        self.ordering = ordering
        self._Query__kind = queries[0]._Query__kind

    def Run(self, limit=None, offset=None):
        assert not self.queries[
            0
        ]._Query__ancestor_pb  # FIXME: We don't handle this yet

        # FIXME: What if the query options differ?
        opts = self.queries[0]._Query__query_options

        results = None

        # If we have a single key lookup going on, just hit the cache
        if len(self.queries_by_key) == 1:
            ret = caching.get_from_cache_by_key(self.queries_by_key.keys()[0])
            if ret is not None:
                results = [ret]

        # If there was nothing in the cache, or we had more than one key, then use Get()
        if results is None:
            results = sorted(
                (x for x in datastore.Get(self.queries_by_key.keys()) if x is not None),
                cmp=partial(utils.django_ordering_comparison, self.ordering),
            )

        results = [
            _convert_entity_based_on_query_options(x, opts)
            for x in results
            if any(
                [
                    utils.entity_matches_query(x, qry)
                    for qry in self.queries_by_key[x.key()]
                ]
            )
        ]

        if offset:
            results = results[offset:]

        if limit is not None:
            results = results[:limit]

        return iter(results)

    def Count(self, limit, offset):
        return len([x for x in self.Run(limit, offset)])


class NoOpQuery(object):
    def Run(self, limit, offset):
        return []

    def Count(self, limit, offset):
        return 0


class UniqueQuery(object):
    """
        This mimics a normal query but hits the cache if possible. It must
        be passed the set of unique fields that form a unique constraint
    """

    def __init__(self, unique_identifier, gae_query, model):
        self._identifier = unique_identifier
        self._gae_query = gae_query
        self._model = model

    def Run(self, limit, offset):
        opts = self._gae_query._Query__query_options
        if opts.keys_only or opts.projection:
            return self._gae_query.Run(limit=limit, offset=offset)

        ret = caching.get_from_cache(self._identifier)
        if ret is None:
            ret = [x for x in self._gae_query.Run(limit=limit, offset=offset)]
            if len(ret) == 1:
                caching.add_entity_to_context_cache(self._model, ret[0])
            return iter(ret)

        return iter([ret])

    def Count(self, limit, offset):
        ret = caching.get_from_cache(self._identifier)
        if ret is None:
            return self._gae_query.Count(limit=limit, offset=offset)
        return 1


def _convert_ordering(query):
    if not query.default_ordering:
        result = query.order_by
    else:
        result = query.order_by or query.get_meta().ordering

    if result:
        # We factor out cross-table orderings (rather than raising NotSupportedError) otherwise we'll break
        # the admin which uses them. We log a warning when this happens though
        ordering = [x for x in result if not (isinstance(x, basestring) and "__" in x)]
        if len(ordering) < len(result):
            diff = set(result) - set(ordering)
            log_once(
                DJANGAE_LOG.warning if not on_production() else DJANGAE_LOG.debug,
                "The following orderings were ignored as cross-table orderings are not supported on the datastore: %s",
                diff,
            )
        result = ordering

    if "?" in result:
        raise NotSupportedError("Random ordering is not supported on the datastore")

    return result


class SelectCommand(object):
    def __init__(self, connection, query, keys_only=False):

        self.original_query = query
        self.connection = connection

        self.limits = (query.low_mark, query.high_mark)

        opts = query.get_meta()

        self.distinct = query.distinct
        self.distinct_values = set()
        self.distinct_on_field = None
        self.distinct_field_convertor = None
        self.queried_fields = []
        self.model = query.model
        self.pk_col = opts.pk.column
        self.is_count = query.aggregates
        self.extra_select = query.extra_select
        self._set_db_table()

        self._validate_query_is_possible(query)
        self.ordering = _convert_ordering(query)

        # If the query uses defer()/only() then we need to process deferred. We have to get all deferred columns
        # for all (concrete) inherited models and then only include columns if they appear in that list
        deferred_columns = {}
        query.deferred_to_data(deferred_columns, query.deferred_to_columns_cb)
        inherited_db_tables = [
            x._meta.db_table for x in get_concrete_parents(self.model)
        ]
        only_load = list(
            chain(*[list(deferred_columns.get(x, [])) for x in inherited_db_tables])
        )

        if query.select:
            for x in query.select:
                if hasattr(x, "field"):
                    # In Django 1.6+ 'x' above is a SelectInfo (which is a tuple subclass), whereas in 1.5 it's a tuple
                    # in 1.6 x[1] == Field, but 1.5 x[1] == unicode (column name)
                    if x.field is None:
                        column = x.col.col[1]  # This is the column we are getting
                        lookup_type = x.col.lookup_type

                        self.distinct_on_field = column

                        # This whole section of code is weird, and is probably better implemented as a custom Query type (like QueryByKeys)
                        # basically, appengine gives back dates as a time since the epoch, we convert it to a date, then floor it, then convert it back
                        # in our transform function. The transform is applied when the results are read back so that only distinct values are returned.
                        # this is very hacky...
                        if lookup_type in DATE_TRANSFORMS:
                            self.distinct_field_convertor = lambda value: DATE_TRANSFORMS[
                                lookup_type
                            ](
                                self.connection, value
                            )
                        else:
                            raise CouldBeSupportedError(
                                "Unhandled lookup_type %s" % lookup_type
                            )
                    else:
                        column = x.field.column
                else:
                    column = x[1]

                if only_load and column not in only_load:
                    continue

                self.queried_fields.append(column)
        else:
            self.queried_fields = [
                x.column
                for x in opts.fields
                if (not only_load) or (x.column in only_load)
            ]

        self.keys_only = keys_only or self.queried_fields == [opts.pk.column]

        assert self.queried_fields

        # Projection queries don't return results unless all projected fields are
        # indexed on the model. This means if you add a field, and all fields on the model
        # are projectable, you will never get any results until you've resaved all of them.

        # Because it's not possible to detect this situation, we only try a projection query if a
        # subset of fields was specified (e.g. values_list('bananas')) which makes the behaviour a
        # bit more predictable. It would be nice at some point to add some kind of force_projection()
        # thing on a queryset that would do this whenever possible, but that's for the future, maybe.
        try_projection = (self.keys_only is False) and bool(self.queried_fields)

        if not self.queried_fields:
            self.queried_fields = [x.column for x in opts.fields]

        self.excluded_pks = set()

        self.has_inequality_filter = False
        self.all_filters = []
        self.results = None

        self.gae_query = None

        projection_fields = []

        if try_projection:
            for field in self.queried_fields:
                # We don't include the primary key in projection queries...
                if field == self.pk_col:
                    order_fields = set([x.strip("-") for x in self.ordering])

                    if self.pk_col in order_fields or "pk" in order_fields:
                        # If we were ordering on __key__ we can't do a projection at all
                        self.projection_fields = []
                        break
                    continue

                # Text and byte fields aren't indexed, so we can't do a
                # projection query
                f = get_field_from_column(self.model, field)
                if not f:
                    raise CouldBeSupportedError(
                        "Attemping a cross-table select or dates query, or something?!"
                    )
                assert (
                    f
                )  # If this happens, we have a cross-table select going on! #FIXME
                db_type = f.db_type(connection)

                if db_type in ("bytes", "text", "list", "set"):
                    projection_fields = []
                    break

                projection_fields.append(field)

        self.projection = list(set(projection_fields)) or None
        if opts.parents:
            self.projection = None

        if isinstance(query.where, EmptyWhere):
            # Empty where means return nothing!
            raise EmptyResultSet()
        else:
            where_tables = list(set([x[0] for x in query.where.get_cols() if x[0]]))
            if where_tables and where_tables != [query.model._meta.db_table]:
                raise NotSupportedError(
                    "Cross-join WHERE constraints aren't supported: %s"
                    % query.where.get_cols()
                )

            from dnf import parse_dnf

            self.where, columns = parse_dnf(query.where, self.connection)

        # DISABLE PROJECTION IF WE ARE FILTERING ON ONE OF THE PROJECTION_FIELDS
        for field in self.projection or []:
            if field in columns:
                self.projection = None
                break
        try:
            # If the PK was queried, we switch it in our queried
            # fields store with __key__
            pk_index = self.queried_fields.index(self.pk_col)
            self.queried_fields[pk_index] = "__key__"
        except ValueError:
            pass

    def execute(self):
        self.gae_query = self._build_gae_query()
        self.results = None
        self.query_done = False
        self.aggregate_type = "count" if self.is_count else None
        self._do_fetch()

    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False

        return self.__repr__() == other.__repr__()

    def __repr__(self):
        return "<SelectCommand - SELECT {} FROM {} WHERE {}>".format(
            ", ".join(self.queried_fields or []), self.db_table, self.where
        )

    def _set_db_table(self):
        """ Work out which Datastore kind we should actually be querying. This allows for poly
            models, i.e. non-abstract parent models which we support by storing all fields for
            both the parent model and its child models on the parent table.
        """
        inheritance_root = get_top_concrete_parent(self.model)
        self.db_table = inheritance_root._meta.db_table

    def _validate_query_is_possible(self, query):
        """ Given the *django* query, check the following:
            - The query only has one inequality filter
            - The query does no joins
            - The query ordering is compatible with the filters
        """
        # Check for joins, we ignore select related tables as they aren't actually used (the connector marks select
        # related as unsupported in its features)
        tables = [k for k, v in query.alias_refcount.items() if v]
        inherited_tables = set([x._meta.db_table for x in query.model._meta.parents])
        select_related_tables = set([y[0][0] for y in query.related_select_cols])
        tables = set(tables) - inherited_tables - select_related_tables

        if len(tables) > 1:
            raise NotSupportedError(
                """
                The appengine database connector does not support JOINs. The requested join map follows\n
                %s
            """
                % query.join_map
            )

        if query.aggregates:
            if query.aggregates.keys() == [None]:
                agg_col = query.aggregates[None].col
                opts = self.model._meta
                if agg_col != "*" and agg_col != (opts.db_table, opts.pk.column):
                    raise NotSupportedError(
                        "Counting anything other than '*' or the primary key is not supported"
                    )
            else:
                raise NotSupportedError("Unsupported aggregate query")

    def _build_gae_query(self):
        """ Build and return the Datstore Query object. """
        query_kwargs = {"kind": str(self.db_table)}

        if self.distinct:
            if self.projection:
                query_kwargs["distinct"] = True
            else:
                logging.warning(
                    "Ignoring distinct on a query where a projection wasn't possible"
                )

        if self.keys_only:
            query_kwargs["keys_only"] = self.keys_only
        elif self.projection:
            query_kwargs["projection"] = self.projection

        query = Query(**query_kwargs)

        if has_concrete_parents(self.model) and not self.model._meta.proxy:
            query["class ="] = self.model._meta.db_table

        ordering = []
        for order in self.ordering:
            if isinstance(order, (long, int)):
                direction = (
                    datastore.Query.ASCENDING
                    if order == 1
                    else datastore.Query.DESCENDING
                )
                order = self.queried_fields[0]
            else:
                direction = (
                    datastore.Query.DESCENDING
                    if order.startswith("-")
                    else datastore.Query.ASCENDING
                )
                order = order.lstrip("-")

            if order == self.model._meta.pk.column or order == "pk":
                order = "__key__"

            # Flip the ordering if someone called reverse() on the queryset
            if not self.original_query.standard_ordering:
                direction = (
                    datastore.Query.DESCENDING
                    if direction == datastore.Query.ASCENDING
                    else datastore.Query.ASCENDING
                )

            ordering.append((order, direction))

        def process_and_branch(query, and_branch):
            for child in and_branch[-1]:
                column, op, value = child[1]

                # for column, op, value in and_branch[-1]:
                if column == self.pk_col:
                    column = "__key__"

                    # FIXME: This EmptyResultSet check should happen during normalization so that Django doesn't count it as a query
                    if op == "=" and "__key__ =" in query:
                        # We've already done an exact lookup on a key, this query can't return anything!
                        raise EmptyResultSet()

                    if not isinstance(value, datastore.Key):
                        value = get_datastore_key(self.model, value)

                key = "%s %s" % (column, op)
                try:
                    if key in query:
                        query[key] = [query[key], value]
                    else:
                        query[key] = value
                except datastore_errors.BadFilterError as e:
                    raise NotSupportedError(str(e))

        if self.where:
            queries = []

            # print query._Query__kind, self.where

            for and_branch in self.where[1]:
                # Duplicate the query for all the "OR"s
                queries.append(Query(**query_kwargs))
                queries[-1].update(
                    query
                )  # Make sure we copy across filters (e.g. class =)
                try:
                    if and_branch[0] == "LIT":
                        and_branch = ("AND", [and_branch])
                    process_and_branch(queries[-1], and_branch)
                except EmptyResultSet:
                    # This is a little hacky but basically if there is only one branch in the or, and it raises
                    # and EmptyResultSet, then we just bail, however if there is more than one branch the query the
                    # query might still return something. This logic needs cleaning up and moving to the DNF phase
                    if len(self.where[1]) == 1:
                        return NoOpQuery()
                    else:
                        queries.pop()

            included_pks = [qry["__key__ ="] for qry in queries if "__key__ =" in qry]
            if len(included_pks) == len(
                queries
            ):  # If all queries have a key, we can perform a Get
                return QueryByKeys(
                    queries, ordering
                )  # Just use whatever query to determine the matches
            else:
                if len(queries) > 1:
                    # Disable keys only queries for MultiQuery
                    new_queries = []
                    for query in queries:
                        qry = Query(
                            query._Query__kind,
                            projection=query._Query__query_options.projection,
                        )
                        qry.update(query)
                        new_queries.append(qry)

                    query = datastore.MultiQuery(new_queries, ordering)
                else:
                    query = queries[0]
                    query.Order(*ordering)
        else:
            query.Order(*ordering)

        # If the resulting query was unique, then wrap as a unique query which
        # will hit the cache first
        unique_identifier = query_is_unique(self.model, query)
        if unique_identifier:
            return UniqueQuery(unique_identifier, query, self.model)

        DJANGAE_LOG.debug(
            "Select query: {0}, {1}".format(self.model.__name__, self.where)
        )

        return query

    def _do_fetch(self):
        assert not self.results

        self.results = self._run_query(
            aggregate_type=self.aggregate_type,
            start=self.limits[0],
            limit=None
            if self.limits[1] is None
            else (self.limits[1] - (self.limits[0] or 0)),
        )

        self.query_done = True

    def _run_query(self, limit=None, start=None, aggregate_type=None):
        if aggregate_type is None:
            results = self.gae_query.Run(limit=limit, offset=start)
            if self.keys_only:
                # If we did a keys_only query for performance, we need to wrap the result
                results = convert_keys_to_entities(results)

        elif self.aggregate_type == "count":
            return self.gae_query.Count(limit=limit, offset=start)
        else:
            raise RuntimeError("Unsupported query type")

        if self.extra_select:
            # Construct the extra_select into the results set, this is then sorted with fetchone()
            for attr, query in self.extra_select.iteritems():
                tokens = query[0].split()
                length = len(tokens)
                if length == 3:
                    op = REVERSE_OP_MAP.get(tokens[1])
                    if not op:
                        raise RuntimeError(
                            "Unsupported extra_select operation {0}".format(tokens[1])
                        )
                    fun = FILTER_CMP_FUNCTION_MAP[op]

                    def lazy_eval(results, attr, fun, token_a, token_b):
                        """ Wraps a list or a generator, applys comparision function
                        token_a is an attribute on the result, the lhs. token_b is the rhs
                        attr is the target attribute to store the result
                        """
                        for result in results:
                            if result is None:
                                yield result

                            lhs = result.get(token_a)
                            lhs_type = type(lhs)
                            rhs = lhs_type(token_b)
                            if isinstance(rhs, basestring):
                                rhs = rhs.strip("'").strip('"')  # Strip quotes
                            result[attr] = fun(lhs, rhs)
                            yield result

                    results = lazy_eval(results, attr, fun, tokens[0], tokens[2])

                elif length == 1:

                    def lazy_assign(results, attr, value):
                        """ Wraps a list or a generator, applys attribute assignment
                        """
                        for result in results:
                            if result is None:
                                yield result
                            if isinstance(value, basestring):
                                value = value.strip("'").strip('"')
                                # Horrible SQL type to python conversion attempt
                                try:
                                    value = int(value)
                                except ValueError:
                                    pass
                                # Up for debate
                                # if value == "TRUE":
                                #     value = True
                                # elif value == "FALSE":
                                #     value = False
                            result[attr] = value
                            yield result

                    results = lazy_assign(results, attr, tokens[0])
                else:
                    raise RuntimeError("Unsupported extra_select")
        return results

    def next_result(self):
        while True:
            x = self.results.next()

            if isinstance(x, datastore.Key):
                if x in self.excluded_pks:
                    continue
            elif x.key() in self.excluded_pks:
                continue

            if self.distinct_on_field:  # values for distinct queries
                value = x[self.distinct_on_field]
                value = self.distinct_field_convertor(value)

                if value in self.distinct_values:
                    continue
                else:
                    self.distinct_values.add(value)
                    # Insert modified value into entity before returning the entity. This is dirty,
                    # but Cursor.fetchone (which calls this) wants the entity ID and yet also wants
                    # the correct value for this field. The alternative would be to call
                    # self.distinct_field_convertor again in Cursor.fetchone, but that's wasteful.
                    x[self.distinct_on_field] = value
            return x


class FlushCommand(object):
    """
        sql_flush returns the SQL statements to flush the database,
        which are then executed by cursor.execute()

        We instead return a list of FlushCommands which are called by
        our cursor.execute
    """

    def __init__(self, table):
        self.table = table

    def execute(self):
        table = self.table
        query = datastore.Query(table, keys_only=True)
        while query.Count():
            datastore.Delete(query.Run())

        cache.clear()

        from .caching import clear_context_cache

        clear_context_cache()


@db.non_transactional
def reserve_id(kind, id_or_name):
    if isinstance(id_or_name, (int, long)):
        try:
            db.allocate_id_range(
                datastore.Key.from_path(kind, 1), id_or_name, id_or_name
            )
        except:
            # We don't re-raise because it's not terminal, but if this happens we need to know why
            logging.exception(
                "An error occurred when notifying app engine that an ID has been used. Please report."
            )


class InsertCommand(object):
    def __init__(self, connection, model, objs, fields, raw):
        self.has_pk = any([x.primary_key for x in fields])
        self.entities = []
        self.included_keys = []
        self.model = model

        for obj in objs:
            if self.has_pk:
                # We must convert the PK value here, even though this normally happens in django_instance_to_entity otherwise
                # custom PK fields don't work properly
                value = model._meta.pk.get_db_prep_save(
                    model._meta.pk.pre_save(obj, True), connection
                )
                self.included_keys.append(
                    get_datastore_key(model, value) if value else None
                )
                if not self.model._meta.pk.blank and self.included_keys[-1] is None:
                    raise IntegrityError(
                        "You must specify a primary key value for {} instances".format(
                            model
                        )
                    )
            else:
                # We zip() self.entities and self.included_keys in execute(), so they should be the same legnth
                self.included_keys.append(None)

            self.entities.append(
                django_instance_to_entity(connection, model, fields, raw, obj)
            )

    def execute(self):
        if self.has_pk and not has_concrete_parents(self.model):
            results = []
            # We are inserting, but we specified an ID, we need to check for existence before we Put()
            # We do it in a loop so each check/put is transactional - because it's an ancestor query it shouldn't
            # cost any entity groups

            for key, ent in zip(self.included_keys, self.entities):

                @db.transactional
                def txn():
                    if key is not None:
                        if utils.key_exists(key):
                            raise IntegrityError("Tried to INSERT with existing key")

                    id_or_name = key.id_or_name()
                    if isinstance(id_or_name, basestring) and id_or_name.startswith(
                        "__"
                    ):
                        raise NotSupportedError(
                            "Datastore ids cannot start with __. Id was %s" % id_or_name
                        )

                    if not constraints.constraint_checks_enabled(self.model):
                        # Fast path, just insert
                        results.append(datastore.Put(ent))
                    else:
                        markers = constraints.acquire(self.model, ent)
                        try:
                            results.append(datastore.Put(ent))
                            caching.add_entity_to_context_cache(self.model, ent)
                        except:
                            # Make sure we delete any created markers before we re-raise
                            constraints.release_markers(markers)
                            raise

                # Make sure we notify app engine that we are using this ID
                # FIXME: Copy ancestor across to the template key
                reserve_id(key.kind(), key.id_or_name())

                txn()

            return results
        else:

            if not constraints.constraint_checks_enabled(self.model):
                # Fast path, just bulk insert
                results = datastore.Put(self.entities)
                for entity in self.entities:
                    caching.add_entity_to_context_cache(self.model, entity)
                return results
            else:
                markers = []
                try:
                    # FIXME: We should rearrange this so that each entity is handled individually like above. We'll
                    # lose insert performance, but gain consistency on errors which is more important
                    markers = constraints.acquire_bulk(self.model, self.entities)

                    results = datastore.Put(self.entities)
                    for entity in self.entities:
                        caching.add_entity_to_context_cache(self.model, entity)

                except:
                    to_delete = chain(*markers)
                    constraints.release_markers(to_delete)
                    raise

                for ent, m in zip(self.entities, markers):
                    constraints.update_instance_on_markers(ent, m)

                return results


class DeleteCommand(object):
    def __init__(self, connection, query):
        self.select = SelectCommand(connection, query, keys_only=True)

    def execute(self):
        self.select.execute()

        # This is a little bit more inefficient than just doing a keys_only query and
        # sending it to delete, but I think this is the sacrifice to make for the unique caching layer
        keys = []

        def spawn_query(kind, key):
            qry = Query(kind)
            qry["__key__ ="] = key
            return qry

        queries = [
            spawn_query(self.select.db_table, x.key()) for x in self.select.results
        ]
        if not queries:
            return

        for entity in QueryByKeys(queries, []).Run():
            keys.append(entity.key())

            # Delete constraints if that's enabled
            if constraints.constraint_checks_enabled(self.select.model):
                constraints.release(self.select.model, entity)

            caching.remove_entity_from_context_cache_by_key(entity.key())
        datastore.Delete(keys)


class UpdateCommand(object):
    def __init__(self, connection, query):
        self.model = query.model
        self.select = SelectCommand(connection, query, keys_only=True)
        self.values = query.values
        self.connection = connection

    @db.transactional
    def _update_entity(self, key):
        caching.remove_entity_from_context_cache_by_key(key)

        try:
            result = datastore.Get(key)
        except datastore_errors.EntityNotFoundError:
            reserve_id(key.kind(), key.id_or_name())
            result = datastore.Entity(key.kind(), id=key.id_or_name())

        original = copy.deepcopy(result)

        instance_kwargs = {field.attname: value for field, param, value in self.values}
        instance = MockInstance(**instance_kwargs)
        for field, param, value in self.values:
            result[field.column] = get_prepared_db_value(
                self.connection, instance, field, raw=True
            )
            # Add special indexed fields
            for index in special_indexes_for_column(self.model, field.column):
                indexer = REQUIRES_SPECIAL_INDEXES[index]
                result[
                    indexer.indexed_column_name(field.column)
                ] = indexer.prep_value_for_database(value)

        if not constraints.constraint_checks_enabled(self.model):
            # The fast path, no constraint checking
            datastore.Put(result)
            caching.add_entity_to_context_cache(self.model, result)
        else:
            to_acquire, to_release = constraints.get_markers_for_update(
                self.model, original, result
            )

            # Acquire first, because if that fails then we don't want to alter what's already there
            constraints.acquire_identifiers(to_acquire, result.key())
            try:
                datastore.Put(result)
                caching.add_entity_to_context_cache(self.model, result)
            except:
                constraints.release_identifiers(to_acquire)
                raise
            else:
                # Now we release the ones we don't want anymore
                constraints.release_identifiers(to_release)

    def execute(self):
        self.select.execute()

        results = self.select.results

        i = 0
        for result in results:
            self._update_entity(result.key())
            i += 1

        return i
