
exports.init = function(req, res) {
  console.log('***** in /graph');

  res.render('graph/index.html', req);
  //res.render('/graph/index.html', req);
};
