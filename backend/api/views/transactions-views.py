from datetime import date, timedelta

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Transaction
from ..serializers import (
    TransactionAmountByMonthSerializer,
    TransactionPublicSerializer,
    TransactionSerializer,
)


class TransactionListCreateView(APIView):
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


class TransactionDetailView(APIView):

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


class TransactionMonthlySummaryView(APIView):

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
