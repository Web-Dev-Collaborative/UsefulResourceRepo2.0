DEFAULT_FILE_STORAGE = "djangae.storage.BlobstoreStorage"
FILE_UPLOAD_MAX_MEMORY_SIZE = 1024 * 1024
FILE_UPLOAD_HANDLERS = (
    "djangae.storage.BlobstoreFileUploadHandler",
    "django.core.files.uploadhandler.MemoryFileUploadHandler",
)

DATABASES = {"default": {"ENGINE": "djangae.db.backends.appengine"}}

GENERATE_SPECIAL_INDEXES_DURING_TESTING = False

CACHES = {"default": {"BACKEND": "django.core.cache.backends.memcached.MemcachedCache"}}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {"require_debug_false": {"()": "django.utils.log.RequireDebugFalse"}},
    "handlers": {
        "mail_admins": {
            "level": "ERROR",
            "filters": ["require_debug_false"],
            "class": "django.utils.log.AdminEmailHandler",
        }
    },
    "loggers": {
        "django.request": {
            "handlers": ["mail_admins"],
            "level": "ERROR",
            "propagate": True,
        }
    },
}

EMAIL_BACKEND = "djangae.mail.AsyncEmailBackend"

# Setting to *.appspot.com is OK, because GAE takes care of domain routing
# it needs to be like this because of the syntax of addressing non-default versions
# (e.g. -dot-)
ALLOWED_HOSTS = (".appspot.com",)
