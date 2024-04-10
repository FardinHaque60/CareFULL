from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout

@api_view(['GET'])
def landing_page(request):
    user = request.user
    print(user)
    print(user.is_authenticated)
    user_info = {'first_name': 'test', 'last_name': 'test2'}
    
    #{
    #    'first_name': user.first_name,
    #    'last_name': user.last_name,
    #    'email': user.email
    #}
    return Response(user_info)

@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        data = request.data
        email, password = data.get('email'), data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'succesfully logged in'})
        else:
            return Response({'error': 'invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'only POST requests handled'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'successfully logged out'})

@api_view(['POST'])
def create_account(request):
    if request.method == 'POST':
        data = request.data
        first_name, last_name, email, password, confirm_password = data.get('firstName'), data.get('lastName'), data.get('email'), data.get('password'), data.get('confirmPassword')

        if (password != confirm_password):
            return Response({'error': 'password mismatch'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not (first_name and last_name and email and password):
            return Response({'error': 'invalid fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=email, first_name=first_name, last_name=last_name, email=email, password=password)
            user.save()
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'account successfully created'})

    return Response({'error': 'only POST requests handled'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def chatbot(request):
    return