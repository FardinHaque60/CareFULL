from . import Response, api_view, status
from django.contrib.auth.models import User
from .authentication import set_user

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

        set_user(user)
        return Response({'message': 'account successfully created'})

    return Response({'error': 'only POST requests handled'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)