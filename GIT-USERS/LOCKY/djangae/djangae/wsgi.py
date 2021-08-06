import warnings

from google.appengine.runtime import request_environment

from djangae.utils import on_production


class DjangaeApplication(object):

    def fix_subprocess_module(self):
        """
            Making the subprocess module work on the dev_appserver is hard work
            so I've isolated it all here
        """

        if on_production():
            return

        # TODO: Remove support for the subprocess module.
        warnings.warn(
            (
                "Subprocess support on dev_appserver will be removed soon. "
                "Mediagenerator/assetpipe users should find "
                "alternatives which run in a separate process."
            ),
            DeprecationWarning
        )

        import sys
        from google.appengine import dist27
        from google.appengine.tools.devappserver2.python import sandbox

        if 'fcntl' not in sandbox._WHITE_LIST_C_MODULES:
            sandbox._WHITE_LIST_C_MODULES.extend([
                'fcntl'
            ])

        if "subprocess" in dist27.MODULE_OVERRIDES:
            dist27.MODULE_OVERRIDES.remove("subprocess")

            if "subprocess" in sys.modules:
                del sys.modules["subprocess"]

            for finder in sys.meta_path:
                if isinstance(finder, sandbox.ModuleOverrideImportHook):
                    del finder.policies['os']

            if "os" in sys.modules:
                del sys.modules["os"]
                request_environment.PatchOsEnviron(__import__("os"))

        if "select" in dist27.MODULE_OVERRIDES:
            dist27.MODULE_OVERRIDES.remove("select")
            if "select" not in sandbox._WHITE_LIST_C_MODULES:
                sandbox._WHITE_LIST_C_MODULES.extend(["select"])

            if "select" in sys.modules:
                del sys.modules["select"]

    def fix_sandbox(self):
        """
            This is the nastiest thing in the world...

            This WSGI middleware is the first chance we get to hook into anything. On the dev_appserver
            at this point the Python sandbox will have already been initialized. The sandbox replaces stuff
            like the subprocess module, and the select module. As well as disallows _sqlite3. These things
            are really REALLY useful for development.

            So here we dismantle parts of the sandbox. Firstly we add _sqlite3 to the allowed C modules.

            Next, we manipulate the sandbox to allow the default python subprocess and select modules to function.

            This only happens on the dev_appserver, it would only die on live. Everything is checked so that
            changes are only made if they haven't been made already.
        """

        if on_production():
            return

        from google.appengine.tools.devappserver2.python import sandbox

        if '_sqlite3' not in sandbox._WHITE_LIST_C_MODULES:
            sandbox._WHITE_LIST_C_MODULES.extend([
                '_sqlite3'
            ])

        #Fix up the subprocess module
        self.fix_subprocess_module()

    def __init__(self, application):
        from django.conf import settings
        from django.core.exceptions import ImproperlyConfigured

        for app in settings.INSTALLED_APPS[::-1]:
            if app.startswith("django."):
                raise ImproperlyConfigured("You must place 'djangae' after 'django' apps in installed apps")
            elif app == "djangae":
                break

        self.wrapped_app = application

    def __call__(self, environ, start_response):
        self.fix_sandbox()
        return self.wrapped_app(environ, start_response)
