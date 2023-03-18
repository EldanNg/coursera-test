(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'src/menuapp/templates/categoriesList.template.html',
  bindings: {
    items: '<'
  }
});

})();
