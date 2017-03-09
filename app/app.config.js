(function() {
    'use strict';

    angular.module('app').config(config)


    function config($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true)

        $mdThemingProvider
            .theme('default')
            .primaryPalette('green')
            .accentPalette('red')
            .warnPalette('red')
            .backgroundPalette('grey');
        $mdThemingProvider
            .theme('card')
            .primaryPalette('green').dark()

        $stateProvider
            .state({
                name: 'app',
                abstract: true,
                component: 'app',
            })
            .state({
                name: 'home',
                parent: 'app',
                url: '/',
                component: 'cardList',
            })
            .state({
                name: 'form',
                parent: 'app',
                url: '/',
                component: 'formComp',
            })
            .state({
                name: 'map',
                parent: 'app',
                url: '/',
                component: 'mapBox',
            })
    }

}());
