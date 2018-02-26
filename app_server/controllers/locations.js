var request = require('request');
var Request_Options,path;
var apiOptions = {
server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
apiOptions.server = "https://rest-finder.herokuapp.com/";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
var GetDistanceLocations=function(req, res, next) {

path= '/api/locations/distance';
Request_Options = {
					url: apiOptions.server+path,
					method:"GET",
					json: {},
					qs: {
							lng: 78.340959,//not used
							lat: 17.423180,
							distance:100
						}
				};

request (Request_Options,(err,response,body)=>{

if(err)
	{res.status(500);
		res.json({"message":"Could not send data to API"});
		return;}

else {res.render('locations/AllLocations', { title: 'RestFinder AllLocations',  "locations" :body});}
});

};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var GetAllLocations=function(req, res, next) {

path= '/api/locations';
Request_Options = {
					url: apiOptions.server+path,
					method:"GET",
					json: {},
					qs: {
							lng: 0,//not used
							lat: 0,
							maxDistance:10
						}
				};

request (Request_Options,(err,response,body)=>{

if(err)
	{res.status(500);
		res.json({"message":"Could not send data to API"});
		return;}

else {res.render('locations/AllLocations', { title: 'RestFinder AllLocations',  "locations" :body});}
});

};
////////////////////////////////////////////////////////////////////////////////////////////////////////////

var GetSingleLocation=function(req, res, next) {

path= '/api/locations/'+req.params.locationid;
Request_Options = {
					url: apiOptions.server+path,
					method:"GET",
					json: {},
					qs: {
							lng: 0,//not used
							lat: 0,
							maxDistance: 10
						}
				};

request (Request_Options,(err,response,body)=>{
	if(err)
	 	{	res.status(500);
			res.json({"message":"Could not send data to API"});
			return; 		}
	else { 	res.render('locations/SingleLocation', {title: 'SingleLocation RestFinder', content: body[0]});}
});

};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var GetAllReviews=function(req, res, next) {
 
path= '/api/locations/'+req.params.locationid+'/review';
Request_Options = {
					url: apiOptions.server+path,
					method:"GET",
					json: {},
					qs: {
							lng: 0,//not used
							lat: 0,
							maxDistance: 10
						}
				};

request (Request_Options,(err,response,body)=>{
	console.log(body);
	if(err)
	 	{	res.status(500);
			res.json({"message":"Could not send data to API"});
			return; 		}
	else { 	res.render('locations/AllReviews', {title: 'Reviews RestFinder', content:body[0]});}
});

};
/////////////////////////////////////////////////////////////////////////////////////////////////////

var CreateReview=function(req, res, next) {
  res.render('locations/CreateReview', { title: 'CreateReview RestFinder',
    	name: req.query.name, user:{"author":"Pratyush"}
	
  });
};

module.exports.PostReview=function (req,res){
 
path= '/api/locations/'+req.params.locationid+'/review';
Request_Options = {
					url: apiOptions.server+path,
					method:"POST",
					json: req.body,
					qs: {
							
						}
				};

request (Request_Options,(err,response,body)=>{
	console.log(body);
	if(err)
	 	{	res.status(500);
			res.json({"message":"Could not send data to API"});
			return; 		}
	else { 	res.render('locations/PostReview', { title: 'CreateReview RestFinder',
    	name: req.body.location, rating: req.body.rating});}
});

 


};

module.exports.DeleteReview=function (req,res){
 
path= '/api/locations/'+req.params.locationid+'/'+req.params.reviewid;
Request_Options = {
					url: apiOptions.server+path,
					method:"DELETE",
					json: {},
					qs: {
							
						}
				};

request (Request_Options,(err,response,body)=>{
	
	if(err)
	 	{	res.status(500);
			res.json({"message":"Could not send data to API"});
			return; 		}
	else { 	
		res.status(200);
		res.json(body);
		return;
}
});

 


};












////////////////////////////////////*Exports*/////////////////////////////////////////
module.exports.GetAllLocations=GetAllLocations;
module.exports.GetDistanceLocations=GetDistanceLocations;
module.exports.GetSingleLocation=GetSingleLocation;
module.exports.GetAllReviews=GetAllReviews;
module.exports.CreateReview=CreateReview;











