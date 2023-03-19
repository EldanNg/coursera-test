describe('menucategories', function () {

  var menucategories;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function () {
    module('MenuCategoriesApp');

    // With the injector service, you can literally pull out all the things from the angular context.
    inject(function ($injector) {
      menucategories = $injector.get('MenuCategoriesService');
      // We need $httpBackend to mock out our requests.
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiBasePath');
    });
  });

  it('should return categories list', function() {
    // Over here, we are telling that when the api call gets make, go ahead and intercept it and respond with an array.
    $httpBackend.whenGET(ApiBasePath + '/categories.json').respond(['Lunch', 'Dessert']);
    // Once the api get set up, we can call the service that calls the method which returns a promise since http service returns a promise. And we are saying that we are going to catch the promise in the 'then' function and grab the response.
    menucategories.getMenuCategories().then(function(response) {
      expect(response.data).toEqual(['Lunch', 'Dessert']);
    });
    // this flush method will make it like an asynchronous call of a http but behave like a synchronous call.
    $httpBackend.flush();
  });

});
