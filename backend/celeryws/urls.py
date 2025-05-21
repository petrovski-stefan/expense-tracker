from django.urls import path

from .views import GameScrapingApiView

urlpatterns = [
    path("scrape/<str:game>/", view=GameScrapingApiView.as_view(), name="scrape"),
]
