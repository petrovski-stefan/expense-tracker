from datetime import date, timedelta

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

        is_top_categories = request.query_params.get("topCategories", None)

        if not is_top_categories:
            serializer = CategoryOutputSerializer(
                Category.objects.filter(user=request.user), many=True  # type: ignore
            )

            return Response({"categories": serializer.data}, status=status.HTTP_200_OK)

        top_categories = Category.objects.raw(
            """
        SELECT C.ID, C.NAME, SUM(T.amount) as total_amount 
        FROM transactions_category as C 
        INNER JOIN transactions_transaction AS T 
        ON C.id = T.category_id 
        WHERE T.user_id = %s  
        GROUP BY C.id, C.name  
        ORDER BY total_amount DESC 
        """,
            [request.user.id],  # type: ignore
        )

        top_categories_serializer = CategoryTotalSerializer(top_categories, many=True)

        return Response(
            {"categories": top_categories_serializer.data}, status=status.HTTP_200_OK
        )

    def post(self, request: Request) -> Response:

        serializer = CategorySerializer(
            data=request.data, context={"user": request.user}
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


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

    def get(self, request: Request) -> Response:

        SIX_MONTHS_IN_DAYS = 30 * 6
        today = date.today()
        six_months_before = today - timedelta(days=SIX_MONTHS_IN_DAYS)

        transactions_amount_by_month = Transaction.objects.raw(
            """
        SELECT T.id,SUBSTRING(T.date,1,7) as month ,SUM(T.amount) as total_amount 
        FROM transactions_transaction as T 
        WHERE T.user_id = %s  AND T.date >= %s
        GROUP BY SUBSTRING(T.date,1,7)
        """,
            [request.user.id, six_months_before],  # type: ignore
        )

        serializer = TransactionAmountByMonthSerializer(
            transactions_amount_by_month, many=True
        )
        return Response(
            {"transactionsAmountByMonth": serializer.data}, status=status.HTTP_200_OK
        )
