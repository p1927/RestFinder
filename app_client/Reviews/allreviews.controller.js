( function () { 

angular.module('Restfinder')
       .controller('AllReviewCtrl', AllReviewCtrl);

function AllReviewCtrl ($scope,$routeParams,LocationData) { 
         var vm = this;

vm.addtoggle=[];
vm.chattoggle=[];

         vm.locationid=$routeParams.locationid;
         vm.message="Loading Data";

			   LocationData.AllReviewsData(vm.locationid)  
			     .then( function (res){ 
			     	if(res.data instanceof Array) 
			        {		
			     	if (res.data.length)
					    {     vm.location=res.data[0];
					    	  vm.message=""; }
				        }
			      else vm.message="API Lookup Error"; //location Id not found or error in searching

			       }, 
			       function (err){ 
			     	console.log(err);
			     	vm.message=err.data.message; // invalid location id
			     });
		
vm.likebutton= function ($event,entity) {     //like put request
   var element = $($event.currentTarget);
   if (element.attr("class") == "img-swap") { 

	     $.ajax({ 
			      url: "/api/locations/"+element.attr("id")+"/upvotes",
			      type: "PUT",
			       data: { increment: 1 },
			      cache: false,
			      success: (res)=>{  console.log("Like");
			                         element.attr("src", element.attr("src").replace("_off","_on"));
			                        
			                       $scope.$apply( entity.upvotes++);

			                         },
			       error: function (error) { alert(error.responseText);  }
	      });
	  } 
	else {

		 $.ajax({ 
			      url: "/api/locations/"+element.attr("id")+"/upvotes",
			      type: "PUT",
			       data: { increment: 0 },
			      cache: false,
			      success: (res)=>{  console.log("Unlike");
			                         element.attr("src", element.attr("src").replace("_on","_off"));
			                        $scope.$apply( entity.upvotes--);


			                         },
			       error: function (error) { alert(error.responseText);  }
			      });

  
    }
   element.toggleClass("on");
 };

vm.postcomment=function($event,entity) {
    var element = $($event.currentTarget);
    var ids=element.attr('class').split(/commentpost|,/);
    var locationid=ids[1];
    var reviewid=ids[2]; ////////////////get location id review id

    var main=element.parents("div.boxzoom1");   // get textbox
	var textbox=main.find("textarea.addcomment");
 	var comment=textbox.val();
    var author="Log User";
	
     
     $.ajax({ 
      url: "/api/locations/"+locationid+"/"+reviewid+"/comment",
      type: "POST",
       data: { author: author,
               comment: comment},
      cache: false,
      success: (res)=>{  
      	                 entity.comments.push(res);
                         entity.commentnos++;
                        
                         textbox.val("");
                         vm.addtoggle=false;
                          $scope.$apply();
                 	  
             },
       error: function (error) { 
           alert(error.responseText);
      }
      }); //add comment button post
};


vm.recentreviewfilter=function($event){ // //filter based on recent review
    var element = $($event.currentTarget);
  var heading=element.find("div.recentreviewheading");
  var head=heading.text().trim();
  $("#filter").val(head);
  $("#filter").trigger('input');
};



			 } 

})();