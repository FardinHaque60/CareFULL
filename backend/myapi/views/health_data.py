from . import api_view, Response, status
from .appointments import get_user
from ..models import Weight_Data
from statistics import mean

current_user = get_user()

@api_view(['POST'])
def add_weight(request):
    global current_user
    current_user = get_user()
    data = request.data
    date, weight = data.get('weightDate'), data.get('weightEntry')
    Weight_Data.objects.create(user=current_user, date=date, weight=weight)
    weightResponse = {
        'weightChange': '',
        'weightEntry': '',
        'weightDate': '',
    }
    all_weigh_data = Weight_Data.objects.filter(user=current_user)
    weights = []
    for w in all_weigh_data:
        weights.append(w.weight)
    weightResponse['weightChange'] = mean(weights) #TODO currently sending average weight

    return Response(weightResponse)