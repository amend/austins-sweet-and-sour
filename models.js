
exports = module.exports = function(app, mongoose) {
  //embeddable docs first
  require('./schemas/Tweet')(app, mongoose);
  require('./schemas/TweetComplete')(app, mongoose);
};
