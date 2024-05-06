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
    #TODO return values in health data based on actual data
    #remember to return some placeholder like NA if no data, and round decimal values

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
        return Response("error saving weight entry")
    
    return Response("succesfully saved weight entry")


@api_view(["POST"])
def add_steps_entry(request):
    global current_user
    current_user = get_user()
    data = request.data
    date, steps = data.get("stepsDate"), data.get("stepsNumber")
    try:
        Steps_Data.objects.create(user=current_user, date=date, steps=steps)
    except:
        return Response("error saving steps entry", status=400)
    return Response('successfully saved steps entry', status=200)


@api_view(["POST"])
def add_heart_entry(request):
    global current_user
    current_user = get_user()
    data = request.data
    date, heart_rate = data.get("heartDate"), data.get("heartEntry")
    try:
        Heart_Data.objects.create(user=current_user, date=date, heart_rate=heart_rate)
    except:
        return Response("error saving heart entry", status=400)
    return Response('successfully saved heart entry', status=200)


@api_view(["POST"])
def add_time_entry(request):
    global current_user
    current_user = get_user()
    data = request.data
    date, entry_type, hours = data.get("date"), data.get("type"), data.get("hours")
    try:
        Time_Data.objects.create(user=current_user, date=date, entry_type=entry_type, hours=hours)
    except:
        return Response("error saving time entry", status=400)
    return Response('successfully saved time entry', status=200)

