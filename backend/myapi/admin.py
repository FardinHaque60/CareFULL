from django.contrib import admin

# Register your models here.
from .models import Appointment, Message

admin.site.register(Appointment)
admin.site.register(Message)