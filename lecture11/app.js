(function () {
'use strict';

angular.module('MsgApp', [])

.controller('MsgController', MsgController);

MsgController.$inject = ['$scope'];

function MsgController($scope) {
  $scope.name = "Eldan";

  $scope.sayMessage = function () {
    return "Eldan likes to eat healthy snacks at night!";
  };
}

})();
