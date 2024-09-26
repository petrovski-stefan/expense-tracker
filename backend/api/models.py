# type: ignore
from django.contrib.auth.models import User
from django.db import models


class Transaction(models.Model):
    date = models.DateField()
    amount = models.FloatField()
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    category = models.ForeignKey(
        to="Category", null=True, blank=False, on_delete=models.SET_NULL
    )
    note = models.CharField(max_length=50, blank=True)

    def __str__(self) -> str:
        return f"Transaction {self.amount} by {self.user} on {self.date}"


class Category(models.Model):
    name = models.CharField(max_length=25, unique=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"Category {self.name} by {self.user}"
