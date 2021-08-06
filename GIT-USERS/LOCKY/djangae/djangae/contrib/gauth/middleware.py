from django.contrib.auth import (
    authenticate,
    login,
    logout,
    get_user,
    BACKEND_SESSION_KEY,
)
from django.contrib.auth.middleware import AuthenticationMiddleware as DjangoMiddleware
from django.contrib.auth.models import BaseUserManager
from google.appengine.api import users


class AuthenticationMiddleware(DjangoMiddleware):
    def process_request(self, request):

        django_user = get_user(request)
        google_user = users.get_current_user()

        if django_user.is_anonymous() and google_user:
            # If there is a google user, but we are anonymous, log in!
            django_user = authenticate(google_user=google_user)
            if django_user:
                login(request, django_user)
        elif not django_user.is_anonymous() and not google_user:
            # If we are logged in with django, but not longer logged in with Google
            # then log out
            logout(request)

        request.user = django_user

        backend_str = request.session.get(BACKEND_SESSION_KEY)

        # Now make sure we update is_superuser and is_staff appropriately
        if backend_str == "djangae.contrib.gauth.backends.AppEngineUserAPI":
            is_superuser = users.is_current_user_admin()
            google_email = BaseUserManager.normalize_email(
                users.get_current_user().email()
            )
            resave = False

            if is_superuser != django_user.is_superuser:
                django_user.is_superuser = django_user.is_staff = is_superuser
                resave = True

            # for users which already exist, we want to verify that their email is still correct
            if django_user.email != google_email:
                django_user.email = google_email
                resave = True

            if resave:
                django_user.save()
