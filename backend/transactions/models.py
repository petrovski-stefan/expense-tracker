from django.contrib.auth.models import User
from django.db.models import (
    CASCADE,
    SET_NULL,
    CharField,
    DateField,
    FloatField,
    ForeignKey,
    Model,
)


class Transaction(Model):
    date: DateField = DateField()
    amount: FloatField = FloatField()
    user: ForeignKey[User] = ForeignKey(to=User, on_delete=CASCADE)
    category: ForeignKey["Category"] = ForeignKey(
        to="Category",
        related_name="transactions",
        null=True,
        blank=False,
        on_delete=SET_NULL,
    )
    note: CharField = CharField(max_length=50, blank=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self) -> str:
        return f"Transaction {self.amount} by {self.user} on {self.date}"


class Category(Model):
    name: CharField = CharField(max_length=25)
    user: ForeignKey[User] = ForeignKey(to=User, on_delete=CASCADE)

    class Meta:
        unique_together = (
            "name",
            "user",
        )

    def __str__(self) -> str:
        return f"Category {self.name} by {self.user}"
