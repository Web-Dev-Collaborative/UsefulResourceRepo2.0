import random

from djangae.forms.fields import TrueOrNullFormField
from djangae.models import CounterShard
from django.utils.translation import ugettext_lazy as _
from djangae.db import transaction

from .iterable import *
from .related import *
from .computed import *
from .json import *

class TrueOrNullField(models.NullBooleanField):
    """A Field only storing `Null` or `True` values.

    Why? This allows unique_together constraints on fields of this type
    ensuring that only a single instance has the `True` value.

    It mimics the NullBooleanField field in it's behaviour, while it will
    raise an exception when explicitly validated, assigning something
    unexpected (like a string) and saving, will silently convert that
    value to either True or None.
    """
    __metaclass__ = models.SubfieldBase

    default_error_messages = {
        'invalid': _("'%s' value must be either True or None."),
    }
    description = _("Boolean (Either True or None)")

    def to_python(self, value):
        if value in (None, 'None', False):
            return None
        if value in (True, 't', 'True', '1'):
            return True
        msg = self.error_messages['invalid'] % str(value)
        raise ValidationError(msg)

    def get_prep_value(self, value):
        """Only ever save None's or True's in the db. """
        if value in (None, False, '', 0):
            return None
        return True

    def formfield(self, **kwargs):
        defaults = {
            'form_class': TrueOrNullFormField
        }
        defaults.update(kwargs)
        return super(TrueOrNullField, self).formfield(**defaults)


class ShardedCounter(list):
    def increment(self):
        idx = random.randint(0, len(self) - 1)

        with transaction.atomic():
            shard = CounterShard.objects.get(pk=self[idx])
            shard.count += 1
            shard.save()

    def decrement(self):
        # Find a non-empty shard and decrement it
        shards = self[:]
        random.shuffle(shards)
        for shard_id in shards:
            with transaction.atomic():
                shard = CounterShard.objects.get(pk=shard_id)
                if not shard.count:
                    continue
                else:
                    shard.count -= 1
                    shard.save()
                    break

    def value(self):
        shards = CounterShard.objects.filter(pk__in=self).values_list('count', flat=True)
        return sum(shards)


class ShardedCounterField(ListField):
    __metaclass__ = models.SubfieldBase

    def __init__(self, shard_count=30, *args, **kwargs):
        self.shard_count = shard_count
        super(ShardedCounterField, self).__init__(models.PositiveIntegerField, *args, **kwargs)

    def pre_save(self, model_instance, add):
        value = super(ShardedCounterField, self).pre_save(model_instance, add)
        current_length = len(value)

        for i in xrange(current_length, self.shard_count):
            value.append(CounterShard.objects.create(count=0).pk)

        ret = ShardedCounter(value)
        setattr(model_instance, self.attname, ret)
        return ret

    def to_python(self, value):
        value = super(ShardedCounterField, self).to_python(value)
        return ShardedCounter(value)

    def get_prep_value(self, value):
        return value
