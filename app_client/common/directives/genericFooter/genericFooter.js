( function () {

angular
	.module('Restfinder')
	.directive('genericFooter',genericFooter);

function genericFooter () { 

 return { 
 	restrict: 'EA',
	templateUrl: '/common/directives/genericFooter/footer.view.html'};
 };

 })();