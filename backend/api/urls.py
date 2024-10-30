from django.urls import path

from .views import (
    CategoryDetailsView,
    CategoryView,
    TransactionAmountByMonth,
    TransactionDetailsView,
    TransactionView,
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
        TransactionView.as_view(),
        name="transactions",
    ),
    path(
        "transactions/<int:pk>",
        TransactionDetailsView.as_view(),
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
        CategoryView.as_view(),
        name="categories",
    ),
    path(
        "categories/<int:pk>",
        CategoryDetailsView.as_view(),
        name="category-details",
    ),
]
