(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

UserService.$inject = [];
function UserService() {
  var service = this;

  service.user = {}

  service.saveInfo = function (data) {
    service.user.firstname = data.firstname.$viewValue;
    service.user.lastname = data.lastname.$viewValue;
    service.user.email = data.email.$viewValue;
    service.user.phone = data.phone.$viewValue;
    service.user.favorite = data.favorite.$viewValue;

    return service.user;
  };

  service.getMyInfo = function() {
    return service.user;
  };
}

})();
