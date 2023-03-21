(function() {
"use strict";

angular.module('public')
.config(routeConfig);

/**
* Cofigures the routes and views
*/
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider, $urlRouterProvider) {
  // Routes
  $stateProvider
    .state('public', {
      // When abstract is true, means you can never access directly to this state, this state is more like a parent, a parent to other states that other states can inherit from and share attributes of the state.
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function(MenuService) {
          return MenuService.getCategories();
        }]
      }
    });
}
})();
