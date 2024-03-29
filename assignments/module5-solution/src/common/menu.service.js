(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItem = function (shortname) {
    var parts = shortname.split(/(\d+)/);
    var shortName = parts[0];
    var menuNumber = parts[1];

    var menuNumber = menuNumber - 1;
    return $http.get(ApiPath + '/menu_items/' + shortName + '/menu_items/' + menuNumber + '.json').then(function (response) {
      return response.data;
    });
  };

}
})();
