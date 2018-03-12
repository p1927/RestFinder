( function () {

angular.module('ui.bootstrap')
       .controller('AddReviewCtrl', AddReviewCtrl);

function AddReviewCtrl () {
        var vm=this;
        vm.author="Pratyush";
        vm.name="Billbybat";
 vm.ok=function (){};
  vm.cancel=function (){};


  }

})();