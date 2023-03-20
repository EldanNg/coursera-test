describe('shoppingList component', function() {
  var $componentController;

  beforeEach(module('ShoppingListComponentApp'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  it('should detect no cookies in its list', function() {
    // Pass bindings that are needed for the test
    var bindings = {items: [{name: 'item 1', quantity: "1"}]};

    // By passing the name of the component and we need to pass in anything that our component expect it to be injected with, in this example the $element. However, we don't really care about this because we are not testing anything with it. But we still need to provide some kind of object to prevent Angular from giving us errors. So we can give it a null. And then the bindings.
    var ctrl = $componentController('shoppingList', {$element: null}, bindings);

    var cookiesInList = ctrl.cookiesInList();
    expect(cookiesInList).toEqual(false);
  });


  it('should detect cookies in its list', function() {
    // Pass bindings that are needed for the test
    var bindings = {items: [{name: '2 cookies', quantity: "1"}]};
    var ctrl = $componentController('shoppingList', {$element: null}, bindings);

    var cookiesInList = ctrl.cookiesInList();
    expect(cookiesInList).toEqual(true);
  });

});
