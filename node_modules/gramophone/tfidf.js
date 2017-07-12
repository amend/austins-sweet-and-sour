var natural = require('natural'),
  TfIdf = natural.TfIdf,
  tfidf = new TfIdf();

var gramaphone = require('./');

var docs = [
  'this document is about node programming language.',
  'this document is about ruby programming language.',
  'this document is about the ruby programming language and node programming language.',
  'this document is about node programming language. it has node programming language examples'
];

docs.forEach(function(doc, index){
  var ngrams = gramaphone.extract(doc, { min: 1 , flatten: true});
  console.error('ngrams for doc ' + index + ':');
  console.error(ngrams);
  tfidf.addDocument(ngrams);
});

console.log('node programming language -----------');
tfidf.tfidfs(['node programming language'], function(i, measure) {
  console.log('document #' + i + ' is ' + measure);
});

/*
console.log('"document" --------------------------------');
tfidf.tfidfs('"document"', function(i, measure) {
  console.log('document #' + i + ' is ' + measure);
});
*/
