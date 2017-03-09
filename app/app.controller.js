(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    function AppController($http, $mdSidenav, cardService) {
        const vm = this;
        vm.$onInit = function() {}


    }



})();
