( function () {

angular
	.module('Restfinder')
	.directive('rating',rating);

function rating () { 

 return { 
 	restrict: 'EA',
	scope:{ 
		thisRating: '=avgrating',
        size: '=size' },
	templateUrl: '/common/directives/RatingStars/rating.html'};
 };

 })();