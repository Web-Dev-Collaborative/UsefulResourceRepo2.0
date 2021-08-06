#LIBRARIES
from django.db.models.sql import compiler
# Following two ImportError blocks are for < 1.6 compatibility
try:
    from django.db.models.sql.compiler import SQLDateCompiler as DateCompiler
except ImportError:
    class DateCompiler(object):
        pass
try:
    from django.db.models.sql.compiler import SQLDateTimeCompiler as DateTimeCompiler
except ImportError:
    class DateTimeCompiler(object):
        pass

#DJANGAE
from .commands import InsertCommand, SelectCommand, UpdateCommand, DeleteCommand


class SQLCompiler(compiler.SQLCompiler):
    def as_sql(self):
        self.pre_sql_setup()
        self.refcounts_before = self.query.alias_refcount.copy()
        select = SelectCommand(
            self.connection,
            self.query
        )
        return (select, [])


class SQLInsertCompiler(compiler.SQLInsertCompiler, SQLCompiler):
    def __init__(self, *args, **kwargs):
        self.return_id = None
        super(SQLInsertCompiler, self).__init__(*args, **kwargs)

    def as_sql(self):
        self.pre_sql_setup()
        return [ (InsertCommand(self.connection, self.query.model, self.query.objs, self.query.fields, self.query.raw), []) ]


class SQLDeleteCompiler(compiler.SQLDeleteCompiler, SQLCompiler):
    def as_sql(self):
        return (DeleteCommand(self.connection, self.query), [])


class SQLUpdateCompiler(compiler.SQLUpdateCompiler, SQLCompiler):

    def __init__(self, *args, **kwargs):
        super(SQLUpdateCompiler, self).__init__(*args, **kwargs)

    def as_sql(self):
        self.pre_sql_setup()
        return (UpdateCommand(self.connection, self.query), [])


class SQLAggregateCompiler(compiler.SQLAggregateCompiler, SQLCompiler):
    pass


class SQLDateCompiler(DateCompiler, SQLCompiler):
    pass


class SQLDateTimeCompiler(DateTimeCompiler, SQLCompiler):
    pass
