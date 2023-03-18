(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);

// Version with resolving to 1 item based on $stateParams in route config. You can inject 'items' which is from the parent resolve property.
ItemDetailController.$inject = ['$stateParams', 'items'];
function ItemDetailController($stateParams, items) {
  var itemdetail = this;
  var item = items[$stateParams.itemId];
  itemdetail.name = item.name;
  itemdetail.quantity = item.quantity;
  itemdetail.description = item.description;
}

})();
