(function() {

	angular.module('Restfinder')
		.controller('RegisterCtrl', RegisterCtrl);

	function RegisterCtrl($location, authentication) { 
		var vm = this;
		vm.formError = "Let's get started!  ";

		vm.credentials = {
			name: "",
			email: "",
			password: ""
		};

		vm.returnPage = $location.search().page || '/';

		vm.onSubmit = function() { 

			console.log(vm.credentials);
			if (!vm.credentials.email || !vm.credentials.password) {
				vm.formError = "All fields required, please try again";
				return false;
			} else {
				if (vm.credentials.name)
					vm.doRegister();
				else vm.doLogin();
			}
		};


		vm.doRegister = function() {
			console.log("register");
			authentication
				.register(vm.credentials)
				.then(function() {
					$location.search('page', null);
					$location.path(vm.returnPage);
				}, function(err) {

					vm.formError = "API: Something went wrong!";


				});
		};

		vm.doLogin = function() {
			console.log("login");
			authentication
				.login(vm.credentials)
				.then(function() {
					$location.search('page', null);
					$location.path(vm.returnPage);
				}, function(err) {
					if (err.data.message) {
						console.log(err.data.message);
						vm.formError = "Are you sure you registered first?";
						$("#plogintoregister").text('Invalid E-mail or Password');
					} else vm.formError = "API: Something went wrong!";
				});
		};



	}

})();