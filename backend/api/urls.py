from django.urls import path

from .views import (
    CategoryDetailsView,
    CategoryView,
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
        "transaction",
        TransactionView.as_view(),
        name="transaction",
    ),
    path(
        "transaction/<int:pk>",
        TransactionDetailsView.as_view(),
        name="transaction-details",
    ),
    # Category
    path(
        "category",
        CategoryView.as_view(),
        name="category",
    ),
    path(
        "category/<int:pk>",
        CategoryDetailsView.as_view(),
        name="category-details",
    ),
]
