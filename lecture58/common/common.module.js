(function () {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://coursera-jhu-default-rtdb.firebaseio.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  // The http provider has a special property called interceptors that holds an array of all these interceptors that when the http service goes out to do its job, it first checks that array to see if it needs to have one of the interceptors work its magic on one of the requests or responses before actually goes through with the request.
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
