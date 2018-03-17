(function() {

	angular.module('Restfinder')
		.controller('SinglelocationCtrl', SinglelocationCtrl);

	function SinglelocationCtrl($scope, $routeParams, LocationData, $uibModal, $location, authentication, Geolocation) {
		var vm = this;
		vm.locationid = $routeParams.locationid;
		vm.message = "Loading Data";

		LocationData.SingleLocationData(vm.locationid)
			.then(function(res) {
					if (res.data instanceof Array) {
						if (res.data.length) {
							vm.location = res.data[0];
							vm.message = "";

							Geolocation.getPosition(vm.getmap, vm.showError, vm.noGeo);

						}
					} else vm.message = "API Lookup Error"; //location Id not found or error in searching

				},
				function(err) {
					console.log(err);
					vm.message = err.data.message; // invalid location id
				});



		vm.AddReview = function() {

			var modalInstance = $uibModal.open({
				templateUrl: '/AddReviewModal/AddReviewModal.view.html',
				controller: 'AddReviewCtrl',
				controllerAs: 'vm',
				resolve: {
					SingleControllerData: function() {
						return {
							locationid: vm.location._id,
							locationName: vm.location.name,
							user: "Logged user"
						};
					}
				}

			}).result.then(function(data) {
					vm.location.reviews.push(data);
				},
				function(cancel) {});


		};

		vm.reviewredirect = function(locationid, reviewtitle) { //single location review redirect to all reviews

			$("#filter").val(reviewtitle);
			$("#filter").trigger('input');
			$location.path('/locations/' + locationid + '/reviews');
		};

		 $scope.$watch(function() {
      return authentication.isLoggedIn();
    }, function() {
      vm.LoggedIn = authentication.isLoggedIn();
    }, true);

    $scope.$watch(function() {
      return authentication.currentUser();
    }, function() {
      vm.user = authentication.currentUser();
    }, true);

    $scope.$watch(function() {
      return $location.path();
    }, function() {
      vm.currentPath = $location.path();},true);
		
		vm.getmap = function(position) { //This gets the users current location
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			var accuracy = position.coords.accuracy;
			var coords = new google.maps.LatLng(latitude, longitude);
			var destination = vm.location.coords;
			var destinationcoords = new google.maps.LatLng(parseFloat(destination[1]), parseFloat(destination[0])); //Creates variable for map coordinates

			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();

			var mapOptions = //Sets map options
				{
					zoom: 15, //Sets zoom level (0-21)
					center: destinationcoords, //zoom in on users location
					mapTypeControl: true, //allows you to select map type eg. map or satellite
					navigationControlOptions: {
						style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
					},
					mapTypeId: google.maps.MapTypeId.ROADMAP //sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
				};
			map = new google.maps.Map(document.getElementById("frame"), mapOptions); //Creates a new map using the passed optional parameters in the mapOptions parameter.
			directionsDisplay.setMap(map);
			directionsDisplay.setPanel(document.getElementById('frame'));
			var request = {
				origin: coords,
				destination: destinationcoords,
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};

			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				} else {
					$("#directionmessage").html("Are you kidding? Mom is not going to allow us that far! I dont even know the directions.");
				}
			});

		};

		vm.showError = function(error) {
			$scope.$apply(function() {
				vm.message = error.message;
			});
		};

		vm.noGeo = function() {
			$scope.$apply(function() {
				vm.message = "Geolocation not supported by this browser.";
			});
		};



	}



})(); //IIFE