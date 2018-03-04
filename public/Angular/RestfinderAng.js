angular.module('RestfinderAng',[]);

var myController= function ($scope) {
$scope.myInput="world!";

};




var locationListCtrl= function ($scope,RestData) {
 $scope.message="Searching for places nearby!";
   RestData
     .then( function (res){ 
     	console.log(res);
     	$scope.data=res;
     	if(res.data instanceof Array) 
     {	if (res.data.length)
     	{console.log(2);
     	     	$scope.data.locations=res.data;
     	          $scope.message="";}
     	          else $scope.data.message="No nearby places found.";}

      else $scope.message="API Lookup Error";

     },function (err){
     	console.log(err);
     	$scope.message="Something went wrong!";
     });

  };

	 

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


var rating=function () { 

 return { 
	scope:{ thisRating: '=avgrating',
               size: '=size' },
	templateUrl: '/Angular/rating.html'};
 };

var RestData=function ($http){

return $http.get('/api/locations/distance?lat=17.42&lng=78.34&distance=19000');


 };


angular
	.module('RestfinderAng')
	.controller('locationListCtrl', locationListCtrl)
	.filter('filterdistance',filterdistance)
	.directive('rating',rating)
	.service('RestData',RestData);



 /*[{"_id":"5a9652ea2ffd36391ce572f5",
"name":"Barbeque Nation","avgrating":2,
"distance":15800,
"address":"Barbeque Nation, Nanakramaguda Road, Beside Wipro Lake, Financial District, Gachibowli, Hyderabad",
"facilities":["Cold Drinks","Zuchinni","Cappuchinos"]},{

"_id":"5a8fc0c042781261fc958882",
"name":"BillBay","avgrating":4,
"distance":12800,
"address":"Billbay, Nanakramaguda Road, Beside Wipro Lake, Financial District, Gachibowli, Hyderabad",
"facilities":["Cold Drinks","Zuchinni","Cappuchinos"]*/


	

/*"_id":"5a9652ea2ffd36391ce572f5",
"name":"Barbeque Nation",
"tagline":"Find places to work with wifi near you!",
"avgrating":2,
"distance":"15.8 km",
"address":"Barbeque Nation, Nanakramaguda Road, Beside Wipro Lake, Financial District, Gachibowli, Hyderabad",
"openinghrs":["Monday - Friday : 7:00am - 7:00pm","Saturday : 8:00am - 5:00pm","Sunday : closed"],
"facilities":["Cold Drinks","Zuchinni","Cappuchinos"],
"email":"99pratyush@gmail.com",
"website":"www.google.com",
"telephone":"+91-9639217588"
"reviews":[],
"coords":[78.343997,17.424077] */