(function () {
"use strict";

angular.module('public')
  .controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user', 'favorite'];
function MyInfoController(user, favorite) {
  var myInfoCtrl = this;
  myInfoCtrl.user = user;
  myInfoCtrl.favorite = favorite;

  myInfoCtrl.emptyUserObject = Object.keys(myInfoCtrl.user).length === 0;

  if(favorite) {
    var parts = favorite.short_name.split(/(\d+)/);
    myInfoCtrl.favorite.category = parts[0];
  }
}
})();
