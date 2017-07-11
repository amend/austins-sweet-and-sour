
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
}
