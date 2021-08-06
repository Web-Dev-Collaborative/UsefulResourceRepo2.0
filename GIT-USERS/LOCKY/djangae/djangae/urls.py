from django.conf.urls import patterns, url

from djangae.views import warmup, deferred

urlpatterns = patterns('djangae.views',
    url(r'^warmup$', warmup),
    url(r'^queue/deferred/?$', deferred)
)
