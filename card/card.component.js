(function() {
    'use strict';

    angular
        .module('app')
        .component('cardList', {
            bindings: {
                courses: '<'
            },
            controller: 'CardController',
            templateUrl: 'card/card.template.html'
        });

})();
