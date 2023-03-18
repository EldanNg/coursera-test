(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/menuapp/templates/itemsList.template.html',
  bindings: {
    items: '<'
  }
});

})();
