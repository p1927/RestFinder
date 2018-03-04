angular.module('RestfinderAng',[]);



var locationListCtrl= function ($scope,RestData,Geolocation) {
         $scope.message="Checking your location";

		 $scope.getData= function (position)                           //defining functions to be passed
			{ $scope.message="Searching for places nearby!";
			var lat = position.coords.latitude,
                lng = position.coords.longitude;
			   RestData.requestData(lng,lat,20000)
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
/////////////////////////////////////////////////////////////////////////////////REQUEST FOR DATA LOCATION API
var RestData=function ($http){

 var requestData= function (lng,lat,distance)
{  return  $http.get("/api/locations/distance?lat="+lat+"&lng="+lng+"&distance="+distance);}; //this can be manipulated to crash server.
																								// novalidation present in API

return {requestData: requestData};

 };

//////////////////////////////////////////////////////////////////////////////////////FILTER FOR DISTANCE
angular
	.module('RestfinderAng')
	.controller('locationListCtrl', locationListCtrl)
	.filter('filterdistance',filterdistance)
	.directive('rating',rating)
	.service('RestData',RestData)
	.service('Geolocation',Geolocation);



