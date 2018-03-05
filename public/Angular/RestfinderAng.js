angular.module('RestfinderAng',[]);


////////////////////////////////////////////////////////////////////////////////////Controller All LOCATIONS
var locationListCtrl= function ($scope,LocationListData,Geolocation) {
         $scope.message="Checking your location";

		 $scope.getData= function (position)                           //defining functions to be passed
			{ $scope.message="Searching for places nearby!";
			var lat = position.coords.latitude,
                lng = position.coords.longitude;
                console.log(lat,lng);
			   LocationListData.requestData(lng,lat,2000000)
			     .then( function (res){ 
			     	$scope.data=res;
			      if(res.data instanceof Array) 
			        {		
			     	if (res.data.length)
				    {     $scope.data.locations=res.data;
				          $scope.message=""; }
				    else  $scope.message="No nearby places found.";
				    }
			      else $scope.message="API Lookup Error";} ,function (err){
			     	console.log(err);
			     	$scope.message="Something went wrong!";
			     });};

		  $scope.showError = function (error) {
				$scope.$apply(function() {
				$scope.message = error.message; });
				};

	     $scope.noGeo = function () {
				$scope.$apply(function() {
				$scope.message = "Geolocation not supported by this browser."; 	});
				};
		 Geolocation.getPosition($scope.getData,$scope.showError,$scope.noGeo);
};

 var Geolocation =function (){

 	var getPosition = function(Success,Error,Nosupport)
 	{
       if(navigator.geolocation)
       	{ navigator.geolocation.getCurrentPosition(Success, Error);}
       else Nosupport();
   
 	};
 	 return {getPosition : getPosition};
 };

////////////////////////////////////////////////////////////////////////////////////Controller SINGLE LOCATION
var SinglelocationCtrl= function ($scope,Geolocation) {



}; 


////////////////////////////////////////////////////////////////////////////////////FILTER FOR DISTANCE
var isNumeric = function(n) {
	  if (!isNaN(parseFloat(n))&& isFinite(n))
	  	{ return true;}
	  	   return false;
	 };

var filterdistance= function (){return function(distance) {
	var numdist,unit;
	if (distance&&isNumeric(distance))
		{ if (distance>1000)
		{ numdist=parseFloat(distance/1000).toFixed(1);
		  unit=' km';}
		else  {
			numdist=parseFloat(distance).toFixed(0);
		  unit=' m';
		 }
		 return numdist+unit;
		}
		else return "?";
 
 

 };};

///////////////////////////////////////////////////////////////////////////////////RATING SNIPPET
var rating=function () { 

 return { 
	scope:{ thisRating: '=avgrating',
               size: '=size' },
	templateUrl: '/Angular/rating.html'};
 };
/////////////////////////////////////////////////////////////////////////////////REQUEST FOR LOCATION DATA LIST API
var LocationListData=function ($http){

 var requestData= function (lng,lat,distance)
 {  return  $http.get("/api/locations/distance?lat="+lat+"&lng="+lng+"&distance="+distance);}; //this can be manipulated to crash server.
																								// no validation present in API

 return {requestData: requestData};

 };

/////////////////////////////////////////////////////////////////////////////////REQUEST FOR DATA SINGLE LOCATION API
/*var SingleLocationData=function ($http){

 var requestData= function (locationid)
 {  return  $http.get("/api/locations/"+locationid+"/");};                               //this can be manipulated to crash server.
																								// no validation present in API

 return {requestData: requestData};

 };*/
//////////////////////////////////////////////////////////////////////////////////////FILTER FOR DISTANCE
angular
	.module('RestfinderAng')
	.controller('locationListCtrl', locationListCtrl)
	.controller('SinglelocationCtrl', SinglelocationCtrl)
	.filter('filterdistance',filterdistance)
	.directive('rating',rating)
	.service('LocationListData',LocationListData)
	//.service('SingleLocationData',SingleLocationData)
	.service('Geolocation',Geolocation);



