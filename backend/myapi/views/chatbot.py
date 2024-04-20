from . import api_view, Response, status
import pandas as pd

import backend.llm as llm

print("LOADING DATA - THIS WILL TAKE ABOUT A MINUTE")
emb_df, emb_np = llm.load_data("./backend/scraped/embeddings.csv")
lookup = pd.read_csv("./backend/scraped/lookup.csv")
print("DATA SUCCESSFULL LOADED")

@api_view(['GET'])
def load_history(request):
    return

@api_view(['POST'])
def get_message(request):
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

    return llm.chat(query, ctx), df_max_index
