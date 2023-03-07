(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {
  $scope.name = "Eldan";
  $scope.sayHello = function () {
      return "Hello Coursera!";
  };
});

})();
