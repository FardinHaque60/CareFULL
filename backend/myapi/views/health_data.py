from . import api_view, Response, status
from .appointments import get_user
from ..models import Weight_Data, Steps_Data, Heart_Data, Time_Data
from statistics import mean

current_user = get_user()

@api_view(['GET'])
def get_health_data(request):
    global current_user
    current_user = get_user()
    weight_data = Weight_Data.objects.filter(user=current_user)
    steps_data = Steps_Data.objects.filter(user=current_user)
    heart_data = Heart_Data.objects.filter(user=current_user)
    time_data = Time_Data.objects.filter(user=current_user)
    print(weight_data)
    print(steps_data)
    print(heart_data)
    print(time_data)
    health_data = {
        'weightChange': '-2.4lbs',
        'totalSteps': '24,670 steps',
        'avgHeartRate': '72 bpm',
        'allHeartData': [
            { 'month': 'Jan', 'rate': 75 },
            { 'month': 'Feb', 'rate': 78 },
            { 'month': 'Mar', 'rate': 80 },
            { 'month': 'Apr', 'rate': 72 },
            { 'month': 'May', 'rate': 70 },
        ],
        'timeData': {
            'Sleep': 8,
            'Indoor': 10,
            'Outdoor': 6,
        },
    }
    return Response(health_data)

@api_view(['POST'])
def add_weight(request):
    global current_user
    current_user = get_user()
    data = request.data
    date, weight = data.get('weightDate'), data.get('weightEntry')
    try:
        Weight_Data.objects.create(user=current_user, date=date, weight=weight)
    except:
        return Response("error saving weight entry", status=status.HTTP_400_BAD_REQUEST)
    
    return Response("successfully saved weight entry", status=status.HTTP_200_OK)

@api_view(['POST'])
def add_heart(request):
    global current_user
    current_user = get_user()
    data = request.data
    date, heart_rate = data.get("heartDate"), data.get("heartEntry")
    try:
        Heart_Data.objects.create(user=current_user, date=date, heart_rate=heart_rate)
    except:
        return Response("error saving heart entry", status=status.HTTP_400_BAD_REQUEST)
    return Response('successfully saved heart entry', status=status.HTTP_200_OK)

@api_view(['POST'])
def add_steps(request):
    global current_user
    current_user = get_user()
    data = request.data
    date, steps = data.get("stepsDate"), data.get("stepsNumber")
    try:
        Steps_Data.objects.create(user=current_user, date=date, steps=steps)
    except:
        return Response("error saving steps entry", status=status.HTTP_400_BAD_REQUEST)
    return Response('successfully saved steps entry', status=status.HTTP_200_OK)
