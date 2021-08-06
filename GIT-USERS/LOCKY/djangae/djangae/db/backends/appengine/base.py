# STANDARD LIB
import datetime
import decimal
import warnings

# LIBRARIES
from django.conf import settings
from django.db import DatabaseError
from django.db.backends import (
    BaseDatabaseOperations,
    BaseDatabaseClient,
    BaseDatabaseIntrospection,
    BaseDatabaseWrapper,
    BaseDatabaseFeatures,
    BaseDatabaseValidation,
)

try:
    from django.db.backends.schema import BaseDatabaseSchemaEditor
except ImportError:
    # Django < 1.7 doesn't have BaseDatabaseSchemaEditor
    class BaseDatabaseSchemaEditor(object):
        pass


from django.db.backends.creation import BaseDatabaseCreation
from django.utils import timezone
from google.appengine.api.datastore_types import Blob, Text
from google.appengine.ext.db import metadata
from google.appengine.ext import testbed
from google.appengine.api.datastore import Key

# DJANGAE
from djangae.utils import find_project_root
from djangae.db.utils import decimal_to_string, make_timezone_naive, get_datastore_key
from djangae.db.backends.appengine import caching
from djangae.indexing import load_special_indexes
from .commands import (
    SelectCommand,
    InsertCommand,
    FlushCommand,
    UpdateCommand,
    DeleteCommand,
    get_field_from_column,
)

from djangae.db.backends.appengine import dbapi as Database


class Connection(object):
    """ Dummy connection class """

    def __init__(self, wrapper, params):
        self.creation = wrapper.creation
        self.ops = wrapper.ops
        self.params = params
        self.queries = []

    def rollback(self):
        pass

    def commit(self):
        pass

    def close(self):
        pass


class Cursor(object):
    """ Dummy cursor class """

    def __init__(self, connection):
        self.connection = connection
        self.start_cursor = None
        self.returned_ids = []
        self.rowcount = -1
        self.last_select_command = None
        self.last_delete_command = None

    def execute(self, sql, *params):
        if isinstance(sql, SelectCommand):
            # Also catches subclasses of SelectCommand (e.g Update)
            self.last_select_command = sql
            self.rowcount = self.last_select_command.execute() or -1
        elif isinstance(sql, FlushCommand):
            sql.execute()
        elif isinstance(sql, UpdateCommand):
            self.rowcount = sql.execute()
        elif isinstance(sql, DeleteCommand):
            self.rowcount = sql.execute()
        elif isinstance(sql, InsertCommand):
            self.connection.queries.append(sql)
            self.returned_ids = sql.execute()
        else:
            raise Database.CouldBeSupportedError(
                "Can't execute traditional SQL: '%s' (although perhaps we could make GQL work)",
                sql,
            )

    def next(self):
        row = self.fetchone()
        if row is None:
            raise StopIteration
        return row

    def fetchone(self, delete_flag=False):
        try:
            if isinstance(self.last_select_command.results, (int, long)):
                # Handle aggregate (e.g. count)
                return (self.last_select_command.results,)
            else:
                entity = self.last_select_command.next_result()
        except StopIteration:  # FIXME: does this ever get raised?  Where from?
            entity = None

        if entity is None:
            return None

        ## FIXME: Move this to SelectCommand.next_result()
        result = []

        # If there is extra_select prepend values to the results list
        for col, query in self.last_select_command.extra_select.items():
            result.append(entity.get(col))

        for col in self.last_select_command.queried_fields:
            if col == "__key__":
                key = entity if isinstance(entity, Key) else entity.key()
                self.returned_ids.append(key)
                result.append(key.id_or_name())
            else:
                field = get_field_from_column(self.last_select_command.model, col)
                value = self.connection.ops.convert_values(entity.get(col), field)
                result.append(value)

        return result

    def fetchmany(self, size, delete_flag=False):
        if not self.last_select_command.results:
            return []

        result = []
        i = 0
        while i < size:
            entity = self.fetchone(delete_flag)
            if entity is None:
                break

            result.append(entity)
            i += 1

        return result

    @property
    def lastrowid(self):
        return self.returned_ids[-1].id_or_name()

    def __iter__(self):
        return self


