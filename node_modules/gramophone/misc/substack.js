var request = require('request');
var gramophone = require('./');
var JSONStream = require('JSONStream');
var es = require('event-stream');

// Find the two most used phrases consisting of two words (ngrams).
/*
request('https://github.com/substack/stream-handbook/blob/master/readme.markdown')
  .pipe(gramophone.stream({ngrams: [2], html: true, limit: 2}))
  .on('data', console.error.bind(console));
  */

var parser = JSONStream.parse(['rows', true, 'doc']),
  req = request({url: 'http://isaacs.couchone.com/registry/_all_docs?include_docs=true'}),
  gramophone = gramophone.transformStream({ngrams: [2,3], minFrequency: 2, from: 'readme', to: 'readmeKeywords'})
  logger = es.mapSync(function (data) {
    if (data.readmeKeywords.length){
      console.error(data.readmeKeywords);
    }
    return data;
   });

req.pipe(parser)
  .pipe(gramophone)
  .pipe(logger);
