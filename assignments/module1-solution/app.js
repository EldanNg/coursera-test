(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = '';

  $scope.getStyle = function () {
    var style = {};
    if ($scope.message === "Enjoy!" || $scope.message === "Too much!") {
      style.color = "green";
      style.border = "1px solid green";
    } else if ($scope.message === "Please enter data first") {
      style.color = "red";
      style.border = "1px solid red";
    }
    return style;
  };

  $scope.checkDishes = function () {
    if (!$scope.dishes || $scope.dishes.trim() === '') {
      $scope.message = 'Please enter data first';
    } else {
      const dishes = $scope.dishes
      const dish = dishes.split(',');

      for(let i=0; i < dish.length; i++) {
        if(dish[i] === '' || dish[i].match(/^\s*$/)) {
          dish.splice(i, 1)
        }
      }

      if(dish.length <= 3) {
        $scope.message = "Enjoy!"
      } else {
        $scope.message = "Too much!"
      }
    }
  };
}

})();
