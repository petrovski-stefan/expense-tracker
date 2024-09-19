from django.urls import path

from .views import login, register

urlpatterns = [
    path("register", register, name="register"),
    path("login", login, name="login"),
]
