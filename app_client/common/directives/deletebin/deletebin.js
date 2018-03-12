( function () {

angular
	.module('Restfinder')
	.directive('deletebin',deletebin);

function deletebin () { 

 return { 
 	restrict: 'E',
 	scope: {id: '=entityid'},
 	controller: deletebinCtrl,
	templateUrl: '/common/directives/deletebin/deletebin.view.html'};
 };


 function deletebinCtrl () {
 	
 };

 })();