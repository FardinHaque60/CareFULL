from django.db import models
from django.contrib.auth.models import AbstractUser

# test model to see if db is working
class test(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name