( function () {

angular
	.module('Restfinder')
	.directive('navigator',navigator);

function navigator () { 

 return { 
 	restrict: 'EA',
 	templateUrl: '/common/directives/Navigator/navigator.view.html',
	controller: 'NavigatorCtrl as navm'
  };
 }

 })();