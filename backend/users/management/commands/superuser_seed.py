from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

User = get_user_model()


class Command(BaseCommand):

    def handle(self, *args, **options):
        username = settings.DJANGO_SUPERUSER_USERNAME
        email = settings.DJANGO_SUPERUSER_EMAIL
        password = settings.DJANGO_SUPERUSER_PASSWORD

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username, email=email, password=password
            )

            self.stdout.write(self.style.SUCCESS("Successfully created a superuser."))
        else:
            self.stdout.write(
                self.style.WARNING(
                    "Superuser with username specified in the .env variable already EXISTS."
                )
            )
