							 /*  var reviews=location[0].reviews;
								   var found=false;
								   reviews.forEach( function(reviewelement,reviewindex) {  
								   console.log(reviewelement,reviewindex);
								   if (reviewelement._id==req.params.reviewid) { 
//=============================================================
								   reviewelement.comments.forEach( function(element,index) {  
								   console.log(element,index);
								   if (element._id==req.params.commentid) { 

								   	found=true;
				                   	element.replies.push({
																reply: req.body.reply,
																author: req.body.author
																									
					 			                    	});
				                   	element.replynos++;
		                            location[0].save((err,location)=>{
																if (err) { sendJsonResponse(res, 400, err);} 
																else { var thisreply=location.reviews[reviewindex].comments[index].replies[location.reviews[reviewindex].comments[index].replies.length-1];
																	   sendJsonResponse(res, 201, thisreply); }
															                                        });
							                                           } 
	                              
							                                        }); }  });
								   if(!found) {sendJsonResponse(res,404,{"message":"Invalid Address, no matching reviewID/commentID"});}*/
		// 				     	}

		// });
							

							/*Loc.find({_id:req.params.locationid})
	.select('reviews')
	.exec((err,location)=>{ 
							if (err) {
								sendJsonResponse(res, 400, err); return;
									} 
							else { var reviews=location[0].reviews;
								   var found=false;
								   reviews.forEach( function(element,index) {  
								   console.log(element,index);
								   if (element._id==req.params.reviewid) { 
								   	found=true;
				                   	element.comments.push({
																comment: req.body.comment,
																author: req.body.author
																									
					 			                    	});
				                   	element.commentnos++;
		                            location[0].save((err,location)=>{
																if (err) { sendJsonResponse(res, 400, err);} 
																else { var thiscomment=location.reviews[index].comments[location.reviews[index].comments.length-1];
																	   sendJsonResponse(res, 201, thiscomment); }
															                                        });
							                                           } 
	                              
							                                        });
								   if(!found) {sendJsonResponse(res,404,{"message":"Invalid Address, no matching reviewID"});}
						     	}

		});*/

		/*Loc.find({"_id":"req.params.locationid","reviews._id":"req.params.reviewid","reviews.comments._id":"req.params.commentid"},{"reviews.comments.replies":0})// not working add line for reviewid.
	.select('reviews')
	.exec((err,reviews)=>{*/

		/*Loc.find({"_id":"req.params.locationid","reviews._id":"req.params.reviewid"})
		.select('reviews')
		.exec((err,reviews)=>{*/


			/*Loc.find({"_id":"req.params.locationid","reviews._id":"req.params.reviewid"},{"reviews.comments":0})// not working add line for reviewid.
	.select('reviews')
	.exec((err,reviews)=>{
		if(!reviews)
			{sendJsonResponse(res,200,{"Result":"Not Found"}); return;}
		else if (err) 
			{sendJsonResponse(res,200,err); return;}
		else
			{sendJsonResponse(res,200,reviews);}
	});*/

	
/*	var theEarth=function(){

    	var earthRadius=6371; //km
    	var getDistanceFromRads = function(rads) {
			return parseFloat(rads * earthRadius);
			};
		var getRadsFromDistance = function(distance) {
			return parseFloat(distance / earthRadius);
			};
		return {
			getDistanceFromRads : getDistanceFromRads,
			getRadsFromDistance : getRadsFromDistance};
    }();	       
    var geoOptions={ spherical:true,
    				 num:10,
    				 maxDistance: theEarth.getRadsFromDistance(parseFloat(req.query.distance))};
*/
   
 /*   Loc.geoNear(point, geoOptions, (err,results,stats)=>{
	if(err){sendJsonResponse(res,404,err); return;}
	var locations=[];
	results.forEach( function(doc) {
	// statements
	locations.push({
					distance: theEarth.getDistanceFromRads(doc.dis),
					name: doc.obj.name,
					address: doc.obj.address,
					avgrating: doc.obj.avgrating,
					facilities: doc.obj.facilities,
					openinghrs: doc.obj.openinghrs,
					_id: doc.obj._id

	 				});
			});
	sendJsonResponse(res,200,locations);

    });*/

     }, function(){ $(this).attr('src','/images/favorite1.png');