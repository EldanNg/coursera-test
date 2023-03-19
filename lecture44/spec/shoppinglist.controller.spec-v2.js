describe("Spec v2: ShoppingListController", function() {

  beforeEach(function () {
    module(function ($provide) {
      // First, We are creating mock service by letting angular inject the $provide, the provide service. Provide service has a service method, among other methods. We pass in our mock service with the name of our mock service. Now angular know such a service called 'ShoppingListServiceErrorMock' exist.
      $provide.service('ShoppingListServiceErrorMock', function () {
        // This is the same type of stuff you use to create a regular service.
        var service = this;
        service.addItem = function (name, quantity) {
          throw new Error("Test message.");
        };

        service.getItems = function () {
          return null;
        };
      });
    });

    // Secondly, we are loading our module which is our application module so we can hook into that and test our controller.
    module('ShoppingListApp');
  });

  var $controller;
  var shoppingListController;

  // We also have to inject the mock service. Instead of the manually creating mock service inside beforeEach, we have angular inject it into the beforeEach function.
  beforeEach(inject(function (_$controller_, ShoppingListServiceErrorMock) {
    $controller = _$controller_;

    shoppingListController =
      $controller('ShoppingListController',
                  {ShoppingListService: ShoppingListServiceErrorMock});

  }));

  it("should change error message in controller", function() {
    shoppingListController.addItem();
    expect(shoppingListController.errorMessage).toBe("Test message.");
  });

});
