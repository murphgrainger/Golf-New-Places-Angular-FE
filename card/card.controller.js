(function() {
    'use strict';

    angular
        .module('app')
        .controller('CardController', CardController);

    function CardController(cardService, mapService) {
        const vm = this;
        vm.$onInit = function() {}

        vm.addressToMap = function(course) {
            mapService.addMarker(course)
        }
    }
})();
