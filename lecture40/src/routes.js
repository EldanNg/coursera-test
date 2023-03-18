(function () {
'use strict';

angular.module('ShoppingList')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/shoppinglist/templates/home.template.html'
  })

  // Premade list page
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
    controller: 'MainShoppingListController as mainList',
    // Resolve property helps to retrieve the data first before the view comes into browser as it is not best practice to switch view without knowing before if there is any data in the view to begin with. If the promise in the resolve property fails to resolve, router will not transit to the new state at all. This name of the key like the one below 'items' has to be injected into the corresponding controller's function.
    resolve: {
      items: ['ShoppingListService', function (ShoppingListService) {
        return ShoppingListService.getItems();
      }]
    }
  })

  // Item detail
  .state('mainList.itemDetail', {
    // Urls are optional, so technically you can choose not to have it as well. However, if there is a pramater to the Url, ui-router will not know to expect a praameter like that, therefore you need to add another property called params. Inside the params you need give the name of the parameter with some value.
    // url: '/item-detail/{itemId}',
    templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    controller: 'ItemDetailController as itemdetail',
    params: {
      itemId: null
    }
    // ,
    // Since we are going to use child state, we can get the data from the parent. Therefore, we can now remove the resolve property.
    // resolve: {
    //   item: ['$stateParams', 'ShoppingListService',
    //   function ($stateParams, ShoppingListService) {
    //     return ShoppingListService.getItems()
    //       .then(function (items) {
    //         return items[$stateParams.itemId];
    //       });
    //   }]
    // }
  })
}

})();
