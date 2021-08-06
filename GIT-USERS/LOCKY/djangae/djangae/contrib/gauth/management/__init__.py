from django.db.models import signals

from django.db.models import UnavailableApp

# Disconnect the django.contrib.auth signal
from django.contrib.auth.management import create_permissions
signals.post_syncdb.disconnect(dispatch_uid="django.contrib.auth.management.create_permissions")

def create_permissions_wrapper(*args, **kwargs):
    from django.contrib.auth import get_user_model
    from djangae.contrib.gauth.models import PermissionsMixin

    try:
        if not issubclass(get_user_model(), PermissionsMixin):
            create_permissions(*args, **kwargs)
    except UnavailableApp:
        # If the user model doesn't exist, do nothing (this is what Django's create_permissions does)
        return

signals.post_syncdb.connect(create_permissions_wrapper, dispatch_uid="django.contrib.auth.management.create_permissions2")
