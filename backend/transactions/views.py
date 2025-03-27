from datetime import date, timedelta

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Transaction
from .serializers import (
    CategoryPublicSerializer,
    CategorySerializer,
    CategoryTotalSerializer,
    TransactionAmountByMonthSerializer,
    TransactionPublicSerializer,
    TransactionSerializer,
)


@api_view(["GET"])
def index(request: Request) -> Response:
    return Response({"message": "The app is running!"}, status=status.HTTP_200_OK)


class TransactionView(APIView):
    def get(self, request: Request) -> Response:

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        from_date = request.query_params.get("fromDate", None)
        to_date = request.query_params.get("toDate", None)

        all_transaction_qs = Transaction.objects.filter(user=request.user)

        if not from_date and not to_date:
            serializer = TransactionPublicSerializer(all_transaction_qs, many=True)
            return Response(
                {"transactions": serializer.data}, status=status.HTTP_200_OK
            )

        if from_date:
            filtered_qs = all_transaction_qs.filter(date__gt=from_date)

        if to_date:
            filtered_qs = all_transaction_qs.filter(date__lt=to_date)

        serializer = TransactionPublicSerializer(filtered_qs, many=True)
        return Response({"transactions": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request: Request) -> Response:

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = TransactionSerializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"transaction": serializer.data}, status=status.HTTP_201_CREATED
        )


class TransactionDetailsView(APIView):

    def put(self, request: Request, pk: int) -> Response:

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        transaction_instance = get_object_or_404(Transaction, pk=pk)

        serializer = TransactionSerializer(
            instance=transaction_instance,
            data=request.data,
            context={"user": request.user},
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response({"transaction": serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request: Request, pk: int) -> Response:

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        transaction_instance = get_object_or_404(Transaction, pk=pk)
        transaction_instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryView(APIView):
    def get(self, request: Request) -> Response:

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        is_top_categories = request.query_params.get("topCategories", None)

        if not is_top_categories:
            serializer = CategoryPublicSerializer(
                Category.objects.filter(user=request.user), many=True
            )

            return Response({"categories": serializer.data}, status=status.HTTP_200_OK)

        top_categories = Category.objects.raw(
            """
        SELECT C.ID, C.NAME, SUM(T.amount) as total_amount 
        FROM api_category as C 
        INNER JOIN api_transaction AS T 
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

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = CategorySerializer(
            data=request.data, context={"user": request.user}
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CategoryDetailsView(APIView):
    def delete(self, request: Request, pk: int) -> Response:

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        category_instance = get_object_or_404(Category, pk=pk)
        category_instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class TransactionAmountByMonth(APIView):

    def get(self, request: Request) -> Response:

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        SIX_MONTHS_IN_DAYS = 30 * 6
        today = date.today()
        six_months_before = today - timedelta(days=SIX_MONTHS_IN_DAYS)

        transactions_amount_by_month = Transaction.objects.raw(
            """
        SELECT T.id,SUBSTRING(T.date,1,7) as month ,SUM(T.amount) as total_amount 
        FROM api_transaction as T 
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
