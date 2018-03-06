( function () {

angular.module('Restfinder',['ngRoute']);  //setter 

function config($routeProvider)
{ 
$routeProvider
			.when ('/',{
               templateUrl: 'home/home.view.html'})
			.when ('/locations',{
               templateUrl: 'locations/locations.view.html',
               controller: 'locationListCtrl',
               controllerAs: 'vm'
			})
			.otherwise({redirectTo: '/'});

}

angular.module('Restfinder')
       .config(['$routeProvider',config]);

})();