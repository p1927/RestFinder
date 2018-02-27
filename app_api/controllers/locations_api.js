var Loc=require('../models/location_model');

//__________________________________________________________setting Averagerating with add review___________________________
var setAvgRating= function (rating,newlength,location) { 
location.avgrating=parseInt((location.avgrating*(newlength-1)+rating)/newlength);
location.save((err,location)=>{
	if (err) {
								return err;
									} 

});
};
//____________________________________________________________updating average rating_________________________
var updateAverageRating = function(locationid) {
		Loc
			.findById(locationid)
			.select('rating reviews')
			.exec( 	function(err, location) {
					if (!err) {
					doSetAverageRating(location);
					}
					});
};

var doSetAverageRating = function(location) {
			var i, reviewCount, ratingAverage, ratingTotal;
			if (location.reviews && location.reviews.length > 0) {
			reviewCount = location.reviews.length;
			ratingTotal = 0;
			for (i = 0; i < reviewCount; i++) {
			ratingTotal = ratingTotal + location.reviews[i].rating;
			}
			ratingAverage = parseInt(ratingTotal / reviewCount, 10);
			location.avgrating = ratingAverage;
			location.save(function(err) {
			if (err) {
			console.log(err);
			} else {
			console.log("Average rating updated to", ratingAverage);
			}
			});
			}
};

//_____________________________________________________________________________________
module.exports.AllDistanceLocations=function(req, res) {
	
	var lng=parseFloat(req.query.lng);
	var lat=parseFloat(req.query.lat);
	var maxDis=parseFloat(req.query.distance);

	if(!lat||!lng||!maxDis){ sendJsonResponse(res,404,{"message":"Coordinates and Distance not provided"});return;}
	


    Loc.aggregate(
        [
            {
                '$geoNear': {
                    'near': { "type" : "Point", "coordinates" : [ lng, lat] },
                    'spherical': true,
                    'distanceField': 'distance1',
                    'maxDistance': maxDis.toString()
                }
            }
        ],
        function(err, results) {
    if(err){sendJsonResponse(res,404,err); return;}
	var locations=[];
	results.forEach( function(doc) { 
	// statements
	var cordist="";
	if (doc.distance1>1000) { cordist= parseFloat(((doc.distance1)/1000).toFixed(1))+" km";}
	else { cordist= parseInt(doc.distance1)+" m";}

	locations.push({
					distance:cordist,//theEarth.getDistanceFromRads(doc.distance),
					name: doc.name,
					address: doc.address,
					avgrating: doc.avgrating,
					facilities: doc.facilities,
					openinghrs: doc.openinghrs,
					_id: doc._id

	 				});

	Loc.findById(doc._id).select('distance').exec((err,location)=>{location.distance=cordist; 
																	location.save((err,location)=>{ 
																		if (err) { console.log("Error saving distance in locations_api");
																		console.log('Error',err);
																		sendJsonResponse(res, 400, err);} 
																	  });		
																					});
			});

	if (locations[0]) 	sendJsonResponse(res,200,locations);
	else 	sendJsonResponse(res,200,[]);
        }
    );


};

