from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class myUser(AbstractUser):
    df_max_index = models.IntegerField(default=-1)

    groups = models.ManyToManyField(Group, related_name='myuser_set')
    user_permissions = models.ManyToManyField(Permission, related_name='myuser_set')

# test model to see if db is working
class Appointment(models.Model):
    user = models.ForeignKey('myapi.myUser', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    description = models.CharField()
    def __str__(self):
        return self.title
    
class Message(models.Model):
    user = models.ForeignKey('myapi.myUser', on_delete=models.CASCADE)
    body = models.CharField()
    date = models.DateField()
    time = models.TimeField()
    response = models.BooleanField(default=False)
    prompt = models.BooleanField(default=False)
    def __str__(self):
        return self.body
    
class Weight_Data(models.Model):
    user = models.ForeignKey('myapi.myUser', on_delete=models.CASCADE)
    date = models.DateField()
    weight = models.IntegerField()
    def __str__(self):
        return self.weight
    
class Steps_Data(models.Model):
    user = models.ForeignKey('myapi.myUser', on_delete=models.CASCADE)
    date = models.DateField()
    #weight = models.IntegerField()
    def __str__(self):
        return #self.weight

class Heart_Data(models.Model):
    user = models.ForeignKey('myapi.myUser', on_delete=models.CASCADE)
    date = models.DateField()
    #weight = models.IntegerField()
    def __str__(self):
        return #self.weight

class Time_Data(models.Model):
    user = models.ForeignKey('myapi.myUser', on_delete=models.CASCADE)
    date = models.DateField()
    #weight = models.IntegerField()
    def __str__(self):
        return #self.weight