describe('SignUpFormController', function () {

  var menuitem;
  var $httpBackend;
  var ApiPath;

  var shortname;
  var menuNumber;
  var mockMenuItem;

  beforeEach(function () {
    module('restaurant');

    inject(function ($injector) {
      menuitem = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return menu item', function() {
    var shortname = 'L';
    var menuNumber = '1' - 1;
    var mockMenuItem = {"description":"chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra","name":"Orange Chicken","price_large":9.75,"short_name":"L1"};

    $httpBackend.whenGET(ApiPath + '/menu_items/' + shortname + '/menu_items/' + menuNumber + '.json').respond(mockMenuItem);
    menuitem.getMenuItem('L1').then(function(response) {
      expect(response).toEqual(
        {"description":"chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra","name":"Orange Chicken","price_large":9.75,"short_name":"L1"}
      );
    });
    $httpBackend.flush();
  });
});
