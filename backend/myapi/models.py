from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class User(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.username

# test model to see if db is working
class test(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
