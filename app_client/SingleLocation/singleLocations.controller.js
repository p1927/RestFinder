( function () { 

angular.module('Restfinder')
       .controller('SinglelocationCtrl', SinglelocationCtrl);

function SinglelocationCtrl ($scope,$routeParams,LocationData,$uibModal) { 
         var vm = this;
         vm.locationid=$routeParams.locationid;
         vm.message="Loading Data";
         
	     LocationData.SingleLocationData(vm.locationid)  
			     .then( function (res){ 
			     	if(res.data instanceof Array) 
			        {		
			     	if (res.data.length)
					    {     vm.location=res.data[0];
					    	  vm.message="";
					    	 
					    	   }
				        }
			      else vm.message="API Lookup Error"; //location Id not found or error in searching

			       }, 
			       function (err){ 
			     	console.log(err);
			     	vm.message=err.data.message; // invalid location id
			     });

         vm.deleteoptions=function ($event) { 
		     $($event.currentTarget).find('.badge').toggle(); 
	         };
         vm.deletecancel=function ($event) {
	      $($event.currentTarget).find('.badge').hide();   
           };

         vm.deleteconfirm=function ($event) { 
			 var reviewid=$($event.currentTarget).attr('id').split("delete")[1];
		     var locationid=$(location).attr('href').split('/')[4];
		     
		     $.ajax({ 
		      url: '/api/locations/'+locationid+'/'+reviewid,
		      type: "DELETE",
		      cache: false,
		      success: function (res){ console.log(res);
		      	console.log("Removed Review"+res.message);
		     $($event.currentTarget).parents(".row.reviews")[0].remove(); 
		                    
		             }
		      });
		          };


vm.AddReview=function (){ 

	var modalInstance = $uibModal.open({
		templateUrl: '/AddReviewModal/AddReviewModal.view.html',
		controller: 'AddReviewCtrl',
		 controllerAs: 'vm' 
});
};			

 }

})(); //IIFE