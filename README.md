
Personal project in which I overlaid tweets from the Austin area on a map of Austin. The tweets are categorized by sentiment; happy tweets show up as red, sad tweets show up as blue, and neutral tweets as green.

The tweets have their sentiment classified through an API I found online (link directly below). For example, if a tweet is "I had a bad day", the sentiment analysis would return "negative", and if a tweet is "I had a great day", the tool would return "positive".

http://text-processing.com/docs/sentiment.html

public/index.html contains javascript that uses Google Maps API to place markers on a map of Austin. Each marker represents a tweet, and the color of the marker represents the sentiment of the tweet. Red is for tweets the sentiment classifier classified as positive, blue is for negative, and green is for neutral tweets.

schemas/Tweet.js contains the MongoDB schema for tweets.

I'm currently debugging the route '/graph'. I plan to have a graph that shows tweet sentiments by hours of day so people can see what time of the day has the most positive, negative, or neutral tweets.

My repo amend/austin-tweets-stream is the code for streaming tweets from the Austin area using Twitter's API

amend/austin-get-tweets-sentiments uses the sentiment analysis tool to classify tweets and creates a db of the tweets for austin-tweets-map to use

![](http://i.imgur.com/U9RZKpQ.jpg)

![](http://i.imgur.com/PrjFNxy.jpg)

# austin-tweets-map
