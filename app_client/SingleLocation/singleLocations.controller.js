( function () { 

angular.module('Restfinder')
       .controller('SinglelocationCtrl', SinglelocationCtrl);

function SinglelocationCtrl ($scope,$routeParams,LocationData,$uibModal,$location) { 
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




vm.AddReview=function (){ 

	var modalInstance = $uibModal.open({
		templateUrl: '/AddReviewModal/AddReviewModal.view.html',
		controller: 'AddReviewCtrl',
		 controllerAs: 'vm' 
     });
};			

vm.reviewredirect= function(locationid,reviewtitle){  //single location review redirect to all reviews
 
  $("#filter").val(reviewtitle);
  $("#filter").trigger('input');
  $location.path('/locations/'+locationid+'/reviews');
  };


 }

})(); //IIFE