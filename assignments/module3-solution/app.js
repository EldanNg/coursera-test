(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.directive('foundItems', FoundItemsDirective)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com/");

function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'foundList.html',
        scope: {
          items: '<',
          error: '<',
          myTitle: '@title',
          onRemove: '&',
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
    };

    return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.empty = function () {
    if (list.items == '') {
      return true;
    }
    return false;
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.searchTerm = "";
  list.title = "Narrow Down List";
  list.error = false;

  list.searchItems = function(searchTerm) {
    list.error = false;
    if(searchTerm != '') {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function (response) {
        list.items = response;
        list.title = "Narrow Down List ( " + list.items.length + " items )";
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });

      return promise;
    }
    else {
      list.items = '';
      list.title = "Narrow Down List ( " + list.items.length + " items )";
      list.error = true;
    }
  }

  list.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
    list.title = "Narrow Down List ( " + list.items.length + " items )";
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var foundItems = [];

  service.getMatchedMenuItems = function(searchTerm) {
    searchTerm = searchTerm.toLowerCase();

    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response.then(function(result) {
      // process result and only keep items that match
      var foundItems = [];
      var allItems = result.data;
      var categoryItems = [];
      var listOfItems = [];

      for (var key in allItems) {
        if (allItems.hasOwnProperty(key)) {
          categoryItems.push(allItems[key]);
        }
      }

      for (var i = 0; i < categoryItems.length; i++) {
        listOfItems.push(categoryItems[i].menu_items);
      }

      for (var i = 0; i < listOfItems.length; i++) {
        for (var j = 0; j < listOfItems[i].length; j++) {
          var description = listOfItems[i][j].description;
          if (description.toLowerCase().indexOf(searchTerm) !== -1 && description !== '') {
            foundItems.push(listOfItems[i][j].description)
          }
        }
      }
      service.foundItems = foundItems;
      return foundItems;
    });
  }

  service.removeItem = function (itemIndex) {
    service.foundItems.splice(itemIndex, 1);
  };
}

})();
