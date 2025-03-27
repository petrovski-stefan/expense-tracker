from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["username", "password"]  # add first and last name?

    def validate_username(self, value) -> str:
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("The username is already taken!")

        return value

    def create(self, validated_data: dict) -> User:
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data: dict) -> dict:
        username = str(data["username"])
        password = str(data["password"])

        user_instace = authenticate(username=username, password=password)
        if user_instace is None:
            raise serializers.ValidationError("Wrong credentials. Try again.")

        data["user"] = user_instace

        return data
