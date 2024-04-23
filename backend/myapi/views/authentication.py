from . import Response, api_view, status
from django.contrib.auth import authenticate, login, logout

current_user = None #WARN global var used to represent current state of user to avoid session
chat_messages = []

#helper method for other files to return the current_user in session
def get_user():
    global current_user
    return current_user

def set_user(state):
    global current_user
    current_user = state

def get_user_chat_messages():
    global chat_messages
    return chat_messages

def set_user_chat_messages(messages):
    global chat_messages
    chat_messages = [messages]

def add_user_chat_message(message):
    global chat_messages
    chat_messages.append(message)

@api_view(['POST'])
def login(request):
    global current_user
    data = request.data
    email, password = data.get('email'), data.get('password')
    user = authenticate(request, username=email, password=password) #frontend does not save session info
    if user is not None:
        login(user) #does not utilize sessions, just used so database tracks last login time, etc.
        current_user = user #WARN: set current user instead of login() session
        return Response({'message': 'succesfully logged in'})
    else:
        return Response({'error': 'invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_status(request):
    global current_user
    if current_user:
        return Response({'message': 'already logged in'})
    else:
        return Response({'message': 'ok'})

@api_view(['POST'])
def logout(request):
    global current_user
    if current_user:
        logout(current_user) #no sessions, just used for database updation
        current_user = None #WARN: hard ressetting, no session
        return Response({'message': 'successfully logged out'})
    return Response({'error': 'problem logging out'}, status=status.HTTP_400_BAD_REQUEST)