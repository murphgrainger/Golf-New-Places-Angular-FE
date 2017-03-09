(function() {
    'use strict';

    angular
        .module('app')
        .component('mapBox', {
            bindings: {
                courses: '<'
            },
            controller: 'MapController',
            templateUrl: 'map/map.template.html'
        });

})();
