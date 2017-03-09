(function() {
    'use strict';

    angular
        .module('app')
        .service('cardService', cardService);

    function cardService($http) {

        this.getCourses = function(swingURL) {
            return $http.get(swingURL).then(function(response) {
                return response.data;
            });
        };

        this.getMoreCourses = function(moreCoursesURL) {
            return $http.get(moreCoursesURL).then(function(response) {
                const moreCourses = response.data.courses
                return moreCourses;
            });
        };
    }
}())
