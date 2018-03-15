(function() {
	angular
		.module('Restfinder')
		.service('authentication', authentication);
	//	authentication.$inject = ['$window'];

	function authentication($window) {
		var saveToken = function(token) {
			$window.localStorage['Restfinder-token'] = token;
		};
		var getToken = function() {
			return $window.localStorage['Restfinder-token'];
		};

		var register = function(user) {
			return $http.post('/api/register', user)
				.then(function(data) {
					saveToken(data.token);
				}).catch(function(err) {
					console.log("Error", err);
				});
		};

		var login = function(user) {
			return $http.post('/api/login', user)
				.then(function(data) {
					saveToken(data.token);
				}).catch(function(err) {
					console.log("Error", err);
				});
		};

		var logout = function() {
			$window.localStorage.removeItem('Restfinder-token');
		};

		var isLoggedIn = function() {
			var token = getToken();
			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		var currentUser = function() {
			if (isLoggedIn()) {
				var token = getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return {
					email: payload.email,
					name: payload.name
				};
			}
		};


		return {
			saveToken: saveToken,
			getToken: getToken,
			login: login,
			register: register,
			logout: logout,
			isLoggedIn: isLoggedIn,
			currentUser: currentUser
		};



	}



})();