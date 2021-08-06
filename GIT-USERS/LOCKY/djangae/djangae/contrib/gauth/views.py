from google.appengine.api import users
from django.http import HttpResponseRedirect


def login_redirect(request):
    return HttpResponseRedirect(users.create_login_url(dest_url=request.GET.get('next')))
