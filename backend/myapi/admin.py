from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.
from .models import Appointment, Message, myUser

class myUserAdmin(UserAdmin):
    pass

admin.site.register(myUser, myUserAdmin)
admin.site.register(Appointment)
admin.site.register(Message)