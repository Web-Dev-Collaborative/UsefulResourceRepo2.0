import os
import sys


def application_id():
    from google.appengine.api import app_identity

    try:
        result = app_identity.get_application_id()
    except AttributeError:
        result = None

    if not result:
        # Apparently we aren't running live, probably inside a management command
        from google.appengine.api import appinfo

        info = appinfo.LoadSingleAppInfo(
            open(os.path.join(find_project_root(), "app.yaml"))
        )

        result = "dev~" + info.application
        os.environ["APPLICATION_ID"] = result
        result = app_identity.get_application_id()

    return result


def appengine_on_path():
    try:
        from google.appengine.api import apiproxy_stub_map

        apiproxy_stub_map  # Silence pylint
        return True
    except ImportError:
        return False


def on_production():
    return "SERVER_SOFTWARE" in os.environ and not os.environ[
        "SERVER_SOFTWARE"
    ].startswith("Development")


def datastore_available():
    from google.appengine.api import apiproxy_stub_map

    return bool(apiproxy_stub_map.apiproxy.GetStub("datastore_v3"))


def in_testing():
    return "test" in sys.argv


import collections
import functools


class memoized(object):
    def __init__(self, func):
        self.func = func
        self.cache = {}

    def __call__(self, *args):
        if not isinstance(args, collections.Hashable):
            # uncacheable. a list, for instance.
            # better to not cache than blow up.
            return self.func(*args)

        if args in self.cache:
            return self.cache[args]
        else:
            value = self.func(*args)
            self.cache[args] = value
            return value

    def __repr__(self):
        """Return the function's docstring."""
        return self.func.__doc__

    def __get__(self, obj, objtype):
        """Support instance methods."""
        return functools.partial(self.__call__, obj)


@memoized
def find_project_root():
    """Traverse the filesystem upwards and return the directory containing app.yaml"""
    path = os.path.dirname(os.path.abspath(__file__))

    while True:
        if os.path.exists(os.path.join(path, "app.yaml")):
            return path
        else:
            parent = os.path.dirname(path)
            if parent == path:  # Filesystem root
                break
            else:
                path = parent

    raise RuntimeError("Unable to locate app.yaml. Did you add it to skip_files?")
