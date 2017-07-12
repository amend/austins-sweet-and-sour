
var express = require('express'),
config = require('./config'),
mongoose = require('mongoose'),
http = require('http');

var app = express();

app.db = mongoose.createConnection(config.mongodb.uri);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
  require('./models')(app, mongoose);
  console.log('setting up graph stats');
  var graph = require('./routes/graph');
  graph.getStats(app, function(stats) {
    console.log('stats: ' + JSON.stringify(stats));

    //graph.getLangaugeStats(app, function(languageStats) {
      //console.log('languageStats: ' + JSON.stringify(languageStats));

      app.use(express.static(__dirname + '/public'));
      app.engine('.html', require('jade').render);

      app.get('/', require('./routes/index').init);
      app.post('/gettweets', require('./routes/tweets').getTweets);

      app.get('/graph', require('./routes/graph').init);
      app.post('/graph/stats', require('./routes/graph').stats);

      app.listen(5000);
      console.log('listening on port 5000...');
    })
  //});
});