////////////////////////////////////*Read*/////////////////////////////////////////
module.exports.AllLocations=function(req, res) {  //checked
	
Loc.find({})
	.select('name avgrating distance address openinghrs facilities')
	.exec((err,location)=>{
		if(!location)
			{sendJsonResponse(res,200,[]); return;}
		else if (err) 
			{ console.log('Error',err);
			  sendJsonResponse(res,200,err); return;}
		else
			{sendJsonResponse(res,200,location);}
	});

};
//-----------------------------------------------------------------------------------
module.exports.SingleLocation=function(req, res) {
if(req.params&&req.params.locationid)
{
	Loc
	.find({_id:req.params.locationid},{"reviews.comments":0})
	.exec((err,location)=>{
		if(!location)
			{sendJsonResponse(res,200,{"Result":"Not Found"}); return;}
		else if (err) 
			{sendJsonResponse(res,200,err); return;}
		else
			{sendJsonResponse(res,200,location);}
	});}
else {sendJsonResponse(res,404,{"message": "Invalid Address"});}
};
//-----------------------------------------------------------------------------------//Recent Reviews to added
module.exports.AllReviews=function(req, res) {
if(req.params&&req.params.locationid)
	{Loc.find({_id:req.params.locationid})
		.select('name tagline avgrating distance reviews')
		.exec((err,reviews)=>{
			if(!reviews)
				{sendJsonResponse(res,200,{"Result":"Not Found"}); return;}
			else if (err) 
				{sendJsonResponse(res,200,err); return;}
			else
				{sendJsonResponse(res,200,reviews);}
		});}
else {sendJsonResponse(res,404,{"message": "Invalid Address"});}


 
};
//-----------------------------------------------------------------------------------
module.exports.SingleReviews=function(req, res) {
if(req.params&&req.params.locationid&&req.params.reviewid)
{
Loc.find({_id:req.params.locationid})
	.select('reviews')
	.exec((err,location)=>{ 
							if (err) {
								sendJsonResponse(res, 400, err); return; } 
							else {
									var review=location[0].reviews.id(req.params.reviewid);
									if(!review)
										{sendJsonResponse(res,200,{"Result":"Not Found"}); return;}
									else
										{sendJsonResponse(res,200,review);}  } 
		                   });
}
	else {sendJsonResponse(res,404,{"message": "Invalid Address"});}
};
//-----------------------------------------------------------------------------------
module.exports.AllComments=function(req, res) {
if(req.params&&req.params.locationid&&req.params.reviewid)
	{
Loc.find({_id:req.params.locationid})
	.select('reviews')
	.exec((err,location)=>{ 
							if (err) {
								sendJsonResponse(res, 400, err); return; } 
							else {
									var review=location[0].reviews.id(req.params.reviewid);
									if(!review)
										{sendJsonResponse(res,200,{"Result":"Not Found"}); return;}
									else
										{sendJsonResponse(res,200,review.comments);}  } 
		                   });
   }
else {sendJsonResponse(res,404,{"message": "Invalid Address"});}

};
//-----------------------------------------------------------------------------------
module.exports.SingleComment=function(req, res) {
if(req.params&&req.params.locationid&&req.params.reviewid&&req.params.commentid)
{

	Loc.find({_id:req.params.locationid})
	.select('reviews')
	.exec((err,location)=>{ 
							if (err) {
								sendJsonResponse(res, 400, err); return; } 
							else {
								var comment=location[0].reviews.id(req.params.reviewid).comments.id(req.params.commentid);
								if(!comment)
									{sendJsonResponse(res,200,{"Result":"Not Found"}); return;}
								else
									{sendJsonResponse(res,200,comment);} }  });
	}
else {sendJsonResponse(res,404,{"message": "Invalid Address"});}

};
//-----------------------------------------------------------------------------------
module.exports.AllReplies=function(req, res) {
 
};
//-----------------------------------------------------------------------------------
module.exports.SingleReply=function(req, res) {

};

////////////////////////////////////*Write*/////////////////////////////////////////
module.exports.AddLocation=function(req, res) {
	
Loc.create({
name:req.body.name,
tagline: req.body.tagline,		
address:  req.body.address,		
openinghrs: req.body.openinghrs.split(","),	
facilities: req.body.facilities.split(","),	
email: 		req.body.email,	
website: 	req.body.website,	
telephone: 	req.body.telephone,	
coords: [parseFloat(req.body.lng),parseFloat(req.body.lat)]
 			},
(err,location)=>{

				if (err) {  console.log('Error',err);
					sendJsonResponse(res, 400, err); } 
				else { 	console.log(location);
					sendJsonResponse(res, 201, location); }
			    });
};
//=====================================================================
module.exports.AddReview=function(req, res) {
if(req.params&&req.params.locationid)
{ 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							if (err) {
							sendJsonResponse(res, 400, err);
							} 
							else {

							location.reviews.push({ 
											reviewtitle: req.body.reviewtitle,
											rating: req.body.rating,
											review: req.body.review,
											author: req.body.author
																			
						 				});
							location.save((err,location)=>{
										if (err) { sendJsonResponse(res, 400, err); 
											console.log('this');} 
										else {  var len=location.reviews.length;
											   var thisreview=location.reviews[len-1];
											   var error=setAvgRating(thisreview.rating,len,location);
											   sendJsonResponse(res, 201, {'review':thisreview, 'Ratingerror':error}); }
											   });
								} 
						});

}
else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID"});}

};
//====================================================================================
module.exports.AddComment=function(req, res) {

if(req.params&&req.params.locationid&&req.params.reviewid)
{

	Loc.find({_id:req.params.locationid})
	.select('reviews')
	.exec((err,location)=>{ 
							if (err) {
								sendJsonResponse(res, 400, err); return; } 
							else {
								var review=location[0].reviews.id(req.params.reviewid);
                                if (review===null) {sendJsonResponse(res,404,{"message":"Invalid Address, no matching reviewID"}); return;}
								review.comments.push({
														comment: req.body.comment,
														author: req.body.author  });													
					 			                    	
								review.commentnos++;
								location[0].save((err,location)=>{
														if (err) { sendJsonResponse(res, 400, err);} 
														else { var thiscomment=location.reviews.id(req.params.reviewid).comments[location.reviews.id(req.params.reviewid).comments.length-1];
															   sendJsonResponse(res, 201, thiscomment); }   });
					                                      
                                 } 

                            });
 
							

}
else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID"});}


};
//===================================================================================================
module.exports.AddReply=function(req, res) {  
 if(req.params&&req.params.locationid&&req.params.reviewid&&req.params.commentid)
{
 Loc.find({_id:req.params.locationid})
	.select('reviews')
	.exec((err,location)=>{ 
							if (err) {
								sendJsonResponse(res, 400, err); return; } 
							else {
								var comment=location[0].reviews.id(req.params.reviewid).comments.id(req.params.commentid);
                                if (comment===null) {sendJsonResponse(res,404,{"message":"Invalid Address, no matching reviewID/commentID"}); return;}
								comment.replies.push({
														reply: req.body.reply,
														author: req.body.author  });													
					 			                    	
								comment.replynos++;
								location[0].save((err,location)=>{
														if (err) { sendJsonResponse(res, 400, err);} 
														else { var thisreply=location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replies[location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replies.length-1];
															   sendJsonResponse(res, 201, thisreply); }   });
					                                      
                                 } 

                            });

}
else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID"});}



};

