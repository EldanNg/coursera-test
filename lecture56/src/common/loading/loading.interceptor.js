(function() {
"use strict";


// A factory is a type of service provider that allows you to create and manage objects that can be injected into other parts of your application.
angular.module('common')
.factory('loadingHttpInterceptor', LoadingHttpInterceptor);

LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];
/**
 * Tracks when a request begins and finishes. When a
 * request starts, a progress event is emitted to allow
 * listeners to determine when a request has been initiated.
 * When the response completes or a response error occurs,
 * we assume the request has ended and emit a finish event.
 */
function LoadingHttpInterceptor($rootScope, $q) {

  // The reason for loading count increment and decrement counter is because since http request are asynchrnous, it is possible to have a few request happening at the same time. E.g http service loading a few templates at the same time, making few request at the same time. We don't want to turn off the spinner completely when the first request came back while the second request is still pending. Which means we need a counter.
  var loadingCount = 0;
  var loadingEventName = 'spinner:activate';

  // The request property is expected to be a function that takes in a config object. The config object here is basically everything that is need for the $http service to make the request, e.g the url, the request headers... , when $http service makes a request, it's going to come to this function right here before going out and making a request. This will give us an ability to hook into the whole process.
  return {
    request: function (config) {
      // console.log("Inside interceptor, config: ", config);

      if (++loadingCount === 1) {
        $rootScope.$broadcast(loadingEventName, {on: true});
      }

      return config;
    },

    response: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
      }

      return response;
    },

    responseError: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
      }

      // The last thing we need to do inside the response error function is that we need to reject the promise.
      return $q.reject(response);
    }
  };
}

})();
