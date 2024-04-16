from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import pandas as pd
import backend.llm as llm

print("LOADING DATA - THIS WILL TAKE ABOUT A MINUTE")
emb_df, emb_np = llm.load_data("./backend/scraped/embeddings.csv")
lookup = pd.read_csv("./backend/scraped/lookup.csv")
print("DATA SUCCESSFULL LOADED")

current_user = None #WARN: global variable to represent the current user (avoiding session use)

@api_view(['GET'])
def landing_page(request):
    if not current_user:
        return Response({'error': 'not logged in'}, status=status.HTTP_400_BAD_REQUEST)
    user_info = {
        'first_name': current_user.first_name,
        'last_name': current_user.last_name,
        'email': current_user.email
    }
    return Response(user_info)

@api_view(['GET', 'POST'])
def login_view(request):
    global current_user
    if request.method == 'GET':
        if current_user:
            return Response({'message': 'already logged in'})
        else:
            return Response({'message': 'ok'})
    elif request.method == 'POST':
        data = request.data
        email, password = data.get('email'), data.get('password')
        user = authenticate(request, username=email, password=password) #frontend does not save session info
        if user is not None:
            current_user = user #WARN: set current user instead of login() session
            return Response({'message': 'succesfully logged in'})
        else:
            return Response({'error': 'invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'error': 'only POST or GET requests handled'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def logout_view(request):
    global current_user
    if current_user:
        current_user = None #WARN: hard ressetting, no session
        return Response({'message': 'successfully logged out'})
    return Response({'error': 'problem logging out'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_account(request):
    global current_user
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

        current_user = user
        return Response({'message': 'account successfully created'})

    return Response({'error': 'only POST requests handled'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
'''
@api_view(['GET'])
def chatbot(request):
    return
'''

@api_view(['GET'])
def chatbot(request):
    #query = request.POST.get("prompt")
    query = "I think i might have amyloidosis"

    query_emb = llm.get_embedding(query)

    # max index is index of max similarity of all chunks
    max_index, similarities = llm.get_closest(query_emb, emb_np)
    
    # get the df_index the most similar chunk belongs to
    df_max_index = emb_df.iloc[max_index]["df_index"]
    
    # return the most similar article the chunk belongs to
    response = {"text": lookup.iloc[df_max_index]}
    return Response(response, status=status.HTTP_200_OK)
