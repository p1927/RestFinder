( function () {

angular.module('Restfinder')
       .controller('locationListCtrl', locationListCtrl);

function locationListCtrl ($scope,LocationData,Geolocation,$location) {
         var vm = this;
         var distance=$location.search().distance;

         if (!distance) {distance=2000000;}
         console.log("Distance here can cause problem");
         vm.message="Checking your location";

		 vm.getData= function (position)                           //defining functions to be passed
			{ vm.message="Searching for places nearby!";
			var lat = position.coords.latitude,
                lng = position.coords.longitude;
               // console.log(lat,lng);
               var lat=17;
               var lng=78;
			   LocationData.ListData(lng,lat,distance)
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
	

vm.facilitiesfilter=function($event){        //facilities filter
	  var content=$($event.currentTarget).text().trim();
	  $("#filter").val(content);
	  $("#filter").trigger('input');
           };	 

 vm.distancefilter=function($event){                   // orange button filter
 	 var content=$($event.currentTarget).text().split(" ");
 	 var setvalue;
 	 if (content[2]=='km'){ setvalue=1000*parseFloat(content[1]) + 100;}
 	 else setvalue=parseFloat(content[1]) + 100;
 

     $location.path('/locations').search({distance: setvalue});
           };

 vm.allocation=function(){    //All button
     
      $("div.col-xs-12.col-sm-8").children('*').show();
      $("div.col-xs-12.col-sm-8").children('#rendered-form').hide();
      $("#filter").val("");
	  $("#filter").trigger('input');      
      $location.path('/locations').search({}); 
      
    
     };

vm.distanceinputfilter= function(){ //select  input distance filter

       $(".distance").toggle();  
      var setvalue= $(".distance").val();             
      if (setvalue)
      {  $location.path('/locations').search({distance: setvalue}); } 
                   };



vm.postlocationsubmit=function(){                  //Submit Location
     
     $.ajax({ 
      url: "/api/locations",
      type: "POST",
       data: $("#rendered-form").serialize(),
      cache: false,
      success: (res)=>{  
      	$location.path('/locations/'+res._id+'/');
                 $scope.$apply();
             },
       error: function (error) { 
           alert(error.responseText);
      }
      });
      };




  }

})();