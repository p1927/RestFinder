(function() {

	angular.module('ui.bootstrap')
		.controller('AddReviewCtrl', AddReviewCtrl);

	function AddReviewCtrl($uibModalInstance, LocationData, SingleControllerData) {
		var vm = this;
		var locationdata = SingleControllerData;
		vm.name = locationdata.locationName;
		vm.formData = {};
		vm.modal = {

			submit: function() {

				vm.formMessage = "";

				if (!vm.formData || !vm.formData.review || !vm.formData.rating || !vm.formData.reviewtitle) {
					vm.formMessage = "All fields required, please try again";
					return false;
				} 
				else 
				{
					vm.formData.author = locationdata.user;
					LocationData.AddReview(locationdata.locationid,vm.formData)
		 					.then( function (res){  
		 						vm.formMessage = 'Successfully Posted';
		 						vm.modal.close(res.data);}, 
			                       function (err){  vm.formMessage=err.data.message;  }
			                     );// invalid location id
			    	return false;
				}

			},
			close : function (result) {
				$uibModalInstance.close(result);
			},
			cancel: function() {
				$uibModalInstance.dismiss('cancel');
			}
		};

		vm.setrating = function(rating) { //set rating

			for (var i = 1; i < 6; i++) {
				if (i <= rating) {
					$('#' + i).attr('src', '/images/favorite.png');
				} else {
					$('#' + i).attr('src', '/images/favorite1.png');
				}
			}
			vm.formData.rating = rating;


		};
	}

})();