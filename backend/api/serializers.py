from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, ValidationError

from .models import Category, Transaction


class CategoryPublicSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class TransactionPublicSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        exclude = ["user"]


class TransactionSerializer(ModelSerializer):
    category_id = serializers.IntegerField(write_only=True)
    category = CategoryPublicSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ["id", "category_id", "category", "amount", "note", "date"]

    def validate(self, data: dict) -> dict:

        category_id = data.get("category_id")

        if not Category.objects.filter(id=category_id).exists():
            raise ValidationError("Category does not exists.")

        if not self.context.get("user"):
            raise ValidationError("User in context not present.")

        return data

    def create(self, validated_data: dict) -> Transaction:

        category_id = validated_data.pop("category_id")
        category_instance = Category.objects.get(id=category_id)

        user_instance = self.context.get("user")

        return Transaction.objects.create(
            **validated_data, category=category_instance, user=user_instance
        )