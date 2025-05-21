from django.db import models


class Game(models.Model):

    game_id = models.CharField(max_length=7, unique=True, db_index=True)

    first_team = models.CharField(max_length=150)
    second_team = models.CharField(max_length=150)
    start = models.CharField(max_length=100)
    league_name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return (
            f"{self.game_id} - {self.first_team} Vs {self.second_team} @ {self.start}"
        )
