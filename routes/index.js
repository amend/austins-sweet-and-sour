
exports.init = function(req, res) {
  console.log('in / about to render index.html');

  res.render('index.html', req);
};
