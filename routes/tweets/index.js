
exports.getTweets = function(req, res) {
  console.log('in /routes/tweets post gettweets, about to return tweets');

  // complicated query because ran out of allowed requests
  // http://text-processing.com/docs/sentiment.html
  req.app.db.models.Tweet.find( { $or: [ { "sentiment_probability.label": "neg" }, {  "sentiment_probability.label": "pos" }, { "sentiment_probability.label": "neutral" } ] }, function(err, tweets) {
    if (err) { console.error('error', err.stack); return;}

    var saturday = 0;
    var sunday = 0;

    tweets.forEach(function(tweet) {
      console.log('tweet.created_at: ' + tweet.created_at);

      var index = tweet.created_at.indexOf(' ');
      var day = tweet.created_at.substring(0, tweet.created_at.indexOf(' '));

      console.log('day: ' + day);
      console.log('index: ' + index);

      if(day == 'Sat') {
        saturday += 1;
      } else if (day == 'Sun') {
        sunday += 1;
      } else {
        return new Error("day");
      }
    });
    
    console.log('saturday: ' + saturday);
    console.log('sunday: ' + sunday);

    //console.log('tweets: ' + tweets);
    console.log('tweets.length: ' + tweets.length);
    console.log('typeof tweets: ' + typeof(tweets));

    var response = {
      result: tweets
    };

    console.log('*** response.result[0]: ' + response.result[0]);

    console.log('*** response.result[0].created_at: ' + response.result[0].created_at);
    console.log('*** response.result[0].sentiment_label: ' + response.result[0].sentiment_label);

    res.send(JSON.stringify(response));
    console.log('tweets sent');
  });
};
