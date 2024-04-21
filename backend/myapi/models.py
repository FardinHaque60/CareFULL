from django.db import models
from django.contrib.auth.models import User

# test model to see if db is working
class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    description = models.CharField()
    def __str__(self):
        return self.title
    
class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.CharField()
    date = models.DateField()
    time = models.TimeField()
    response = models.BooleanField(default=False)
    prompt = models.BooleanField(default=False)
    def __str__(self):
        return self.body