( function () {

angular.module('ui.bootstrap')
       .controller('AddReviewCtrl', AddReviewCtrl);

function AddReviewCtrl ($uibModalInstance) {
        var vm=this;
        vm.author="Pratyush";
        vm.name="Billbybat";
 vm.modal={

 	submit: function (){},
    cancel: function (){ $uibModalInstance.dismiss('cancel');}
};


  }

})();