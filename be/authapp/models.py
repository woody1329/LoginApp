from django.contrib.auth.models import User
from django.db import models


class UserAsciiArt(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    ascii_art = models.TextField()

    def __str__(self):
        return f"{self.user.username}'s ASCII Art"
