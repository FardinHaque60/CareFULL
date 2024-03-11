import pandas as pd
from typing import Iterable
from bs4 import BeautifulSoup
import requests
import time
import random

class article:
    def __init__(self, title, body) -> None:
        self.title = title
        self.body = body

    def to_df(self):
        return pd.DataFrame([{"title": self.title, "body": self.body}])

class scraper:
    
    def __init__(self, topics_urls: list[str], filename: str) -> None:
        self.urls = {}
        for url in topics_urls:
            self.urls[url] = None
        self.articles = []
        self.df = pd.DataFrame()
        self.filename = filename
        
    def scrape_urls(self) -> None:
        HEADERS = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Cache-Control": "max-age=0",
        }
        for url in self.urls.keys():
            response = requests.get(url, headers=HEADERS)
            # sleep for between 1-5 random seconds to not send too many requests at once
            time.sleep(random.random()*4 + 1)
            if response.status_code == 200:
                print("Making request for " + url)
                self.urls[url] = BeautifulSoup(response.content.decode('utf-8', 'ignore'), "html.parser")
            else:
                print(response)
                print("Request failed for: " + url)
    
    def extract_urls_from_topics(self):
        temp = {}
        for url in self.urls.keys():
            for li in self.urls[url].find_all('ul', {'class': 'link-list'}):
                for x in li.find_all('a'):
                    if x['href'][-3:] != "htm" and x['href'] not in temp:
                        temp[x['href']] = None
        self.urls = temp
    
    def extract_text_from_article_soups(self):
        for url in self.urls.keys():
            soup = self.urls[url]
            print("Processing soup " + url)
            try: 
                title = soup.find('div', {"class": "inner-article-container"}).find("h1").text
                body = " ".join([x for x in soup.find('div', {"class": "article__body"}).stripped_strings])
                self.articles.append(article(title, body))
            except:
                print("Skipped soup " + url)

    def combine_articles_to_df(self):
        for article in self.articles:
            self.df = pd.concat([self.df, article.to_df()], ignore_index=True)
    
    def save(self):
        with open(self.filename, "w+") as f:
            self.df.to_csv(f)
    
    def scrape(self):
        self.scrape_urls()
        self.extract_urls_from_topics()
        # clears self.urls
        self.scrape_urls()
        self.extract_text_from_article_soups()
        self.combine_articles_to_df()
        self.seen = set()
        self.save()