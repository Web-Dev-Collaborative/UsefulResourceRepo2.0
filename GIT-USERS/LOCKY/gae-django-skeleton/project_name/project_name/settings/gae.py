#!/usr/bin/env python
import os

# Load production settings when running on GAE or SETTINGS_MODE is prod
# else, load local settings
if (
    os.getenv("SERVER_SOFTWARE", "").startswith("Google App Engine")
    or os.getenv("SETTINGS_MODE") == "prod"
):
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project_name.settings.production")
    from production import *

    ########## DATABASE CONFIGURATION
    # TODO: Enter your application id below. If you have signed up
    if os.getenv("SERVER_SOFTWARE", "").startswith("Google App Engine"):
        # Running on production App Engine, so use a Google Cloud SQL database.
        DATABASES = {
            "default": {
                "ENGINE": "django.db.backends.mysql",
                "HOST": "/cloudsql/your-application-id-here:cloud-sql-instance-name-here",
                "NAME": "database-name-here",
                "USER": "root",
            }
        }
    elif os.getenv("SETTINGS_MODE") == "prod":
        # Running in development, but want to access the Google Cloud SQL instance
        # in production.
        DATABASES = {
            "default": {
                "ENGINE": "google.appengine.ext.django.backends.rdbms",
                "INSTANCE": "your-application-id-here:cloud-sql-instance-name-here",
                "NAME": "database-name-here",
                "USER": "root",
            }
        }
    ########## END DATABASE CONFIGURATION

    ########## EMAIL CONFIGURATION
    EMAIL_BACKEND = "django_gae.mail.EmailBackend"
    ########## END EMAIL CONFIGURATION

    ########## HOST CONFIGURATION
    # TODO: Enter your application id below. If you have signed up
    # See: https://docs.djangoproject.com/en/1.5/releases/1.5/#allowed-hosts-required-in-production
    ALLOWED_HOSTS = ["your-application-id-here.appspot.com"]
    ########## END HOST CONFIGURATION
else:
    from local import *


########## STORAGE CONFIGURATION
# See: https://github.com/ckopanos/django-google-cloud-storage
DEFAULT_FILE_STORAGE = "django_gae.storage.googleCloud.GoogleCloudStorage"

# TODO: Enter your bucket name below. If you have signed up
GOOGLE_CLOUD_STORAGE_BUCKET = (
    "/name-of-your-bucket-here"
)  # the name of the bucket you have created from the google cloud storage console
GOOGLE_CLOUD_STORAGE_URL = (
    "http://storage.googleapis.com/bucket"
)  # whatever the url for accessing your cloud storgage bucket
GOOGLE_CLOUD_STORAGE_DEFAULT_CACHE_CONTROL = (
    "public, max-age: 7200"
)  # default cache control headers for your files
########## END STORAGE CONFIGURATION
