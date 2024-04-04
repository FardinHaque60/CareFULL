from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def landing_page(request):
    return Response({'message': "this is the landing page"})