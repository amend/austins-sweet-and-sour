
exports = module.exports = function(app, mongoose) {
  var TweetCompleteSchema = new mongoose.Schema({
    text: String,
    geo: {
      coordinates: [ ]
    },
    created_at: String,
    sentiment: String,
    confidence: String
  });

  app.db.model('TweetComplete', TweetCompleteSchema, 'austintweets_complete');
}
