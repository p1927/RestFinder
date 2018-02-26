var Home=function(req, res, next) {
  res.render('others/home', { title: 'RestFinder Home',
  content: 'Home'});
};

var About=function(req, res, next) {
  res.render('others/about', { title: 'About RestFinder',
  content: 'About' });
};














////////////////////////////////////*Exports*/////////////////////////////////////////
module.exports.Home=Home;
module.exports.About=About;