from openai import OpenAI
import pandas as pd
import numpy as np
import ast

client = OpenAI()

def chat(prompt: str) -> str:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
        {"role": "system", "content": "You are an LLM tasked with providing expert guidance and advice on various diseases. Your objective is to assist individuals in making informed decisions regarding disease prevention, early detection, and control measures. You will leverage the latest medical literature, research findings, and best practices in the field of medicine, ensuring that your advice is up-to-date and evidence-based. As a Disease Advisor LLM, you play a crucial role in empowering individuals and communities to lead healthier lives and mitigate the impact of various diseases."},
        {"role": "user", "content": prompt}
        ]
    )
    return response

def get_embedding(text, model="text-embedding-3-small"):
    return client.embeddings.create(input=[text], model=model).data[0].embedding

def load_data():
    embeddings = pd.read_csv("scraped/chunked_embedding.csv", converters={"embedding": ast.literal_eval})
    pd_emb = embeddings["embedding"].to_numpy()
    np_emb = []
    for row in pd_emb:
        np_emb.append(np.asarray(row))
    return embeddings, np.asarray(np_emb)

def get_closest(query_embedding, embeddings):
    # cosine similarity
    similarities = np.dot(embeddings, query_embedding) / (np.linalg.norm(embeddings, axis=1) * np.linalg.norm(query_embedding))
    max_index = np.argmax(similarities)
    return max_index, similarities


