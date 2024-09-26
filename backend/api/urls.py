from django.urls import path

from .views import CategoryView, TransactionsListView, TransactionView, index

urlpatterns = [
    path("index", index, name="index"),
    path("transactions-list", TransactionsListView.as_view(), name="transactions-list"),
    path("transaction", TransactionView.as_view(), name="transaction"),
    path("category-list", CategoryView.as_view(), name="category-list"),
]
