# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from google.appengine.api import images
from google.appengine.ext import blobstore

from django.conf import settings
from django.core.cache import cache

CACHE_GAE_IMAGE_FIELD = getattr(settings, "CACHE_GAE_IMAGE_FIELD", True)
CACHE_GAE_IMAGE_FIELD_PREFIX = getattr(settings, "CACHE_GAE_IMAGE_FIELD_PREFIX", "gae_image_url_")


def _gae_image_url(picture_str):
    """
    Returns dynamic image resizing url using GAE Images API
    """
    blob_key = blobstore.create_gs_key('/gs%s/%s' % (settings.GOOGLE_CLOUD_STORAGE_BUCKET, picture_str))
    return images.get_serving_url(blob_key)


def gae_image_url(image=None):
    """
    Returns dynamic image resizing url using GAE Images API
    Cache url if asked to in the settings.
    """
    url = ''

    if image:
        picture_str = str(image)

        if not CACHE_GAE_IMAGE_FIELD:
            return _gae_image_url(picture_str)

        key = CACHE_GAE_IMAGE_FIELD_PREFIX + picture_str
        url = cache.get(key)

        if url:
            return url

        url =  _gae_image_url(picture_str)
        cache.set(key, url, 86400)
    return url