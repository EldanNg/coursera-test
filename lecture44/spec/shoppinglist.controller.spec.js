describe("ShoppingListController", function() {

  // this 'module' function is an alias for angular.mock.module
  beforeEach(module('ShoppingListApp'));

  var $controller;
  var shoppingListController;

  // this 'inject' function is an alias for angular.mock.inject
  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;

    // We are creating a mock version of the shopping list service. In this case we are calling it ShoppingListServiceErrorMock.
    var ShoppingListServiceErrorMock = {};
    ShoppingListServiceErrorMock.addItem = function (name, quantity) {
      throw new Error("Test message.");
    };

    // If you see our ShoppingListController in app.js, it is also calling out the service with getItems() method which is called automatically. We don't really care about tthe method but we don't want to error out, therefore go ahead and return null, which shouldn't affect our test.
    ShoppingListServiceErrorMock.getItems = function () {
      return null;
    };

    // The next step is to create our controller, calling the controller service and passing in the ShoppingListController that was declared on the original module and we specify the injection into that controller which is expecting a ShoppingListService, and we are giving it an instance of ShoppingListServiceErrorMock instead, which is a fake object instead of a real ShoppingListService.
    shoppingListController = $controller('ShoppingListController', {ShoppingListService: ShoppingListServiceErrorMock});
    // There is nothing wrong if you want to create the controller directly in the test itself instead of a central place like beforeEach.
  }));

  // The last thing is to actually create the test method or our spec.
  it("should change error message in controller", function() {
    shoppingListController.addItem();
    // When we call addItem method, we expect the shopping list service will throw an error, therefore the ShoppingListController error message should be "Test message."
    expect(shoppingListController.errorMessage).toBe("Test message.");
  });
});
