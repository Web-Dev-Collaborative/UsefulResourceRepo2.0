from django.contrib import admin
from django.contrib.auth import get_user_model

# DJANGAE
from djangae.contrib.gauth.models import (
    GaeUser,
    GaeDatastoreUser,
    Group,
    PermissionsMixin,
)

user_model = get_user_model()

# Only register the user model with the admin if it is a Djangae model.  If a different/custom user
# model is in use, then allow that app to deal with the Django admin.

if user_model in (GaeUser, GaeDatastoreUser):
    # Note that we don't need Django's usual custom Admin class with the password change form because
    # users created through the App Engine users API do not have passwords stored in our DB.
    admin.site.register(user_model)


# Only register the Group model if the User model is one of the Datastore-based ones (i.e. one
# which uses the Datastore permissions)

if issubclass(user_model, PermissionsMixin):
    admin.site.register(Group)
