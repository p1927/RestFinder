(function() {

  angular.module('Restfinder')
    .controller('NavigatorCtrl', NavigatorCtrl);

  function NavigatorCtrl($scope, authentication, $location) {
    var vm = this;

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
      vm.currentPath = $location.path();
      
     if(vm.currentPath==='/locations')
      {$('#navlocation').addClass('d-md-none d-lg-block d-sm-block');}
    else $('#navlocation').removeClass('d-md-none d-lg-block d-sm-block');

      $('li.nav-item').each(function() {
        var anchor = $(this).children('a');
        if (anchor.attr('href') === ($location.path()))
          $(this).addClass('active');
        else $(this).removeClass('active');
      });


    }, true);


    vm.logout = function() {
      authentication.logout();
      $location.path('/');
    };

  }

})();