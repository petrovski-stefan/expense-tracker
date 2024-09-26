from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Transaction
from .serializers import (
    CategoryPublicSerializer,
    TransactionPublicSerializer,
    TransactionSerializer,
)


@api_view(["GET"])
def index(request: Request) -> Response:
    return Response({"message": "The app is running!"}, status=status.HTTP_200_OK)


class TransactionsListView(APIView):
    def get(self, request: Request) -> Response:

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = TransactionPublicSerializer(
            Transaction.objects.filter(user=request.user), many=True
        )
        return Response({"transactions": serializer.data}, status=status.HTTP_200_OK)


class TransactionView(APIView):
    def post(self, request: Request) -> Response:

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = TransactionSerializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.data)
        return Response(
            {"transaction": serializer.data}, status=status.HTTP_201_CREATED
        )


class CategoryView(APIView):
    def get(self, request: Request) -> Response:

        if request.auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = CategoryPublicSerializer(
            Category.objects.filter(user=request.user), many=True
        )

        return Response({"categories": serializer.data}, status=status.HTTP_200_OK)