////////////////////////////////////*Edit*/////////////////////////////////////////
module.exports.EditLocation=function(req, res) {
  if (!req.params.locationid) {
sendJsonResponse(res, 404, { "message": "Location ID Not found, Location is required" });
return;
}
Loc
	.findById(req.params.locationid)
	.select('-reviews -avgrating')
	.exec( function(err, location) { 
				
					if (!location) { sendJsonResponse(res, 404, { "message": "No Location to update"}); 	return; } 
					else if (err) { sendJsonResponse(res, 400, err); return; }
				    else {
							location.name = req.body.name;
							location.address = req.body.address;
							location.facilities = req.body.facilities.split(",");
							location.openinghrs = req.body.openinghrs.split(",");
							location.tagline=req.body.tagline;		
                            location.email= req.body.email;
                            location.website= req.body.website;
                            location.telephone= req.body.telephone;
                            location.coords= [parseFloat(req.body.lng),parseFloat(req.body.lat)];
							location.save(function(err, location) { 
																	if (err) {
																	sendJsonResponse(res, 404, err); } 
																	else {
																	sendJsonResponse(res, 200, location); } });
						        } 
				  
				  
                     });

   };


//-------------------------------------------------------------------------------------------------------------------------
module.exports.EditReviews=function(req, res) {
 if (!req.params.locationid || !req.params.reviewid) {
sendJsonResponse(res, 404, { "message": "Not found, locationid and reviewid are both required" });
return;
}
Loc
	.findById(req.params.locationid)
	.select('reviews')
	.exec( function(err, location) { 
					var thisReview;
					if (!location) { sendJsonResponse(res, 404, { "message": "locationid not found"}); 	return; } 
					else if (err) { sendJsonResponse(res, 400, err); return; }
				    if (location.reviews && location.reviews.length > 0) {
							thisReview = location.reviews.id(req.params.reviewid);
							if (!thisReview) { 	sendJsonResponse(res, 404, { "message": "reviewid not found" }); 	} 
							else {
							thisReview.reviewtitle = req.body.reviewtitle;	
							thisReview.author = req.body.author;
							thisReview.rating = req.body.rating;
							thisReview.review = req.body.review;
							thisReview.reviewdate = Date();
							location.save(function(err, location) { 
																	if (err) {
																	sendJsonResponse(res, 404, err); } 
																	else {
																	updateAverageRating(location._id);
																	sendJsonResponse(res, 200, thisReview); } });
						        } 
				      }
				    else { sendJsonResponse(res, 404, { "message": "No review to update" }); }
       });
};


