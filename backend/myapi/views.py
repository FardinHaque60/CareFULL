from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import test

@api_view(['GET'])
def landing_page(request):
    data = test.objects.all()
    serializer = [{'id': item.id, 'name': item.name} for item in data]
    return Response(serializer)