(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['item'];
function ItemsController(item) {
  var items = this;
  items.menu = item.data.menu_items
}

})();
