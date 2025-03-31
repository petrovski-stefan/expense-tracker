from datetime import date

from rest_framework import serializers

from .models import Category, Transaction


class CategoryOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class CategoryTotalSerializer(serializers.ModelSerializer):
    total_amount = serializers.FloatField(read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "total_amount"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]

    def validate(self, data: dict) -> dict:

        category_name = data.get("name")
        user_instance = self.context.get("user")

        if not user_instance:
            raise serializers.ValidationError("User in context not present.")

        if (
            Category.objects.filter(user=user_instance)
            .filter(name=category_name)
            .exists()
        ):
            raise serializers.ValidationError("Category already exists.")

        return data

    def create(self, validated_data: dict) -> Category:
        user_instance = self.context.get("user")

        return Category.objects.create(**validated_data, user=user_instance)  # type: ignore


class TransactionOutputSerializer(serializers.ModelSerializer):
    category = CategoryOutputSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ["id", "category", "amount", "note", "date", "type"]


class TransactionInputSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(write_only=True)
    category = CategoryOutputSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ["id", "category_id", "category", "amount", "note", "date", "type"]

    def validate(self, data: dict) -> dict:

        category_id = data.get("category_id")

        if category_id != -1 and not Category.objects.filter(id=category_id).exists():  # type: ignore
            raise serializers.ValidationError("Category does not exists.")

        if not self.context.get("user"):
            raise serializers.ValidationError("User in context not present.")

        return data

    def create(self, validated_data: dict) -> Transaction:

        category_id = validated_data.pop("category_id")
        category_instance = Category.objects.get(id=category_id)

        user_instance = self.context.get("user")

        return Transaction.objects.create(
            **validated_data, category=category_instance, user=user_instance  # type: ignore
        )

    def update(self, instance: Transaction, validated_data: dict) -> Transaction:

        instance.date = validated_data.get("date", instance.date)
        instance.amount = validated_data.get("amount", instance.amount)
        instance.note = validated_data.get("note", instance.note)
        instance.type = validated_data.get("type", instance.type)

        category_id = validated_data.get("category_id")
        if category_id == -1:
            instance.category = None
        else:
            category_instance = Category.objects.get(pk=category_id)  # type: ignore
            instance.category = category_instance

        instance.save()

        return instance


class TransactionAmountByMonthSerializer(serializers.Serializer):
    total_amount = serializers.FloatField(read_only=True)
    month = serializers.CharField(read_only=True)

    class Meta:
        fields = ["total_amount", "month"]
