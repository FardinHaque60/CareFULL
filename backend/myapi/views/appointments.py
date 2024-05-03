from . import api_view, Response, status
from .authentication import get_user
from ..models import Appointment

current_user = get_user()

@api_view(['GET'])
def get_appointments(request):
    global current_user
    current_user = get_user()
    appointments = Appointment.objects.filter(user=current_user).order_by('-date', '-time')
    user_appointments = []
    for a in appointments:
        #time is saved as 24 hour time for sorting, convert for display: 
        converted_time = a.time.strftime("%I:%M %p")

        user_appointments.append({
            'id': a.id,
            'title': a.title,
            'date': a.date,
            'time': converted_time,
            'data_time': a.time,
            'description': a.description
        })
    return Response(user_appointments)

@api_view(['POST'])
def save_appointment(request):
    global current_user
    current_user = get_user()
    data = request.data
    title, date, time, description = data.get('title'), data.get('date'), data.get('time'), data.get('description')

    if not (title and date and time):
        return Response({'error': 'invalid fields'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        appointment = Appointment.objects.create(user=current_user, title=title, date=date, time=time, description=description)
        appointment.save()
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'message': 'appointment created successfully'})

@api_view(['POST'])
def edit_appointment(request):
    data = request.data
    appt = Appointment.objects.get(id=data.get('id'))
    appt.title = data.get('title')
    appt.date = data.get('date')
    appt.time = data.get('time')
    appt.description = data.get('description')
    appt.save()

    return Response({'message': 'appointment successfully edited'})

@api_view(['POST'])
def delete_appointment(request):
    Appointment.objects.get(id=request.data.get('id')).delete()

    return Response({'message': 'appointment succesfully deleted'})