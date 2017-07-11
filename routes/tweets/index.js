
exports.getTweets = function(req, res) {
  console.log('in /routes/tweets post gettweets, about to return tweets');

  // complicated query because ran out of allowed requests
  // http://text-processing.com/docs/sentiment.html
  req.app.db.models.Tweet.find( { $or: [ { "sentiment_probability.label": "neg" }, {  "sentiment_probability.label": "pos" }, { "sentiment_probability.label": "neutral" } ] }, function(err, tweets) {
    if (err) { console.error('error', err.stack); return;}

    var response = {
      result: tweets
    };

    res.send(JSON.stringify(response));
    console.log('tweets sent');
  });
};
