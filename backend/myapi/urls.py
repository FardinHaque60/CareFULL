from django.urls import path
from . import views

urlpatterns = [
    path('landing-page/',views.landing_page, name='landing-page'),
    
]