( function () {

angular
	.module('Restfinder')
	.service('LocationListData',LocationListData);

function LocationListData ($http){

 var requestData= function (lng,lat,distance)
 {  return  $http.get("/api/locations/distance?lat="+lat+"&lng="+lng+"&distance="+distance);}; //this can be manipulated to crash server.
																								// no validation present in API

 return {requestData: requestData};

 };

 })();