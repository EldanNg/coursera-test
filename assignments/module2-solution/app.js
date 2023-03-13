(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;
  buyList.items = ShoppingListCheckOffService.getBuyItems();
  buyList.buyItem = function (item_name, item_quantity, itemIndex) {
    ShoppingListCheckOffService.buyItem(item_name, item_quantity, itemIndex);
  }
  buyList.errorMessage = function() {
    if(buyList.items == "") {
      return "Everything is bought!";
    } else {
      return null;
    }
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  boughtList.errorMessage = function() {
    if (boughtList.items == "") {
      return "Nothing bought yet.";
    } else {
      return null;
    }
  }
}

function ShoppingListCheckOffService() {
  var service = this;
  var buyList = [];
  var boughtList = [];

  //List of shopping items
  buyList = [
    {
      name: "cookies",
      quantity: "10"
    },
    {
      name: "biscuits",
      quantity: "5"
    },
    {
      name: "chips",
      quantity: "8"
    },
    {
      name: "milk bottles",
      quantity: "2"
    },
    {
      name: "water bottles",
      quantity: "4"
    },
    {
      name: "chocolates",
      quantity: "5"
    },
  ];

  service.buyItem = function (item_name, item_quantity, itemIndex) {
    service.addItem(item_name, item_quantity);
    buyList.splice(itemIndex, 1);
  };

  service.addItem = function (item_name, item_quantity) {
    var item = {
      name: item_name,
      quantity: item_quantity
    };
    boughtList.push(item);
  };

  service.getBuyItems = function () {
    return buyList;
  };

  service.getBoughtItems = function () {
    return boughtList;
  };
}
})();
