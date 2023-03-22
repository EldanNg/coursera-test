(function () {
"use strict";

angular.module('public')
.component('signupForm', {
  templateUrl: 'src/public/signup-form/signup-form.html',
  controller: SignUpFormController,
});

SignUpFormController.$inject = ['MenuService', 'UserService'];

function SignUpFormController(MenuService, UserService) {
  var $ctrl = this;
  $ctrl.errorMessage = '';
  $ctrl.successMessage = '';

  $ctrl.validateFavoriteItem = function(favorite) {
    $ctrl.successMessage = '';
    if (favorite) {
      MenuService.getMenuItem(favorite).then(function(response) {
        if (response === null) {
          $ctrl.favoriteItemValid = false;
          $ctrl.errorMessage = 'No such menu number exists.';
        } else {
          $ctrl.favoriteItemValid = true;
          $ctrl.errorMessage = '';
        }
      });
    } else {
      $ctrl.favoriteItemValid = false;
      $ctrl.errorMessage = '';
    }
  };

  $ctrl.submit = function(regForm) {
    var favorite = regForm.favorite.$viewValue;
    var promise = MenuService.getMenuItem(favorite).then(function (response) {
      if (response === null){
        $ctrl.successMessage = '';
        $ctrl.errorMessage = 'No such menu number exists.';
      }
      else {
        $ctrl.errorMessage = '';
        var result = UserService.saveInfo(regForm);
        if(result !== '') {
          $ctrl.successMessage = 'Your information has been saved.';
        }
        else {
          $ctrl.errorMessage = 'Your information has not been saved.'
        }
      }
    });
  };
};

})();
