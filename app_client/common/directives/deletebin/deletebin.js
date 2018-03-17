(function() {

	angular
		.module('Restfinder')
		.directive('deletebin', deletebin)
		.controller('deletebinCtrl', deletebinCtrl);

	function deletebin() {

		return {
			restrict: 'EA',

			scope: {
				locationid: '@',
				size: '@',
				grandfather: '=',
				unit: '=',
				reviewid: '@',
				commentid: '@'
			},
			controller: 'deletebinCtrl',
			templateUrl: '/common/directives/deletebin/deletebin.view.html'
		};
	}


	function deletebinCtrl($scope,authentication) {

		$scope.deleteconfirm = function($event) { 
			var grandfather=$scope.grandfather;
			var unit=$scope.unit;
			var array;
			var url;
			if ($scope.commentid) {
				url = '/api/locations/' + $scope.locationid + '/' + $scope.reviewid + '/' + $scope.commentid;
			} else url = '/api/locations/' + $scope.locationid + '/' + $scope.reviewid;



			$.ajax({
				url: url,
				type: "DELETE",
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				},
				cache: false,
				success: function(res) {
					
					console.log("Removed " + res.message);
					if (!$scope.commentid) {
						$($event.currentTarget).parents(".row.reviews")[0].remove();
						array = grandfather.reviews;
					} else {
						$($event.currentTarget).parents(".row.commenttoggle")[0].remove();
						array = grandfather.comments;
						grandfather.commentnos--;
					}
					array.splice(array.indexOf(unit), 1);
					$scope.$apply();
				},
				error: function(error) {
					alert(error.responseText);
				}
			});
		};


	}

})();