class DatabaseOperations(BaseDatabaseOperations):
    compiler_module = "djangae.db.backends.appengine.compiler"

    def quote_name(self, name):
        return name

    def convert_values(self, value, field):
        """ Called when returning values from the datastore"""

        value = super(DatabaseOperations, self).convert_values(value, field)

        db_type = field.db_type(self.connection)
        if db_type == "string" and isinstance(value, str):
            value = value.decode("utf-8")
        elif db_type == "datetime":
            value = self.connection.ops.value_from_db_datetime(value)
        elif db_type == "date":
            value = self.connection.ops.value_from_db_date(value)
        elif db_type == "time":
            value = self.connection.ops.value_from_db_time(value)
        elif db_type == "decimal":
            value = self.connection.ops.value_from_db_decimal(value)
        elif db_type == "list":
            if not value:
                value = []  # Convert None back to an empty list
        elif db_type == "set":
            if not value:
                value = set()
            else:
                value = set(value)

        return value

    def sql_flush(self, style, tables, seqs, allow_cascade=False):

        creation = self.connection.creation
        if creation.testbed:
            creation._destroy_test_db(":memory:", verbosity=1)
            creation._create_test_db(":memory:", autoclobber=True)
            caching.clear_all_caches()
            return []
        else:
            return [FlushCommand(table) for table in tables]

    def prep_lookup_key(self, model, value, field):
        if isinstance(value, basestring):
            value = value[:500]
            left = value[500:]
            if left:
                warnings.warn(
                    "Truncating primary key that is over 500 characters. "
                    "THIS IS AN ERROR IN YOUR PROGRAM.",
                    RuntimeWarning,
                )
            value = get_datastore_key(model, value)
        else:
            value = get_datastore_key(model, value)

        return value

    def prep_lookup_decimal(self, model, value, field):
        return self.value_to_db_decimal(value, field.max_digits, field.decimal_places)

    def prep_lookup_date(self, model, value, field):
        return self.value_to_db_datetime(value)

    def prep_lookup_time(self, model, value, field):
        return self.value_to_db_time(value)

    def prep_lookup_value(self, model, value, field, constraint=None):
        if field.primary_key and (
            constraint is None or constraint.col == model._meta.pk.column
        ):
            return self.prep_lookup_key(model, value, field)

        db_type = field.db_type(self.connection)

        if db_type == "decimal":
            return self.prep_lookup_decimal(model, value, field)

        elif db_type == "date":
            return self.prep_lookup_date(model, value, field)
        elif db_type == "time":
            return self.prep_lookup_time(model, value, field)
        elif db_type in ("list", "set"):
            if hasattr(value, "__len__") and not value:
                value = None  # Convert empty lists to None
            elif hasattr(value, "__iter__"):
                # Convert sets to lists
                value = list(value)

        return value

    def value_for_db(self, value, field):
        if value is None:
            return None

        db_type = field.db_type(self.connection)

        if db_type == "string" or db_type == "text":
            if isinstance(value, str):
                try:
                    value = value.decode("utf-8")
                except UnicodeDecodeError:
                    # This must be a Django databaseerror, because the exception happens too
                    # early before Django's exception wrapping can take effect (e.g. it happens on SQL
                    # construction, not on execution.
                    raise DatabaseError("Bytestring is not encoded in utf-8")

            # The SDK raises BadValueError for unicode sub-classes like SafeText.
            value = unicode(value)

            if db_type == "text":
                value = Text(value)
        elif db_type == "bytes":
            # Store BlobField, DictField and EmbeddedModelField values as Blobs.
            value = Blob(value)
        elif db_type == "date":
            value = self.value_to_db_date(value)
        elif db_type == "datetime":
            value = self.value_to_db_datetime(value)
        elif db_type == "time":
            value = self.value_to_db_time(value)
        elif db_type == "decimal":
            value = self.value_to_db_decimal(
                value, field.max_digits, field.decimal_places
            )
        elif db_type in ("list", "set"):
            if hasattr(value, "__len__") and not value:
                value = None  # Convert empty lists to None
            elif hasattr(value, "__iter__"):
                # Convert sets to lists
                value = list(value)

        return value

    def last_insert_id(self, cursor, db_table, column):
        return cursor.lastrowid

    def fetch_returned_insert_id(self, cursor):
        return cursor.lastrowid

    def value_to_db_datetime(self, value):
        value = make_timezone_naive(value)
        return value

    def value_to_db_date(self, value):
        if value is not None:
            value = datetime.datetime.combine(value, datetime.time())
        return value

    def value_to_db_time(self, value):
        if value is not None:
            value = make_timezone_naive(value)
            value = datetime.datetime.combine(datetime.datetime.fromtimestamp(0), value)
        return value

    def value_to_db_decimal(self, value, max_digits, decimal_places):
        if isinstance(value, decimal.Decimal):
            return decimal_to_string(value, max_digits, decimal_places)
        return value

    # Unlike value_to_db, these are not overridden or standard Django, it's just nice to have symmetry
    def value_from_db_datetime(self, value):
        if isinstance(value, (int, long)):
            # App Engine Query's don't return datetime fields (unlike Get) I HAVE NO IDEA WHY, APP ENGINE SUCKS MONKEY BALLS
            value = datetime.datetime.fromtimestamp(float(value) / 1000000.0)

        if value is not None and settings.USE_TZ and timezone.is_naive(value):
            value = value.replace(tzinfo=timezone.utc)
        return value

    def value_from_db_date(self, value):
        if isinstance(value, (int, long)):
            # App Engine Query's don't return datetime fields (unlike Get) I HAVE NO IDEA WHY, APP ENGINE SUCKS MONKEY BALLS
            value = datetime.datetime.fromtimestamp(float(value) / 1000000.0)

        if value:
            value = value.date()
        return value

    def value_from_db_time(self, value):
        if isinstance(value, (int, long)):
            # App Engine Query's don't return datetime fields (unlike Get) I HAVE NO IDEA WHY, APP ENGINE SUCKS MONKEY BALLS
            value = datetime.datetime.fromtimestamp(float(value) / 1000000.0).time()

        if value is not None and settings.USE_TZ and timezone.is_naive(value):
            value = value.replace(tzinfo=timezone.utc)

        if value:
            value = value.time()
        return value

    def value_from_db_decimal(self, value):
        if value:
            value = decimal.Decimal(value)
        return value


