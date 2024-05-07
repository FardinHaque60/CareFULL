from . import api_view, Response, status
from .appointments import get_user
from ..models import Weight_Data, Steps_Data, Heart_Data, Time_Data
from datetime import datetime, timedelta
import sys

current_user = get_user()

@api_view(['GET'])
def get_health_data(request):
    global current_user
    current_user = get_user()
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=7)
    start_year = end_date - timedelta(days=365)

    weight_data = Weight_Data.objects.filter(user=current_user, date__range=(start_date, end_date))
    steps_data = Steps_Data.objects.filter(user=current_user, date__range=(start_date, end_date))
    all_heart_data = Heart_Data.objects.filter(user=current_user, date__range=(start_year, end_date)).order_by('date')
    heart_data = all_heart_data.filter(date__range=(start_date, end_date))
    time_data = Time_Data.objects.filter(user=current_user, date__range=(start_date, end_date))

    health_data = {
        'weightChange': '0lbs',
        'totalSteps': '0 steps',
        'avgHeartRate': 'N/A bpm',
        'allHeartData': [],
        'timeData': {
            'Sleep': 0,
            'Indoor': 0,
            'Outdoor': 0,
        },
    }
    # weight change this week calc
    min_weight = sys.maxsize
    max_weight = -sys.maxsize - 1
    for w in weight_data:
        min_weight = min(w.weight, min_weight)
        max_weight = max(w.weight, max_weight)
    diff = str(max_weight - min_weight)
    if (weight_data.count() > 0):
        health_data['weightChange'] = diff + "lbs"

    # total steps this week calc 
    total_steps = 0
    for s in steps_data:
        total_steps += s.steps
    health_data['totalSteps'] = str(total_steps) + " steps"

    # average heart rate this week
    sum_bpm = 0
    for h in heart_data:
        sum_bpm += h.heart_rate
    if (heart_data.count() > 0):
        health_data['avgHeartRate'] = str(round(sum_bpm/heart_data.count(), 2)) + " bpm"

    # format all heart data
    bpm_entries = []
    visited_months = set()
    for h in all_heart_data:
        month = h.date.strftime("%B")
        
        if (month in visited_months):
            for b in bpm_entries:
                if (b['month'] == month):
                    b['rate'] = (b['rate'] + h.heart_rate) / 2
                    break
        else:
            entry = {
                'month': month,
                'rate': h.heart_rate,
            }
            visited_months.add(month)
            bpm_entries.append(entry)
    health_data['allHeartData'] = bpm_entries
    print(bpm_entries)

    # time data formatting
    times = {
        'Sleep': 0,
        'Indoor': 0,
        'Outdoor': 0,
    }
    for t in time_data:
        times[t.entry_type] += t.hours
    health_data['timeData'] = times

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

@api_view(['GET'])
def get_weight_data(request):
    global current_user
    current_user = get_user()
    weight_data = []
    for w in Weight_Data.objects.filter(user=current_user).order_by('-date'):
        entry = {}
        entry['date'] = w.date
        entry['weightEntry'] = w.weight
        weight_data.append(entry)

    return Response(weight_data)

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

@api_view(['GET'])
def get_heart_data(request):
    global current_user
    current_user = get_user()
    heart_data = []
    for w in Heart_Data.objects.filter(user=current_user).order_by('-date'):
        entry = {}
        entry['date'] = w.date
        entry['heartEntry'] = w.heart_rate
        heart_data.append(entry)

    return Response(heart_data)

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

@api_view(['GET'])
def get_steps_data(request):
    global current_user
    current_user = get_user()
    steps_data = []
    for w in Steps_Data.objects.filter(user=current_user).order_by('-date'):
        entry = {}
        entry['date'] = w.date
        entry['stepsEntry'] = w.steps
        steps_data.append(entry)

    return Response(steps_data)

@api_view(["POST"])
def add_time(request):
    global current_user
    current_user = get_user()
    data = request.data
    date, entry_type, hours = data.get("date"), data.get("type"), data.get("hours")
    try:
        Time_Data.objects.create(user=current_user, date=date, entry_type=entry_type, hours=hours)
    except:
        return Response("error saving time entry", status=status.HTTP_400_BAD_REQUEST)
    return Response('successfully saved time entry', status=status.HTTP_200_OK)

@api_view(['GET'])
def get_time_data(request):
    global current_user
    current_user = get_user()
    time_data = []
    for w in Time_Data.objects.filter(user=current_user).order_by("-date"):
        entry = {}
        entry['date'] = w.date
        entry['timeType'] = w.entry_type
        entry['timeEntry'] = w.hours
        time_data.append(entry)

    return Response(time_data)