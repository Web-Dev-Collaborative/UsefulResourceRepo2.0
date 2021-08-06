import logging
import threading

from django.core.signals import request_finished, request_started
from django.dispatch import receiver

from djangae.db.unique_utils import unique_identifiers_from_entity
from django.core.cache import cache

logger = logging.getLogger("djangae")

context = threading.local()
context.cache = {}
context.reverse_cache = {}


def add_entity_to_context_cache(model, entity):
    identifiers = unique_identifiers_from_entity(model, entity)

    for identifier in identifiers:
        context.cache[identifier] = entity

    context.reverse_cache[entity.key()] = identifiers


def remove_entity_from_context_cache(entity):
    key = entity.key()
    remove_entity_from_context_cache_by_key(key)


def remove_entity_from_context_cache_by_key(key):
    for identifier in context.reverse_cache.get(key, []):
        if identifier in context.cache:
            del context.cache[identifier]


def cache_entity(model, entity):
    identifiers = unique_identifiers_from_entity(model, entity)
    logger.debug("Caching entity with key %s and identifiers %s", entity.key(), identifiers)
    cache.set_many({x: entity for x in identifiers})


def uncache_entity(model, entity):
    identifiers = unique_identifiers_from_entity(model, entity)
    logger.debug("Uncaching entity with key %s and identifiers %s", entity.key(), identifiers)
    for identifier in identifiers:
        cache.delete(identifier)


def get_from_cache_by_key(key):
    if key not in context.reverse_cache:
        return None

    identifier = context.reverse_cache[key][0]  # Pick any identifier
    return get_from_cache(identifier)


def get_from_cache(unique_identifier):
    if getattr(context, "cache_disabled", False):
        return None

    return context.cache.get(unique_identifier)


@receiver(request_finished)
@receiver(request_started)
def clear_context_cache(*args, **kwargs):
    context.cache = {}
    context.reverse_cache = {}

    # Make sure we always re-enable the caching when the request starts
    try:
        delattr(context, "cache_disabled")
    except AttributeError:
        pass


def clear_all_caches():
    clear_context_cache()


class DisableContextCache(object):
    """
        A context manager that forcibly disables getting objects from the context cache
    """
    def __enter__(self):
        global context
        context.cache_disabled = True

    def __exit__(self, *args, **kwargs):
        global context
        if hasattr(context, "cache_disabled"):
            delattr(context, "cache_disabled")

disable_context_cache = DisableContextCache