class DatabaseClient(BaseDatabaseClient):
    pass


class DatabaseCreation(BaseDatabaseCreation):
    data_types = {
        "AutoField": "key",
        "RelatedAutoField": "key",
        "ForeignKey": "key",
        "OneToOneField": "key",
        "ManyToManyField": "key",
        "BigIntegerField": "long",
        "BooleanField": "bool",
        "CharField": "string",
        "CommaSeparatedIntegerField": "string",
        "DateField": "date",
        "DateTimeField": "datetime",
        "DecimalField": "decimal",
        "EmailField": "string",
        "FileField": "string",
        "FilePathField": "string",
        "FloatField": "float",
        "ImageField": "string",
        "IntegerField": "integer",
        "IPAddressField": "string",
        "NullBooleanField": "bool",
        "PositiveIntegerField": "integer",
        "PositiveSmallIntegerField": "integer",
        "SlugField": "string",
        "SmallIntegerField": "integer",
        "TimeField": "time",
        "URLField": "string",
        "TextField": "text",
        "XMLField": "text",
    }

    def __init__(self, *args, **kwargs):
        self.testbed = None
        super(DatabaseCreation, self).__init__(*args, **kwargs)

    def sql_create_model(self, model, *args, **kwargs):
        return [], {}

    def sql_for_pending_references(self, model, *args, **kwargs):
        return []

    def sql_indexes_for_model(self, model, *args, **kwargs):
        return []

    def _create_test_db(self, verbosity, autoclobber):
        return ":memory:"

    def _destroy_test_db(self, name, verbosity):
        pass


class DatabaseIntrospection(BaseDatabaseIntrospection):
    def get_table_list(self, cursor):
        return metadata.get_kinds()


class DatabaseSchemaEditor(BaseDatabaseSchemaEditor):
    def column_sql(self, model, field):
        return "", {}

    def create_model(self, model):
        """ Don't do anything when creating tables """
        pass


class DatabaseFeatures(BaseDatabaseFeatures):
    empty_fetchmany_value = []
    supports_transactions = False  # FIXME: Make this True!
    can_return_id_from_insert = True
    supports_select_related = False
    autocommits_when_autocommit_is_off = True
    uses_savepoints = False


class DatabaseWrapper(BaseDatabaseWrapper):
    operators = {
        "exact": "= %s",
        "gt": "> %s",
        "gte": ">= %s",
        "lt": "< %s",
        "lte": "<= %s",
    }

    Database = Database

    def __init__(self, *args, **kwargs):
        super(DatabaseWrapper, self).__init__(*args, **kwargs)

        self.features = DatabaseFeatures(self)
        self.ops = DatabaseOperations(self)
        self.client = DatabaseClient(self)
        self.creation = DatabaseCreation(self)
        self.introspection = DatabaseIntrospection(self)
        self.validation = BaseDatabaseValidation(self)
        self.autocommit = True

    def is_usable(self):
        return True

    def get_connection_params(self):
        return {}

    def get_new_connection(self, params):
        conn = Connection(self, params)
        load_special_indexes()  # make sure special indexes are loaded
        return conn

    def init_connection_state(self):
        pass

    def _start_transaction_under_autocommit(self):
        pass

    def _set_autocommit(self, enabled):
        self.autocommit = enabled

    def create_cursor(self):
        if not self.connection:
            self.connection = self.get_new_connection(self.settings_dict)

        return Cursor(self.connection)

    def schema_editor(self, *args, **kwargs):
        return DatabaseSchemaEditor(self, *args, **kwargs)

    def _cursor(self):
        # For < Django 1.6 compatiblity
        return self.create_cursor()
