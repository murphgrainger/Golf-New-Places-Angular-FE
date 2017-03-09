(function() {
    'use strict';

    angular
        .module('app')
        .component('formComp', {
            bindings: {
                courses: '='
            },
            controller: 'FormController',
            templateUrl: 'form/form.template.html'
        });

})();
