import unittest
from unittest import TextTestResult

from django.conf import settings
from django.test.simple import DjangoTestSuiteRunner

from djangae.db.backends.appengine.dbapi import NotSupportedError, CouldBeSupportedError
from djangae.utils import find_project_root

from google.appengine.ext import testbed
from google.appengine.datastore import datastore_stub_util


def init_testbed():
    # We allow users to disable scattered IDs in tests. This primarily for running Django tests that
    # assume implicit ordering (yeah, annoying)
    use_scattered = not getattr(settings, "DJANGAE_SEQUENTIAL_IDS_IN_TESTS", False)

    stub_kwargs = {
        "init_datastore_v3_stub": {
            "use_sqlite": True,
            "auto_id_policy": testbed.AUTO_ID_POLICY_SCATTERED
            if use_scattered
            else testbed.AUTO_ID_POLICY_SEQUENTIAL,
            "consistency_policy": datastore_stub_util.PseudoRandomHRConsistencyPolicy(
                probability=1
            ),
        },
        "init_taskqueue_stub": {"root_path": find_project_root()},
    }
    bed = testbed.Testbed()
    bed.activate()
    for init_name in testbed.INIT_STUB_METHOD_NAMES.values():
        getattr(bed, init_name)(**stub_kwargs.get(init_name, {}))

    return bed


def testbed_wrap(test):
    def _wrapped(*args, **kwargs):

        try:
            # Init test stubs
            bed = init_testbed()

            return test(*args, **kwargs)
        finally:
            bed.deactivate()

    return _wrapped


class SkipUnsupportedTestResult(TextTestResult):
    def addError(self, test, err):
        if err[0] in (NotSupportedError, CouldBeSupportedError):
            self.addExpectedFailure(test, err)
        else:
            super(SkipUnsupportedTestResult, self).addError(test, err)


class DjangaeTestSuiteRunner(DjangoTestSuiteRunner):
    def build_suite(self, *args, **kwargs):
        suite = super(DjangaeTestSuiteRunner, self).build_suite(*args, **kwargs)

        for i, test in enumerate(suite._tests):
            suite._tests[i] = testbed_wrap(test)

        return suite


class SkipUnsupportedRunner(DjangaeTestSuiteRunner):
    def run_suite(self, suite, **kwargs):
        return unittest.TextTestRunner(
            verbosity=self.verbosity,
            failfast=self.failfast,
            resultclass=SkipUnsupportedTestResult,
        ).run(suite)
