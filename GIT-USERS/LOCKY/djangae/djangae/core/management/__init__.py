import os
import sys
import argparse

import djangae.sandbox as sandbox
from djangae.utils import find_project_root

# Set some Django-y defaults
DJANGO_DEFAULTS = {
    "storage_path": os.path.join(find_project_root(), ".storage"),
    "port": 8000,
    "admin_port": 8001,
    "api_port": 8002,
    "automatic_restart": "True",
    "allow_skipped_files": "True",
}


def _execute_from_command_line(sandbox_name, argv, **sandbox_overrides):
    with sandbox.activate(sandbox_name, add_sdk_to_path=True, **sandbox_overrides):
        import django.core.management as django_management  # Now on the path
        return django_management.execute_from_command_line(argv)


def execute_from_command_line(argv=None, **sandbox_overrides):
    """Wraps Django's `execute_from_command_line` to initialize a djangae
    sandbox before running a management command.

    Note: The '--sandbox' arg must come first. All other args are forwarded to
          Django as normal.
    """
    argv = argv or sys.argv
    parser = argparse.ArgumentParser(prog='manage.py')
    parser.add_argument(
        '--sandbox', default=sandbox.LOCAL, choices=sandbox.SANDBOXES.keys())
    parser.add_argument('args', nargs=argparse.REMAINDER)
    namespace = parser.parse_args(argv[1:])

    overrides = DJANGO_DEFAULTS
    overrides.update(sandbox_overrides)

    return _execute_from_command_line(namespace.sandbox, ['manage.py'] + namespace.args, **overrides)


def remote_execute_from_command_line(argv=None, **sandbox_overrides):
    """Execute commands in the remote sandbox"""
    return _execute_from_command_line(sandbox.REMOTE, argv or sys.argv, **sandbox_overrides)


def local_execute_from_command_line(argv=None, **sandbox_overrides):
    """Execute commands in the local sandbox"""
    return _execute_from_command_line(sandbox.LOCAL, argv or sys.argv, **sandbox_overrides)


def test_execute_from_command_line(argv=None, **sandbox_overrides):
    """Execute commands in the test sandbox"""
    return _execute_from_command_line(sandbox.TEST, argv or sys.argv, **sandbox_overrides)
