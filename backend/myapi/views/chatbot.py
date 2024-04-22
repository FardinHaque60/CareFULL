from . import api_view, Response, status
import pandas as pd
from ..models import Message
from datetime import datetime
from .authentication import get_user
import time as temp_time # remove later, just used for testing delayed responses

#import backend.llm as llm

print("LOADING DATA - THIS WILL TAKE ABOUT A MINUTE")
#emb_df, emb_np = llm.load_data("./backend/scraped/embeddings.csv")
#lookup = pd.read_csv("./backend/scraped/lookup.csv")
print("DATA SUCCESSFULL LOADED")

current_user = get_user()

@api_view(['GET'])
def load_history(request):
    global current_user
    current_user = get_user()
    messages = Message.objects.filter(user=current_user).order_by('id') #TODO may cause bugs in the future if id's are not generated in order, better to sort by date time
    user_history = []
    for msg in messages:
        response_type = "user"
        if (msg.response):
            response_type = "assistant"
        msg_obj = { 
            "role": response_type,
            "content": msg.body,   
        }
        user_history.append(msg_obj)

    return Response(user_history)

@api_view(['POST'])
def get_message(request):
    global current_user
    current_user = get_user()
    current_datetime = datetime.now() #TODO date time are returning weird values, look into timezone etc.
    date = current_datetime.strftime('%Y-%m-%d')
    time = current_datetime.strftime('%H:%M:%S')

    user_prompt = request.data.get('userMsg')
    message = Message.objects.create(user=current_user, body=user_prompt, date=date, time=time, prompt=True)
    message.save()

    response = "message received, here is your response" #TODO: replace with actual response
    '''
    
    implementation for getting chatbot response
    TODO how to pass data as ctx? is this a list data type that it accepts
    do we have to store df_max_index in database? is it attached with the messages
        fardin: I should be able to do that easily by adding a df_max_index column to the messages table and getting the df_index from the last message based on the sorted order
    
    '''
    current_datetime = datetime.now()
    date = current_datetime.strftime('%Y-%m-%d')
    time = current_datetime.strftime('%H:%M:%S')

    message = Message.objects.create(user=current_user, body=response, date=date, time=time, response=True)
    message.save()

    temp_time.sleep(3)
    return Response(response)

    '''
    data  = request.data
    query = data.get("prompt")
    # TODO get previous messages from user
    # this might be handled in the frontend if we are not storing messages in database
    ctx = data.get("ctx")

    # df_max_index should be -1 if it is the first message in a chat.
    # otherwise, df_max_index should be the passed so that the same context is used
    # for all subsequent messages in a chat
    df_max_index = data.get("df_max_index")


    query_emb = llm.get_embedding(query)

    # if is the first message in a chat, then we want to get the context document
    if df_max_index == -1:
        # max index is index of max similarity of all chunks
        max_index, similarities = llm.get_closest(query_emb, emb_np)
        # get the df_index the most similar chunk belongs to
        df_max_index = emb_df.iloc[max_index]["df_index"]
    
    # get and append context document to query
    document = lookup.iloc[df_max_index].item()
    query += "\nThe following article from WebMD may potentially be relevant to the question, use it if it is appropriate to the user's query.\n" + document

    return llm.chat(query, ctx), df_max_index '''
