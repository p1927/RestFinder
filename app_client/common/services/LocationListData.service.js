(function() {

	angular
		.module('Restfinder')
		.service('LocationData', LocationData);


	function LocationData($http,authentication) {

		var ListData = function(lng, lat, distance) {
			return $http.get("/api/locations/distance?lat=" + lat + "&lng=" + lng + "&distance=" + distance);
		}; //this can be manipulated to crash server.

		var SingleLocationData = function(locationid) {
			return $http.get("/api/locations/" + locationid);
		};

		var AllReviewsData = function(locationid) {
			return $http.get("/api/locations/" + locationid + "/review");
		};

		var AddReview = function(locationid, data) {
			return $http.post('/api/locations/' + locationid + '/review', data, {
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
			});
		};

		/*var DeleteReview = function(locationid,reviewid) {
			return $http.delete('/api/locations/' + locationid + '/'+reviewid, {
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
			});
		};*/

		var AddComment = function(locationid,reviewid, data) {
			return $http.post( "/api/locations/" + locationid + "/" + reviewid + "/comment", data, {
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
			});
		};

	/*	var DeleteComment = function(locationid,reviewid,commentid) {
			return $http.delete( "/api/locations/" + locationid + "/" + reviewid + "/"+commentid, {
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
			});
		};*/

		// no validation present in API

		return {
			ListData: ListData,
			SingleLocationData: SingleLocationData,
			AllReviewsData: AllReviewsData,
			AddReview: AddReview,
			AddComment:AddComment/*,
			DeleteReview: DeleteReview,
			DeleteComment:DeleteComment*/

		};

	}



})();