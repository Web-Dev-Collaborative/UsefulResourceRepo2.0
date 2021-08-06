
AUTHENTICATION_BACKENDS = (
    'djangae.contrib.gauth.backends.AppEngineUserAPI',
)

AUTH_USER_MODEL = 'djangae.GaeDatastoreUser'
LOGIN_URL = 'djangae_login_redirect'

# This allows you to create User objects for Google-Accounts-based users before they have logged in.
# When pre-creating a Google user, you must set the `username` to None.  Matching is done by email.
ALLOW_USER_PRE_CREATION = False
