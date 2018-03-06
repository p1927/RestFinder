( function () {

angular
	.module('Restfinder')
	.filter('filterdistance',filterdistance);

var isNumeric = function(n) {
	  if (!isNaN(parseFloat(n))&& isFinite(n))
	  	{ return true;}
	  	   return false;
	 };

function filterdistance  (){return function(distance) {
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

 })();