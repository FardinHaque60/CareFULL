from django.contrib import admin

# Register your models here.
from .models import test, User

admin.site.register(User)
admin.site.register(test)
