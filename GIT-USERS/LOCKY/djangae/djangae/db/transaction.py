from google.appengine.api.datastore import (
    CreateTransactionOptions,
    _GetConnection,
    _PushConnection,
    _PopConnection,
    _SetConnection,
    IsInTransaction
)

from google.appengine.datastore.datastore_rpc import TransactionOptions

from djangae.db.backends.appengine import caching


class AtomicDecorator(object):
    def __init__(self, *args, **kwargs):
        self.func = None

        self.xg = kwargs.get("xg")
        self.independent = kwargs.get("independent")
        self.parent_conn = None

        if len(args) == 1 and callable(args[0]):
            self.func = args[0]

    def _begin(self):
        options = CreateTransactionOptions(
            xg = True if self.xg else False,
            propagation = TransactionOptions.INDEPENDENT if self.independent else None
        )

        if IsInTransaction() and not self.independent:
            raise RuntimeError("Nested transactions are not supported")
        elif self.independent:
            # If we're running an independent transaction, pop the current one
            self.parent_conn = _PopConnection()

        # Push a new connection, start a new transaction
        conn = _GetConnection()
        _PushConnection(None)
        _SetConnection(conn.new_transaction(options))

        # Clear the context cache at the start of a transaction
        caching.clear_context_cache()

    def _finalize(self):
        _PopConnection()  # Pop the transaction connection
        if self.parent_conn:
            # If there was a parent transaction, now put that back
            _PushConnection(self.parent_conn)
            self.parent_conn = None

        # Clear the context cache at the end of a transaction
        caching.clear_context_cache()

    def __call__(self, *args, **kwargs):
        def call_func(*_args, **_kwargs):
            try:
                self._begin()
                result = self.func(*_args, **_kwargs)
                _GetConnection().commit()
                return result
            except:
                conn = _GetConnection()
                if conn:
                    conn.rollback()
                raise
            finally:
                self._finalize()

        if not self.func:
            assert args and callable(args[0])
            self.func = args[0]
            return call_func

        if self.func:
            return call_func(*args, **kwargs)

    def __enter__(self):
        self._begin()

    def __exit__(self, *args, **kwargs):
        if len(args) > 1 and isinstance(args[1], Exception):
            _GetConnection().rollback()  # If an exception happens, rollback
        else:
            _GetConnection().commit()  # Otherwise commit

        self._finalize()


atomic = AtomicDecorator
commit_on_success = AtomicDecorator  # Alias to the old Django name for this kinda thing
