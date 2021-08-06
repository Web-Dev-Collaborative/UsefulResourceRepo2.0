from django.db import models

from djangae import patches


class CounterShard(models.Model):
    count = models.PositiveIntegerField()

# Apply our django patches
patches.patch()
