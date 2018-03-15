( function () {

angular.module('Restfinder',['ngRoute','ui.bootstrap']);  //setter 

function config($routeProvider,$locationProvider)
{ 
		$routeProvider
					.when ('/',{
		                   templateUrl: 'home/home.view.html'})
					.when ('/about',{
		                   templateUrl: 'home/about.view.html'})
					.when ('/locations',{
			               templateUrl: 'locations/locations.view.html',
			               controller: 'locationListCtrl',
			               controllerAs: 'vm' })
					.when ('/locations/:locationid/',{
			               templateUrl: 'SingleLocation/singleLocations.view.html',
			               controller: 'SinglelocationCtrl',
			               controllerAs: 'vm' })
					.when ('/locations/:locationid/reviews',{
			               templateUrl: 'Reviews/allreviews.view.html',
			               controller: 'AllReviewCtrl',
			               controllerAs: 'vm' })
					.when ('/register',{
			               templateUrl: 'Auth/Register/register.view.html',
			               controller: 'RegisterCtrl',
			               controllerAs: 'vm' })
		/*			.when ('/login',{
			               templateUrl: 'Auth/Login/login.view.html',
			               controller: 'LoginCtrl',
			               controllerAs: 'vm' })*/
					.otherwise({redirectTo: '/'});

	/*	$locationProvider.html5Mode({
			  enabled: true,
              requireBase: false
		});*/
		 $locationProvider.html5Mode(true);
   // $locationProvider.hashPrefix('!');
}

angular.module('Restfinder')
       .config(['$routeProvider','$locationProvider',config]);

})();