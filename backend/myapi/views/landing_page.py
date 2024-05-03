from . import api_view, Response, status
from .authentication import get_user

current_user = get_user()

@api_view(['GET'])
def get_user_info(request):
    global current_user
    current_user = get_user()
    #print(current_user.id)
    if not current_user:
        return Response({'error': 'not logged in'}, status=status.HTTP_400_BAD_REQUEST)
    user_info = {
        'firstName': current_user.first_name,
        'lastName': current_user.last_name,
        'email': current_user.email
    }
    return Response(user_info)