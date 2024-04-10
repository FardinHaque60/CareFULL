from django.urls import path
from . import views

urlpatterns = [
    path('landing-page/',views.landing_page, name='landing-page'),
    path('login/', views.login_view, name='login'),
    path('create-account/', views.create_account, name='create-account'),
    path('chatbot/', views.chatbot, name='chatbot'),
]