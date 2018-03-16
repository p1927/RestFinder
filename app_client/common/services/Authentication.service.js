(function() {

	angular
		.module('Restfinder')
		.service('authentication', authentication);
	//	authentication.$inject = ['$window'];

	function authentication($window, $http) {
		 
		var saveToken = function(token) {
			$window.localStorage['Restfinder-token'] = token;
		};
		var getToken = function() {
			return $window.localStorage['Restfinder-token'];
		};

		var register = function(user) {
			console.log("register service", user);
			return $http.post('/api/register', user)
				.then(function(res) { console.log(res);
					saveToken(res.data.token);
				});
		};

		var login = function(user) {
			return $http.post('/api/login', user)
				.then(function(res) {console.log(res);
					saveToken(res.data.token);
				}); //error not handeled passed to calling function
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