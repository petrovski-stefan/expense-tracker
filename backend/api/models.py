# type: ignore
from django.db import models


class Transaction(models.Model):
    date = models.DateTimeField()
    amount = models.FloatField()
    # user ...
    category = models.ForeignKey(
        to="Category", null=True, blank=False, on_delete=models.SET_NULL
    )
    note = models.CharField(max_length=200, blank=True)


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
