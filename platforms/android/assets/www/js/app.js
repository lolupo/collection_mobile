var app = angular.module('Collection', ['ngRoute', 'ui.bootstrap']);

/*
----- Services ---------
*/

//Route provider
app.config(function($routeProvider){
	$routeProvider
		.when('/', {templateUrl: 'partials/home-tuto.html'})
		//.when('/signin', {templateUrl: 'partials/signin.html'})
		//.when('/inscription', {templateUrl: 'partials/inscription.html'})
		.otherwise({redirectTo : '/'});

});

/*
----- Custom directives ---------
*/

//Owl carousel
app.directive('wrapOwlcarousel', function () {  
    
    return {  
        restrict: 'E',  
        link: function (scope, element, attrs) {  
            var options = scope.$eval($(element).attr('data-options'));  
            $(element).owlCarousel(options);  
        }  
    }; 

});  

/*
----- Controllers ---------
*/

//Modal controller
app.controller('ModalSignInCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'partials/signin.html',
      controller: 'ModalSignInInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});


//Modal instance controller
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
app.controller('ModalSignInInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

