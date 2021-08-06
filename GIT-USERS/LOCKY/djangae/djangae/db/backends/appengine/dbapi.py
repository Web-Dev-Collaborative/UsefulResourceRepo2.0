""" Fake DB API 2.0 for App engine """

class DatabaseError(StandardError):
    pass

class IntegrityError(DatabaseError):
    pass

class NotSupportedError(DatabaseError):
    pass

class CouldBeSupportedError(DatabaseError):
    pass


Error = DatabaseError
Warning = DatabaseError
DataError = DatabaseError
OperationalError = DatabaseError
InternalError = DatabaseError
ProgrammingError = DatabaseError
InterfaceError = DatabaseError
