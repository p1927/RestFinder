var Home=function(req, res, next) {
  res.render('others/home', { title: 'RestFinder Home',
  content: 'Home'});
};

var About=function(req, res, next) {
  res.render('others/about', { title: 'About RestFinder',
  content: 'About' });
};


/***********************************Angular controller*********************************************************/

module.exports.angularApp= function (req,res) {
res.render('locations/layout', { title: 'Home RestFinder' });

};










////////////////////////////////////*Exports*/////////////////////////////////////////
module.exports.Home=Home;
module.exports.About=About;