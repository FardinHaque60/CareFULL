from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

# test model to see if db is working
class Appointment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    date = models.DateField()
    time = models.CharField(max_length=8)
    description = models.CharField()
    def __str__(self):
        return self.title