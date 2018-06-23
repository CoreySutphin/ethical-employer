# Corey Sutphin
# A program to pull tweets about a company/subject and return various statistics on the results.
# Performs sentiment analysis on the tweets and plots the results, also returns the most favorited tweet
# in the past 7 days about the subject.

import sys, os, re, json, twitter
import pandas as pd
import numpy as np
from textblob import TextBlob

if ('TWITTER_API_KEY' not in os.environ):
    sys.exit('ERROR: Please set your consumer key and secret in your environment variables as TWITTER_API_KEY and TWITTER_API_SECRET')

api = twitter.Api(
    consumer_key=os.environ.get('TWITTER_API_KEY'),
    consumer_secret=os.environ.get('TWITTER_API_SECRET'),
    application_only_auth=True
    )

company = sys.argv[1]
recent_query = "q=" + company + "%20&result_type=recent&lang=en&count=100"
popular_query = "q=" + company + "%20&result_type=popular&lang=en&count=100"

recent_results = api.GetSearch(raw_query = recent_query)
popular_results = api.GetSearch(raw_query = popular_query)

# Returns a list of tweets with punctuation and stop list words removed
def filter_tweets(tweets):
    filtered_tweets = []
    punctuation = [".", ",", "?", "!"]
    stop_words = ["a", "the", "an", "are", "RT"]
    stop_words_regex = re.compile(r'\b%s\b' % r'\b|\b'.join(map(re.escape, stop_words)))
    for tweet in tweets:
        text = tweet.text
        # Remove all punctuation
        for char in punctuation:
            text.replace(char, "")
        # Remove all standard stop words
        filtered_tweet = stop_words_regex.sub("", text)
        # Remove all twitter-specific non-content strings like @'s, hashtags, and links
        filtered_tweet = ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", "", filtered_tweet).split())
        filtered_tweets.append(filtered_tweet)

    return filtered_tweets

def sentiment_analysis(filtered_tweets):
    pos_tweets = 0
    neg_tweets = 0
    neutral_tweets = 0

    for tweet in filtered_tweets:
        analysis = TextBlob(tweet)
        if analysis.sentiment.polarity > 0:
            pos_tweets += 1
        elif analysis.sentiment.polarity < 0:
            neg_tweets += 1
        else:
            neutral_tweets += 1
    return {'positive': pos_tweets, 'negative': neg_tweets, 'neutral': neutral_tweets}

# Performing sentiment analysis on the tweets and returning the results
sentiment_data = sentiment_analysis(filter_tweets(recent_results))
print(json.dumps(sentiment_data))

# Finding the most favorited tweet out of the most popular recent tweets
favorites_counts = [tweet.favorite_count for tweet in popular_results]
most_popular_index = favorites_counts.index(max(favorites_counts))
print(popular_results[most_popular_index].text.encode("utf-8"))
