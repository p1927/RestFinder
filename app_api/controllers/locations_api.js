

var Loc=require('../models/location_model');

/////////////////////////////////////////////////////////////////////////////////////////////////////
//All Locations  GET return type  DATA ERR [] 
//REST GET METHODS  return type  DATA ERR MESSAGES
/////////////////////////////////////////////////////////////////////////////////////////////////////
//__________________________________________________________setting Averagerating with add review___________________________
var setAvgRating = function (rating,newlength,location) { 
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
					else console.log("Error API: Updating rating : ",err);
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
			console.log("Error API: Error in Updating rating function : ",err);
			
			} else {
			console.log("Average rating updated to", ratingAverage);
			
			}
			});
			}
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//_____________________________________________________________________________________Distance based Location selector
module.exports.AllDistanceLocations=function(req, res) {
	
	var lng=parseFloat(req.query.lng);
	var lat=parseFloat(req.query.lat);
	var maxDis=parseFloat(req.query.distance);

	Loc.aggregate(
        [
            {
                '$geoNear': {
                    'near': { "type" : "Point", "coordinates" : [ lng, lat] },
                    'spherical': true,
                    'distanceField': 'distance1',
                    'maxDistance': maxDis,
                    'limit':10
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
					distance:cordist,
					name: doc.name,
					address: doc.address,
					avgrating: doc.avgrating,
					facilities: doc.facilities,
					openinghrs: doc.openinghrs,
					_id: doc._id

	 				});

	Loc.findById(doc._id).select('distance').exec((err,location)=>{location.distance=cordist; 
																	location.save((err,location)=>{ 
																		if (err) { console.log("Error API: Saving distance in Location: ",err);
																		
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
			{sendJsonResponse(res,200,[]); return;} // empty array allowed exception
		else if (err) 
			{ console.log("Error API: AllLocations: ",err);
			  sendJsonResponse(res,200,err); return;}
		else
			{sendJsonResponse(res,200,location);}
	});
/*   var err =new Error("Tou are stupid");
	sendJsonResponse(res,200,err); return;*/
};
//-----------------------------------------------------------------------------------
module.exports.SingleLocation=function(req, res) {
 if(req.params&&req.params.locationid)
 {
	Loc
	.find({_id:req.params.locationid},{"reviews.comments":0})
	.exec((err,location)=>{
		if(!location)
			{sendJsonResponse(res,200,{"message":"API: Location Not Found"}); return;}
		else if (err) 
			{ console.log("Error API: SingleLocation: ",err);
				sendJsonResponse(res,200,err); return;}
		else
			{sendJsonResponse(res,200,location);}
	});}
 else {sendJsonResponse(res,404,{"message":"API: Invalid Address"});}
};
//-----------------------------------------------------------------------------------//Recent Reviews to added
module.exports.AllReviews=function(req, res) {
 if(req.params&&req.params.locationid)
	{Loc.find({_id:req.params.locationid})
		.select('name tagline avgrating distance reviews')
		.exec((err,reviews)=>{
			if(!reviews)
				{sendJsonResponse(res,200,{"message":"API: Location Not Found"}); return;}
			else if (err) 
				{console.log("Error API: AllReviews: ",err);
					sendJsonResponse(res,200,err); return;}
			else
				{sendJsonResponse(res,200,reviews);}
		});}
 else {sendJsonResponse(res,404,{"message":"API: Invalid Address"});}

 
};
//-----------------------------------------------------------------------------------
module.exports.SingleReviews=function(req, res) {
 if(req.params&&req.params.locationid&&req.params.reviewid)
 {
 Loc.find({_id:req.params.locationid})
	.select('reviews')
	.exec((err,location)=>{  // cases error, empty array, data
							if (err) {
								sendJsonResponse(res, 400, err); return; } 
							else if(!location[0])
				              {sendJsonResponse(res,200,{"message":"API: Location Not Found"}); return;}
							else {
									var review=location[0].reviews.id(req.params.reviewid);
									if(!review)
										{sendJsonResponse(res,200,{"message":"API: Review Not Found"}); return;}
									else
										{sendJsonResponse(res,200,review);}  } 
		                   });
 }
	else {sendJsonResponse(res,404,{"message":"API: Invalid Address"});}
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
							else if(!location[0])
				              {sendJsonResponse(res,200,{"message":"API: Location Not Found"}); return;}
							else {
									var review=location[0].reviews.id(req.params.reviewid);
									if(!review)
										{sendJsonResponse(res,200,{"message":"API: Review Not Found"}); return;}
									else
										{sendJsonResponse(res,200,review.comments);}  } 
		                   });
   }
 else {sendJsonResponse(res,404,{"message":"API: Invalid Address"});}

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
							else if(!location[0])
				              {sendJsonResponse(res,200,{"message":"API: Location Not Found"}); return;}
				            else if(!location[0].reviews.id(req.params.reviewid))
				              {sendJsonResponse(res,200,{"message":"API:  Review Not Found"}); return;}
							else {
								var comment=location[0].reviews.id(req.params.reviewid).comments.id(req.params.commentid);
								if(!comment)
									{sendJsonResponse(res,200,{"message":"API: Comment Not Found"}); return;}
								else
									{sendJsonResponse(res,200,comment);} }  });
	}
 else {sendJsonResponse(res,404,{"message":"API: Invalid Address"});}
};
//-----------------------------------------------------------------------------------
module.exports.AllReplies=function(req, res) {//EMPTY
};
//-----------------------------------------------------------------------------------
module.exports.SingleReply=function(req, res) {//EMPTY

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
	coords: [parseFloat(req.body.lng),parseFloat(req.body.lat)],
	locationmap: "https://www.google.com/maps/embed/v1/directions?origin="+"8-266/7, ISB Rd, Financial District, Nanakram Guda, Hyderabad, Telangana 500032"+"&destination="+req.body.address+"&key=AIzaSyBpOiiNEJ6Lmiqe1rBc4rY_ZPXPo2OzthU"
	 			},
	(err,location)=>{

					if (err) {  console.log('Error API: AddLocation: ',err);
						sendJsonResponse(res, 400, err); } 
					else { 	
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
						 
							 if(!location)
				              {sendJsonResponse(res,200,{"message":"API: Unable to ADD REVIEW, Location Not Found"}); return;}
				             else if (err) {
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
											console.log('Error API: AddReview: ',err);} 
										else { var len=location.reviews.length;
											   var thisreview=location.reviews[len-1];
											   var error=setAvgRating(thisreview.rating,len,location);
											   console.log('Error API: Rating: ',error);
											   sendJsonResponse(res, 201, {message:"Successfully Posted"}); }
											   });
								} 
						});

 }
 else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, provide locationID"});}

};
//====================================================================================
module.exports.AddComment=function(req, res) {

 if(req.params&&req.params.locationid&&req.params.reviewid)
 {

	Loc.find({_id:req.params.locationid})
	.select('reviews')
	.exec((err,location)=>{ 
							
							 if(!location[0])
				              {sendJsonResponse(res,200,{"message":"API:  Unable to ADD COMMENT, Location Not Found"}); return;}
				          else if (err) {
								sendJsonResponse(res, 400, err); return; } 
							else {
								var review=location[0].reviews.id(req.params.reviewid);
                                if (review===null) {sendJsonResponse(res,404,{"message":"API: Invalid Address, no matching reviewID"}); return;}
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
 else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, provide locationID"});}
};
//===================================================================================================
module.exports.AddReply=function(req, res) {  
 if(req.params&&req.params.locationid&&req.params.reviewid&&req.params.commentid)
 {
 Loc.find({_id:req.params.locationid})
	.select('reviews')
	.exec((err,location)=>{ 
							
							 if(!location[0])
				              {sendJsonResponse(res,200,{"message":"API: Unable to ADD REPLY, Location Not Found"}); return;}
				            else if(!location[0].reviews.id(req.params.reviewid))
				              {sendJsonResponse(res,200,{"message":"API:  Unable to ADD COMMENT,Review Not Found"}); return;}
				            else if (err) {
								sendJsonResponse(res, 400, err); return; } 
							else {
								var comment=location[0].reviews.id(req.params.reviewid).comments.id(req.params.commentid);
                                if (comment===null) {sendJsonResponse(res,404,{"message":"API: Invalid Address, no matching reviewID/commentID"}); return;}
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
 else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, provide locationID"});}
};

////////////////////////////////////*Edit*/////////////////////////////////////////
module.exports.EditLocation=function(req, res) {

 Loc
	.findById(req.params.locationid)
	.select('-reviews -avgrating')
	.exec( function(err, location) { 
				  
				    if (!location) { sendJsonResponse(res, 404, { "message":"API: Location ID Not found"}); 	return; } 
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

 Loc
	.findById(req.params.locationid)
	.select('reviews')
	.exec( function(err, location) { 
					var thisReview;
					
				     if (!location) { sendJsonResponse(res, 404, { "message":"API: Location ID Not found"}); 	return; } 
				     else if (err) { sendJsonResponse(res, 400, err); return; }
					if (location.reviews && location.reviews.length > 0) {
							thisReview = location.reviews.id(req.params.reviewid);
							if (!thisReview) { 	sendJsonResponse(res, 404, { "message":"API: Reviewid not found" }); 	} 
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
				    else { sendJsonResponse(res, 404, { "message":"API: No review to update" }); }
       });
};


////////////////////////////////////*Remove*/////////////////////////////////////////
module.exports.Delete_AllLocations=function(req, res) {// use to clear data set
  
 Loc.findByIdAndRemove({}).exec(function(err, location) {
					                               if (!location) {sendJsonResponse(res, 200, {"message":"API: No Locations Exist"});}
					                               else  if (err) { sendJsonResponse(res, 404, err); return; }
					                               else  { sendJsonResponse(res, 404, { "message":"API: No locations"});}	});
				 

};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_SingleLocation=function(req, res) {
  var locationid = req.params.locationid;
      Loc
        .findByIdAndRemove(locationid)
		.exec(function(err, location) {            
			                                    if (!location) { sendJsonResponse(res, 200,  {"message":"API:  Location Data not found"});}
					                              else if (err) { sendJsonResponse(res, 404, err); return; }
					                                     else { sendJsonResponse(res, 404, { "message":"API: Removed locationid"});}   });
};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_AllReviews=function(req, res) {
 
 if(req.params&&req.params.locationid)
 { 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){

			                if (!location) { sendJsonResponse(res, 200,  {"message":"API:  Location Data not found"});}
							else if (err) { sendJsonResponse(res, 400, err);} 
							else {
                          if (location.reviews[0])
							{location.reviews.forEach((element)=>{element.remove();});
														location.avgrating=0;
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err);  } 
																	else { sendJsonResponse(res, 200,{"message":"API: Removed All Reviews Data"}); }   });}
								else  {sendJsonResponse(res,404,{"message":"API: No reviews to Remove"});}
								 } 
						 });

 }
 else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, provide locationID"});}

};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_SingleReviews=function(req, res) {
 
 if(req.params&&req.params.locationid&&req.params.reviewid)
 { 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){

						if (!location) { sendJsonResponse(res, 200,  {"message":"API: Location Data not found"});}
						  else if (err) {sendJsonResponse(res, 400, err);	} 
							else {
 if(location.reviews.id(req.params.reviewid))
							{location.reviews.id(req.params.reviewid).remove();
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err); }
																		
																	else { updateAverageRating(location._id);
																		sendJsonResponse(res, 200,{"message":"API: Removed Review Data"}); }   });}
										else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, Invalid ReviewID"});}
								 } 
						 });

 }
 else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, provide locationID / ReviewID"});}

};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_AllComments=function(req, res) {
 
 if(req.params&&req.params.locationid&&req.params.reviewid)
 { 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							 if (!location) { sendJsonResponse(res, 200,  {"message":"API: Location Data not found"});}
							else  if (!location.reviews.id(req.params.reviewid)) { sendJsonResponse(res, 200,  {"message":"API: Review Data not found"});}
							else if (err) { sendJsonResponse(res, 400, err);} 
							else {
                       if(location.reviews.id(req.params.reviewid).comments[0])
							{ location.reviews.id(req.params.reviewid).comments.forEach((element)=>{element.remove();});
														location.reviews.id(req.params.reviewid).commentnos=0;
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err); }
																		
																	else { 
																		sendJsonResponse(res, 200,{"message":"API: Removed All Comment Data"}); }   });}
														else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, No comments"});}
								 } 
						 });

 }
 else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, provide locationID / ReviewID"});}
};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_SingleComment=function(req, res) {
 
 if(req.params&&req.params.locationid&&req.params.reviewid&&req.params.commentid)
 { 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							if (!location) { sendJsonResponse(res, 200,  {"message":"API: Location Data not found"});}
							else  if (!location.reviews.id(req.params.reviewid)) { sendJsonResponse(res, 200,  {"message":"API: Review Data not found"});}
							else if (err) {	sendJsonResponse(res, 400, err); } 
							else {
 if(location.reviews.id(req.params.reviewid).comments.id(req.params.commentid))
							{location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).remove();
														location.reviews.id(req.params.reviewid).commentnos--;
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err); }
																		
																	else { 
																		sendJsonResponse(res, 200,{"message":"API: Removed Comment Data"}); }   });}
														else {sendJsonResponse(res,404,{"message":"API: Invalid Address, Invalid CommentID"});}
								 } 
						 });

 } 
 else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, provide locationID / ReviewID/ CommentID"});}

};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_AllReplies=function(req, res) {

	if(req.params&&req.params.locationid&&req.params.reviewid&&req.params.commentid)
 { 
  Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							if (!location) { sendJsonResponse(res, 200,  {"message":"API: Location Data not found"});}
							else  if (!location.reviews.id(req.params.reviewid)) { sendJsonResponse(res, 200,  {"message":"API: Review Data not found"});}
							else  if (!location.reviews.id(req.params.reviewid).comments.id(req.params.commentid)) { sendJsonResponse(res, 200,  {"message":"API: Comment Data not found"});}
							else if (err) {
							sendJsonResponse(res, 400, err);
							} 
							else {
 if (location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replies[0])
							{location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replies.forEach((element)=>{element.remove();});
														location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replynos=0;
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err); }
																		
																	else { 
																		sendJsonResponse(res, 204,{"message":"API: Removed All Replies Data"}); }   });}
									else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, No replies exist"});}					
								 } 
						 });

 }
 else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, provide locationID / ReviewID/ CommentID"});}
 
};
//-------------------------------------------------------------------------------------------------------------------------
module.exports.Delete_SingleReply=function(req, res) {

 if(req.params&&req.params.locationid&&req.params.reviewid&&req.params.commentid&&req.params.replyid)
 { 
 Loc.findById(req.params.locationid)
	.select('reviews')
	.exec(function (err,location){
							if (!location) { sendJsonResponse(res, 200,  {"message":"API: Location Data not found"});}
							else  if (!location.reviews.id(req.params.reviewid)) { sendJsonResponse(res, 200,  {"message":"API: Review Data not found"});}
							else  if (!location.reviews.id(req.params.reviewid).comments.id(req.params.commentid)) { sendJsonResponse(res, 200,  {"message":"API: Comment Data not found"});}
							else if (err) {
							sendJsonResponse(res, 400, err);
							} 
							else {
     if(location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replies.id(req.params.replyid))
							{location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replies.id(req.params.replyid).remove();
														location.reviews.id(req.params.reviewid).comments.id(req.params.commentid).replynos--;
														location.save((err,location)=>{
																	if (err) { sendJsonResponse(res, 400, err); }
																		
																	else { 
																		sendJsonResponse(res, 204,{"message":"API: Removed Reply Data"}); }   }); }
								 
	else {sendJsonResponse(res,404,{"message":"API: Invalid Address, Invalid ReplyID "}); }
						
                           }   });
   }
  else  {sendJsonResponse(res,404,{"message":"API: Invalid Address, provide locationID / ReviewID/ CommentID/ ReplyID"});}
 
};
//-------------------------------------------------------------------------------------------------------------------------

var sendJsonResponse=function (res,status,content) {
	res.status(status);
	res.json(content);
};
























