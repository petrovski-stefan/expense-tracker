from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

TRANSACTION_TYPES = [
    ("income", "Income"),
    ("expense", "Expense"),
]

TRANSACTION_CATEGORY_TYPES = TRANSACTION_TYPES


class Transaction(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    category = models.ForeignKey(
        to="Category",
        related_name="transactions",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
    )

    date = models.DateField()  # TODO: Change to DateTimeField
    amount = models.FloatField()
    note = models.TextField(blank=True)
    type = models.CharField(choices=TRANSACTION_TYPES, max_length=10)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.type} - {self.amount} - {self.user} - {self.date}"


class Category(models.Model):
    name = models.CharField(max_length=25)
    type = models.CharField(choices=TRANSACTION_CATEGORY_TYPES, max_length=10)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)

    class Meta:
        unique_together = (
            "name",
            "user",
        )

    def __str__(self) -> str:
        return f"Category {self.name} - {self.type} -{self.user}"
