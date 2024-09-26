# Generated by Django 5.1.1 on 2024-09-26 17:19

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_category_user_alter_category_name_and_more"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="category",
            name="name",
            field=models.CharField(max_length=25),
        ),
        migrations.AlterUniqueTogether(
            name="category",
            unique_together={("name", "user")},
        ),
    ]
