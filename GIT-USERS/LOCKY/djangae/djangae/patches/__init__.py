from django.conf import settings


def patch():
    if 'django.contrib.contenttypes' in settings.INSTALLED_APPS:
        from . import contenttypes
        contenttypes.patch()
