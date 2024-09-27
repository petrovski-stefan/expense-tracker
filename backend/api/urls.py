from django.urls import path

from .views import (
    CategoryDetailsView,
    CategoryView,
    TransactionsListView,
    TransactionView,
    index,
)

urlpatterns = [
    path("index", index, name="index"),
    # Transaction
    path("transactions-list", TransactionsListView.as_view(), name="transactions-list"),
    path("transaction", TransactionView.as_view(), name="transaction-details"),
    # Category
    path("category-list", CategoryView.as_view(), name="category-list"),
    path("category/<int:pk>", CategoryDetailsView.as_view(), name="category-details"),
]
