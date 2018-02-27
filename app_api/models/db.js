var mongoose=require('mongoose');

var dbURI = 'mongodb://localhost:27017/Restfinder';
if (process.env.NODE_ENV === 'production') {

dbURI = "mongodb://admin:admin>@ds249398.mlab.com:49398/restfinder";

}

mongoose.connect(dbURI);
mongoose.connection.on('connected', function(){

console.log("Mongoose connected to "+dbURI);
});
mongoose.connection.on('error', function(err){

console.log("Mongoose faced an issue: "+err);
});

mongoose.connection.on('disconnected', function(){

console.log("Mongoose successfully disconnected");
});

var readLine = require ("readline");
if (process.platform === "win32"){
var rl = readLine.createInterface ({
input: process.stdin,
output: process.stdout
});
rl.on ("SIGINT", function (){
process.emit ("SIGINT");
});
};

var gracefulShutdown = function (msg, callback) {
mongoose.connection.close(function () {
console.log('Mongoose disconnected through ' + msg);
callback();
});
};

// For nodemon restarts
process.once('SIGUSR2', function () {
gracefulShutdown('nodemon restart', function () {
process.kill(process.pid, 'SIGUSR2');
});
});
// For app termination
process.on('SIGINT', function() {
gracefulShutdown('app termination', function () {
process.exit(0);
});
});
// For Heroku app termination
process.on('SIGTERM', function() {
gracefulShutdown('Heroku app shutdown', function () {
process.exit(0);
});
});
require('./location_model');