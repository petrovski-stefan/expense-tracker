from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .tasks import create_task


class GameScrapingApiView(APIView):

    def get(self, request: Request, game: str) -> Response:

        create_task.delay(game)

        return Response({"message": f"{game} submitted"}, status=status.HTTP_200_OK)
