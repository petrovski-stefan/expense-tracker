import random

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .tasks import scrape_game


class GameScrapingApiView(APIView):

    def get(self, request: Request, game: str) -> Response:

        for i in range(300):
            if i < 10:
                scrape_game.delay(f"1259165{i}{random.randint(0, 9)}")
            elif i < 100:
                scrape_game.delay(f"125812{i}{random.randint(0, 9)}")
            else:
                scrape_game.delay(f"12580{i}{random.randint(0, 9)}")

        return Response(
            status=status.HTTP_200_OK,
        )
