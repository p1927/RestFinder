( function () {

angular.module('Restfinder')
       .controller('locationListCtrl', locationListCtrl);

function locationListCtrl ($scope,LocationData,Geolocation) {
         var vm = this;
         
         vm.message="Checking your location";

		 vm.getData= function (position)                           //defining functions to be passed
			{ vm.message="Searching for places nearby!";
			var lat = position.coords.latitude,
                lng = position.coords.longitude;
               // console.log(lat,lng);
			   LocationData.ListData(lng,lat,2000000)
			     .then( function (res){ 
			     	vm.data=res;
			     	
			      if(res.data instanceof Array) 
			        {		
			     	if (res.data.length)
				    {     vm.data.locations=res.data;
				    	  vm.message=""; }
				    else  vm.message="No nearby places found.";
				    }
			      else vm.message="API Lookup Error";} ,function (err){
			     	console.log(err);
			     	vm.message="Something went wrong!";
			     });};

		  vm.showError = function (error) {
				$scope.$apply(function() {
				vm.message = error.message; });
				};

	     vm.noGeo = function () {
				$scope.$apply(function() {
				vm.message = "Geolocation not supported by this browser."; 	});
				};
		 Geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);
		 
}

})();