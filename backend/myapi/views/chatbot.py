from . import api_view, Response, status
import pandas as pd
from ..models import Message
from datetime import datetime
from .authentication import get_user, get_user_chat_messages, set_user_chat_messages, add_user_chat_message
import time as temp_time # remove later, just used for testing delayed responses

import backend.llm as llm

print("LOADING DATA - THIS WILL TAKE ABOUT A MINUTE")
emb_df, emb_np = llm.load_data("./backend/scraped/embeddings.csv")
lookup = pd.read_csv("./backend/scraped/lookup.csv")
print("DATA SUCCESSFULL LOADED")

current_user = get_user()
chat_messages = get_user_chat_messages()

@api_view(['GET'])
def load_history(request):
    global current_user, chat_messages
    current_user = get_user()
    messages = Message.objects.filter(user=current_user).order_by('id') #TODO may cause bugs in the future if id's are not generated in order, better to sort by date time
    user_history = []
    for msg in messages:
        response_type = "user"
        if (msg.response): #TODO remove user column in db for less space
            response_type = "assistant"
        msg_obj = { 
            "role": response_type,
            "content": msg.body,   
        }
        user_history.append(msg_obj)
    set_user_chat_messages(user_history)
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

    # chatbot generated response implementation below 

    #query = data.get("prompt")
    # TODO get previous messages from user
    # this might be handled in the frontend if we are not storing messages in database
    ctx = get_user_chat_messages()

    # df_max_index should be -1 if it is the first message in a chat.
    # otherwise, df_max_index should be the passed so that the same context is used
    # for all subsequent messages in a chat
    # df_max_index = data.get("df_max_index") TODO implement df_index for document finding

    query_emb = llm.get_embedding(user_prompt)

    '''
    # if is the first message in a chat, then we want to get the context document
    if df_max_index == -1:
        # max index is index of max similarity of all chunks
        max_index, similarities = llm.get_closest(query_emb, emb_np)
        # get the df_index the most similar chunk belongs to
        df_max_index = emb_df.iloc[max_index]["df_index"]
    
    # get and append context document to query
    document = lookup.iloc[df_max_index].item()
    query += "\nThe following article from WebMD may potentially be relevant to the question, use it if it is appropriate to the user's query.\n" + document
    '''

    response = llm.chat(user_prompt, ctx) #, df_max_index
    add_user_chat_message(response)

    current_datetime = datetime.now()
    date = current_datetime.strftime('%Y-%m-%d')
    time = current_datetime.strftime('%H:%M:%S')

    message = Message.objects.create(user=current_user, body=response, date=date, time=time, response=True)
    message.save()

    temp_time.sleep(3)
    return Response(response)
