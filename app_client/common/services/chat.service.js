(function() {

	angular
		.module('Restfinder')
		.service('chat', chat);
	

	function chat($window, $http) {

		var post = function(data) {
			return $http.post('/chatapi/post', data)
				.then(function(res) {
					return res;
				});
		};


		var getchat = function(room) {
			return $http.get('/chatapi/'+ room)
				.then(function(res) {
					return res;
				});
		};



		return {
			post: post,
			getchat: getchat

		};



	}






})();