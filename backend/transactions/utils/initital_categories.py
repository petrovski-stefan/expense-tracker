from django.contrib.auth.models import User

from ..models import Category

INITIAL_CATEGORIES = [
    "Groceries",
    "Healthcare",
    "Food",
    "Clothing",
    "Car",
    "Gym",
    "Rent",
]


def create_initial_categories(for_user: User) -> None:
    for category_name in INITIAL_CATEGORIES:
        Category.objects.create(name=category_name, user=for_user)
