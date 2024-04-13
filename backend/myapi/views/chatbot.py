from . import api_view, Response, status

''' TODO: SET UP OPENAI API KEY
import backend.llm as llm

print("LOADING DATA - THIS WILL TAKE ABOUT A MINUTE")
df, embeddings = llm.load_data("./backend/scraped/chunked_embedding.csv")
print("DATA SUCCESSFULL LOADED")

@api_view(['GET'])
def load_history(request):
    return

@api_view(['POST'])
def get_message(request):
    query = llm.get_embedding("I think I might have amyloidosis")
    max_index, similarities = llm.get_closest(query, embeddings)
    response = {"text": df.iloc[max_index]}
    return Response(response, status=status.HTTP_200_OK) 
'''