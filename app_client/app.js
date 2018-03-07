( function () {

angular.module('Restfinder',['ngRoute']);  //setter 

function config($routeProvider,$locationProvider)
{ 
		$routeProvider
					.when ('/',{
		                   templateUrl: 'home/home.view.html'})
					.when ('/locations',{
			               templateUrl: 'locations/locations.view.html',
			               controller: 'locationListCtrl',
			               controllerAs: 'vm' })
					.when ('/locations/:locationid',{
			               templateUrl: 'SingleLocation/singleLocations.view.html',
			               controller: 'SinglelocationCtrl',
			               controllerAs: 'vm' })
					.otherwise({redirectTo: '/'});

		$locationProvider.html5Mode({
			  enabled: true,
              requireBase: true
		});
}

angular.module('Restfinder')
       .config(['$routeProvider','$locationProvider',config]);

})();