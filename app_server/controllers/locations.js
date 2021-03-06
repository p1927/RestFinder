var request = require('request');
var Request_Options,path;
var apiOptions = { server : "http://localhost:3000" };
if (process.env.NODE_ENV === 'production') {
apiOptions.server = "https://rest-finder.herokuapp.com";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
var GetDistanceLocations=function(req, res, next) { 
 
	var lng=parseFloat(req.query.lng);
console.log(lng);
	var lat=parseFloat(req.query.lat);
	var maxDis=parseFloat(req.query.distance);

	if(!lat||!lng||!maxDis||lng<-180||lng>180||lat<-90||lat>90||maxDis<10||maxDis>1000000){ 
		res.render('locations/AllLocations', { title: 'RestFinder AllLocations',  "locations" :[],"message":"Coordinates and Distance are wrong/not provided"});
		return;}

path= '/api/locations/distance';
Request_Options = {
					url: apiOptions.server+path,
					method:"GET",
					json: {},
					qs: {
							lng: lng,//not used
							lat: lat,
							distance:maxDis
						}
				};

request (Request_Options,(err,response,body)=>{
console.log(body);
if(err)
	{res.status(500);
		res.render('locations/AllLocations', { title: 'RestFinder AllLocations',  "locations" :[],message:"Could not send data to API"});
		return;}

else { 	
	var message; //error processing from api
	if (!(body instanceof Array)) {
		message = "API lookup error";
		body = [];
	} else {
		if (!body.length) {
		message = "No places found nearby";
	}
	 }

	res.render('locations/AllLocations', { title: 'RestFinder AllLocations',  "locations" :body, "message":message});  }
   });

};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var GetAllLocations=function(req, res, next) {  

path= '/api/locations';
Request_Options = {
					url: apiOptions.server+path,
					method:"GET",
					json: {},
					qs: { }
			    };

request (Request_Options,(err,response,body)=>{

	if(err)
	{res.status(500);
			res.render('locations/AllLocations', { title: 'RestFinder AllLocations',  "locations" :[],message:"Could not send data to API"});
		return;}

else { 
	var message; //error processing from api
	if (!(body instanceof Array)) {
		message = "API lookup error";
		body = [];
	} else {
		if (!body.length) {
		message = "No places in database<button class=\"pull-right btn postlocation\" href=\"#\"><img src=\"/images/contract.png\" height=\"30px\" width=\"30px\"/></button>";
	}
	 }


	res.render('locations/AllLocations', { title: 'RestFinder AllLocations',  "locations" :body, message:message}); }
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


/************************************Delete review*********************************************************/
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


/************************************Add Location*********************************************************/
module.exports.PostLocation=function (req,res){

path= '/api/locations';
Request_Options = {
					url: apiOptions.server+path,
					method:"POST",
					json: req.body,
					qs: {}
				};

request (Request_Options,(err,response,body)=>{
if(err)
	{res.status(500);
		res.json("Could not send data to API");
		return;}

else { 	
	var message; //error processing from api
	if (response.status==400) {
		res.json("API create error");
	} 
	else
    {   res.status(200);
    	res.json({ "locations" :body}); }
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










