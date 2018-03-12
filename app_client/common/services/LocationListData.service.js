( function () {

angular
	.module('Restfinder')
	.service('LocationData',LocationData);


function LocationData ($http){

 var ListData= function (lng,lat,distance)
 {  
 return  $http.get("/api/locations/distance?lat="+lat+"&lng="+lng+"&distance="+distance);}; //this can be manipulated to crash server.

 var SingleLocationData= function (locationid)
 {  return  $http.get("/api/locations/"+locationid);};	

  var AllReviewsData= function (locationid)
 {  return  $http.get("/api/locations/"+locationid+"/review");};	

 																							// no validation present in API

 return {ListData: ListData,
         SingleLocationData : SingleLocationData,
         AllReviewsData : AllReviewsData };

 }




 })();