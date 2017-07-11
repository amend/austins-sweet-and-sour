
exports = module.exports = function(app, mongoose) {
  var tweetSchema = new mongoose.Schema({
    text: String,
    sentiment_label: String,
    geo: {
      coordinates: [ ]
    },
    created_at: String,
    sentiment_probability: {
      probability: {
        'neg': Number,
        'neutral': Number,
        'pos': Number
      },
      label: String
    }
  });

  app.db.model('Tweet', tweetSchema, 'austin_tweets_label_time');
  // the above line maps the existing collection make_austintweets_sentiment_collection to tweetSchema and its label Tweet
  // http://stackoverflow.com/questions/5794834/how-to-access-a-preexisting-collection-with-mongoose
}
