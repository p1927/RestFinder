( function () {

angular
	.module('Restfinder')
	.service('Geolocation',Geolocation);

function Geolocation (){

 	var getPosition = function(Success,Error,Nosupport)
 	{
       if(navigator.geolocation)
       	{ navigator.geolocation.getCurrentPosition(Success, Error);
       	  }
       else Nosupport();
   
 	};
 	 return {getPosition : getPosition};
 };


})();