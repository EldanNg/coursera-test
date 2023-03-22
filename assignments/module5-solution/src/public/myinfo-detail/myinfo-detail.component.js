(function () {
"use strict";

angular.module('public')
.component('myInfo', {
  templateUrl: 'src/public/myinfo-detail/myinfo-detail.html',
  bindings: {
    info: '<',
    favorite: '<'
  }
});

})();
