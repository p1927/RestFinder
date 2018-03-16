( function () {

angular
	.module('Restfinder')
	.service('Geolocation',Geolocation);

function Geolocation (){

 	var getPosition = function(Success,Error,Nosupport)
 	{
       if(navigator.geolocation)
       	{ navigator.geolocation.getCurrentPosition(Success, Error,{maximumAge:600000, timeout:5000, enableHighAccuracy: true} );
       	  }
       else Nosupport();
   
 	};
 	 return {getPosition : getPosition};
 };


})();