////////////////////////////////////*Remove*/////////////////////////////////////////
module.exports.Delete_AllLocations=function(req, res) {// use to clear data set
  
Loc.findByIdAndRemove({}).exec(function(err, location) {
					                               if (err) { sendJsonResponse(res, 404, err); return; }
					                               else if (location) {sendJsonResponse(res, 200, {"message":"Removed all Location Data"});}
					                               else  { sendJsonResponse(res, 404, { "message": "No locations"});}	});
				 

};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_SingleLocation=function(req, res) {
 var locationid = req.params.locationid;
if (locationid) {   Loc
					.findByIdAndRemove(locationid)
					.exec(function(err, location) {
					                               if (err) { sendJsonResponse(res, 404, err); return; }
					                               else if (location) {sendJsonResponse(res, 200,  {"message":"Removed Location Data"});}
					                               else { sendJsonResponse(res, 404, { "message": "No locationid"});}	});
					} 
else { sendJsonResponse(res, 404, { "message": "No locationid"});}
};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_AllReviews=function(req, res) {
 
if(req.params&&req.params.locationid)
{ 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							if (err) {
							sendJsonResponse(res, 400, err);
							} 
							else {
if (location.reviews[0])
							{location.reviews.forEach((element)=>{element.remove();});
														location.avgrating=0;
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err);  } 
																	else { sendJsonResponse(res, 200,{"message":"Removed All Reviews Data"}); }   });}
								else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID"});}
								 } 
						 });

}
else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID"});}

};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_SingleReviews=function(req, res) {
 
if(req.params&&req.params.locationid&&req.params.reviewid)
{ 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							if (err) {
							sendJsonResponse(res, 400, err);
							} 
							else {
if(location.reviews.id(req.params.reviewid))
							{location.reviews.id(req.params.reviewid).remove();
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err); }
																		
																	else { updateAverageRating(location._id);
																		sendJsonResponse(res, 200,{"message":"Removed Review Data"}); }   });}
										else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID / ReviewID"});}
								 } 
						 });

}
else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID / ReviewID"});}

};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_AllComments=function(req, res) {
 
if(req.params&&req.params.locationid&&req.params.reviewid)
{ 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							if (err) {
							sendJsonResponse(res, 400, err);
							} 
							else {
if(location.reviews.id(req.params.reviewid).comments[0])
							{location.reviews.id(req.params.reviewid).comments.forEach((element)=>{element.remove();});
														location.reviews.id(req.params.reviewid).commentnos=0;
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err); }
																		
																	else { 
																		sendJsonResponse(res, 200,{"message":"Removed All Comment Data"}); }   });}
														else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID / ReviewID"});}
								 } 
						 });

}
else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID / ReviewID"});}


};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_SingleComment=function(req, res) {
 
if(req.params&&req.params.locationid&&req.params.reviewid&&req.params.commentid)
{ 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							if (err) {
							sendJsonResponse(res, 400, err);
							} 
							else {
if(location.reviews.id(req.params.reviewid).comments.id(req.params.commentid))
							{location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).remove();
														location.reviews.id(req.params.reviewid).commentnos--;
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err); }
																		
																	else { 
																		sendJsonResponse(res, 200,{"message":"Removed Comment Data"}); }   });}
														else {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID / ReviewID/ CommentID"});}
								 } 
						 });

}
else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID / ReviewID/ CommentID"});}

};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_AllReplies=function(req, res) {

	if(req.params&&req.params.locationid&&req.params.reviewid&&req.params.commentid)
{ 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							if (err) {
							sendJsonResponse(res, 400, err);
							} 
							else {
if (location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replies[0])
							{location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replies.forEach((element)=>{element.remove();});
														location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replynos=0;
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err); }
																		
																	else { 
																		sendJsonResponse(res, 204,{"message":"Removed All Replies Data"}); }   });}
									else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID / ReviewID/ CommentID"});}					
								 } 
						 });

}
else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID / ReviewID/ CommentID"});}
 
};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_SingleReply=function(req, res) {

		if(req.params&&req.params.locationid&&req.params.reviewid&&req.params.commentid&&req.params.replyid)
{ 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							if (err) {
							sendJsonResponse(res, 400, err);
							} 
							else {
     if(location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replies.id(req.params.replyid))
							{location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replies.id(req.params.replyid).remove();
														location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replynos--;
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err); }
																		
																	else { 
																		sendJsonResponse(res, 204,{"message":"Removed Reply Data"}); }   }); }
								 
	else {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID / ReviewID/ CommentID/ ReplyID"}); }
						
                           }   });
   }
else  {sendJsonResponse(res,404,{"message":"Invalid Address, provide locationID / ReviewID/ CommentID/ ReplyID"});}
 
};
//-------------------------------------------------------------------------------------------------------------------------

var sendJsonResponse=function (res,status,content) {
res.status(status);
res.json(content);
};
























