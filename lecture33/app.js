(function () {
'use strict';

angular.module('ShoppingListComponentApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.component('shoppingList', {
  templateUrl: 'shoppingList.html',
  // Only provide controller if you are adding extra functionality, otherwise Angular already provides a empty function.
  controller: ShoppingListComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});

// With $doCheck(), instead of using $postLink, you can have a way to remove the $scope.
ShoppingListComponentController.$inject = [
// '$scope',
'$element']
function ShoppingListComponentController(
  // $scope,
  $element) {
  // $ctrl over here can be whatever, it is just a local variable.
  var $ctrl = this;
  var totalItems;

  $ctrl.cookiesInList = function () {
    for (var i =0; i < $ctrl.items.length; i++) {
      var name = $ctrl.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };

  $ctrl.remove = function (myIndex) {
    // the below 'index' which is the key comes from index.html
    $ctrl.onRemove({ index: myIndex });
  };

  $ctrl.$onInit = function () {
    totalItems = 0;
    // console.log("We are in $onInit()");
  }

  $ctrl.$onChanges = function (changeObj) {
    // The reason the items array is not detected here is because the only thing that is being watched are the items array that is the reference to that items array. The reference will remains the same no matter what items you add in the items array in this instance.
    console.log("Changes: ", changeObj);
  }

  // Unlike directive, you don't have scope, element etc in this function. However, there is another service called $element which you have to inject. This is how we can get the parent item or top item of our component.
  // $ctrl.$postLink = function () {
  //   // This is the place where you can manipulate the DOM. This is not necssarily the best way to have animations in template HTML.
  //   $scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue) {
  //     console.log($element);
  //     if (newValue === true) {
  //       // Show warning
  //       // With JQuery, $element represent an element as a JQuery object.
  //       var warningElem = $element.find('div.error');
  //       warningElem.slideDown(900);
  //     }
  //     else {
  //       // Hide warning
  //       var warningElem = $element.find('div.error');
  //       warningElem.slideUp(900);
  //     }
  //   })
  // };

  // This is just another way to hook into some life cycle events that are happening around the component. such as $doCheck. This $doCheck gets fired every time when goig through the digest loop.
  $ctrl.$doCheck = function () {
    if ($ctrl.items.length !== totalItems) {
      console.log("# of items change, Checking for Cookies!");
      totalItems = $ctrl.items.length;
      if ($ctrl.cookiesInList()) {
        console.log("Oh, NO! COOKIES!!!!!");
        var warningElem = $element.find('div.error');
        warningElem.slideDown(900);
      }
      else {
        console.log("No cookies here. Move right along!");
        var warningElem = $element.find('div.error');
        warningElem.slideUp(900);
      }
    }
  };
}

// LIST #1 - controller
ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  }

  list.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    shoppingList.removeItem(itemIndex);
    this.title = origTitle + " (" + list.items.length + " items )";
  };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
