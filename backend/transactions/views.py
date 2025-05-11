from datetime import date, timedelta

from django.db.models import Sum
from django.db.models.functions import TruncMonth
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Transaction
from .serializers import (
    CategoryOutputSerializer,
    CategorySerializer,
    CategoryTotalSerializer,
    TransactionAmountByMonthSerializer,
    TransactionInputSerializer,
    TransactionOutputSerializer,
)


@api_view(["GET"])
def index(request: Request) -> Response:
    return Response({"message": "The app is running!"}, status=status.HTTP_200_OK)


class TransactionCreateListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:

        from_date = request.query_params.get("fromDate", None)
        to_date = request.query_params.get("toDate", None)

        all_filter_conditions = {"date__gte": from_date, "date__lte": to_date}
        present_filter_conditions = {
            key: value for key, value in all_filter_conditions.items() if value
        }

        transactions_qs = request.user.transactions.filter(**present_filter_conditions)  # type: ignore
        serializer = TransactionOutputSerializer(transactions_qs, many=True)

        return Response({"transactions": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request: Request) -> Response:

        serializer = TransactionInputSerializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"transaction": serializer.data}, status=status.HTTP_201_CREATED
        )


class TransactionDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request: Request, pk: int) -> Response:

        transaction_instance = get_object_or_404(Transaction, pk=pk)

        serializer = TransactionInputSerializer(
            instance=transaction_instance,
            data=request.data,
            context={"user": request.user},
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response({"transaction": serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request: Request, pk: int) -> Response:

        transaction_instance = get_object_or_404(Transaction, pk=pk)
        transaction_instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryCreateListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:

        categories_qs = request.user.categories.all()  # type: ignore

        serializer = CategoryOutputSerializer(categories_qs, many=True)  # type: ignore

        return Response({"categories": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request: Request) -> Response:

        serializer = CategorySerializer(
            data=request.data, context={"user": request.user}
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CategorySummaryListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:

        limit = request.GET.get("limit")

        try:
            limit = int(limit)  # type: ignore
        except (TypeError, ValueError):
            limit = None

        top_categories = (
            request.user.categories.annotate(total_amount=Sum("transactions__amount"))  # type: ignore
            .values("id", "name", "total_amount")
            .filter(total_amount__gt=0)
            .order_by("-total_amount")
        )
        if limit:
            serializer = CategoryTotalSerializer(top_categories[:limit], many=True)  # type: ignore
        else:
            serializer = CategoryTotalSerializer(top_categories, many=True)  # type: ignore

        return Response({"categories": serializer.data}, status=status.HTTP_200_OK)


class CategoryDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request: Request, pk: int) -> Response:

        category_instance = get_object_or_404(Category, pk=pk)
        category_instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class TransactionAmountByMonth(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    SIX_MONTHS_IN_DAYS = 30 * 6

    def get(self, request: Request) -> Response:

        today = date.today()
        six_months_before = today - timedelta(days=self.SIX_MONTHS_IN_DAYS)

        transactions_amount_by_month = (
            request.user.transactions.filter(date__gt=six_months_before)  # type: ignore
            .annotate(month=TruncMonth("date"))
            .values("month")
            .annotate(total_amount=Sum("amount"))
            .order_by("month")
        )

        serializer = TransactionAmountByMonthSerializer(
            transactions_amount_by_month, many=True
        )
        return Response(
            {"transactionsAmountByMonth": serializer.data}, status=status.HTTP_200_OK
        )
