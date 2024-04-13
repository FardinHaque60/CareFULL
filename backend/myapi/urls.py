from django.urls import path
from .views import appointments, authentication, chatbot, create_account, landing_page

urlpatterns = [
#landing page endpoints:
    path('get-user-info/', landing_page.get_user_info, name='get-user-info'),
#authentication endpoints:
    path('login/', authentication.login, name='login'),
    path('get-user-status/', authentication.get_user_status, name="get-user-status"),
    path('logout/', authentication.logout, name='logout'),
#create account endpoint:
    path('create-account/', create_account.create_account, name='create-account'),
#chatbot endpoints:
    #path('get-message/', chatbot.get_message, name='get-message'),
    #path('load-history', chatbot.load_history, name='load-history'),
#appointments endpoints:
    path('save-appointment/', appointments.save_appointment, name='save-appointment'),
    path('get-appointments/', appointments.get_appointments, name='get-appointments'),
]