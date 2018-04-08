require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var server  = app.listen(process.env.PORT || 3000);
var io      = require('socket.io').listen(server);


io.on('connection', function (socket) { 
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');

  });
  socket.on('save-message', function (data) { 
     io.emit('new-message', { message: data });
  });
});


var helmet = require('helmet');

require('./app_api/models/db');
require('./app_api/config/passport');
/*require('./app_api/config/oauthpassport');*/

var routesapi=require('./app_api/routes/routes_api');
var routeschatapi=require('./app_api/routes/chatroutes_api');




/*var app = express();*/
app.use(helmet());
// view engine setup


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());


app.use('/api',routesapi);
app.use('/chatapi',routeschatapi);

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
if (err.name === 'UnauthorizedError') {
res.status(401);
res.json({"message" : err.name + ": " + err.message});
}
});

app.use(function(req, res) {
res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});



module.exports = app;
