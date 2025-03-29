from django.urls import path

from .views import (
    CategoryCreateListView,
    CategoryDetailView,
    TransactionAmountByMonth,
    TransactionCreateListView,
    TransactionDetailView,
    index,
)

urlpatterns = [
    # App
    path(
        "index",
        index,
        name="index",
    ),
    # Transaction
    path(
        "transactions/",
        TransactionCreateListView.as_view(),
        name="transactions",
    ),
    path(
        "transactions/<int:pk>",
        TransactionDetailView.as_view(),
        name="transaction-details",
    ),
    path(
        "transactions/summary/",
        TransactionAmountByMonth.as_view(),
        name="transactions-summary",
    ),
    # Category
    path(
        "categories/",
        CategoryCreateListView.as_view(),
        name="categories",
    ),
    path(
        "categories/<int:pk>",
        CategoryDetailView.as_view(),
        name="category-details",
    ),
]
