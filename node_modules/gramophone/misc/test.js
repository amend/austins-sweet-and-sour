var http = require('http');
var gramophone = require('./');

var server = http.createServer(function (req, res) {
  req
    .pipe(gramophone.transformStream())
    .pipe(res);
});
server.listen(8000);
