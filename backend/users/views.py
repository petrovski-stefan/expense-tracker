from api.utils.initial_categories import create_initial_categories
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from .serializers import LoginSerializer, RegistrationSerializer


@api_view(["POST"])
def login(request: Request) -> Response:
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user_instance = serializer.validated_data["user"]
    # TODO: create a new token each time user logs in?
    token_instance, _created = Token.objects.get_or_create(user=user_instance)
    return Response(
        {
            "message": "Succesfully logged in.",
            "username": serializer.validated_data["username"],
            "token": token_instance.key,
        },
        status=status.HTTP_200_OK,
    )


def logout(request: Request) -> Response:
    return Response({"user": "user1"}, status=status.HTTP_200_OK)


@api_view(["POST"])
def register(request: Request) -> Response:
    serializer = RegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user_instance = serializer.save()
    token_instance = Token.objects.create(user=user_instance)

    create_initial_categories(user_instance)

    return Response(
        {
            "message": "Account succesfully created.",
            "username": serializer.data["username"],
            "token": token_instance.key,
        },
        status=status.HTTP_201_CREATED,
    )
