(function() {
    'use strict';

    angular
        .module('app')
        .controller('FormController', FormController);

    function FormController(cardService, mapService) {
        const vm = this;
        vm.$onInit = function() {}

        vm.formSubmit = function(search) {
            let distance = search.distance;
            let city = search.city;
            let publicCheck = search.public;
            let privateCheck = search.private;
            let allCourses = [];
            let typedCourses = [];
            mapService.geolocate(buildGeoURL(city))
                .then(result => {
                    vm.lat = result.lat;
                    vm.lng = result.lng;
                    cardService.getCourses(swingURL(vm.lat, vm.lng, distance))
                        .then(data => {
                            allCourses = data.courses;
                            if (data.meta.courses.next !== undefined) {
                                cardService.getMoreCourses(data.meta.courses.next).then(courses => {
                                    courses.forEach(course => {
                                        allCourses.push(course)
                                    })
                                    if (publicCheck !== undefined && !privateCheck) {
                                        allCourses.forEach(course => {
                                            if (course.membership_type !== "private") {
                                                typedCourses.push(course);
                                            }
                                        })
                                    } else if (!publicCheck && privateCheck !== undefined) {
                                        allCourses.forEach(course => {
                                            if (course.membership_type == "private") {
                                                typedCourses.push(course)
                                            }
                                        })
                                    } else {
                                        allCourses.forEach(course => {
                                            typedCourses.push(course)
                                        })
                                    }
                                }).catch(err => {
                                    console.log(err);
                                })
                            }
                            vm.courses = typedCourses;
                            mapService.initMap(vm.lat, vm.lng)
                        });
                }).catch(err => {
                    console.log(err);
                })
        }
    }

    function buildGeoURL(city) {
        const herokuPrefix = 'https://galvanize-cors-proxy.herokuapp.com/';
        const geoAPI = 'https://maps.googleapis.com/maps/api/geocode/json?';
        const mapsAPI = 'https://maps.googleapis.com/maps/api/js?';
        let geoComp = `address=${city}`;
        let geoKey = '&key=AIzaSyDrwG2vaCL_doUJ1Io8bTNrGzxT30N6SqE&libraries=places';
        return herokuPrefix + geoAPI + geoComp + geoKey;
    }

    function swingURL(lat, lng, distance) {
        const swingAPI = 'https://api.swingbyswing.com/v2/courses/search_by_location?';
        let swingCoordinates = `lat=${lat}&lng=${lng}`;
        let swingRadius = `&radius=${distance}`
        let holeCount = '&active_only=yes&hole_count=' + 18;
        let swingToken = '&access_token=9a7a612e-4ccf-4deb-a2da-cde8bc46db01';
        return swingAPI + swingCoordinates + swingRadius + holeCount + swingToken;
    }

    function initMap(latitude, longitude) {
        let searchCenter = {
            lat: latitude,
            lng: longitude
        };
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            center: searchCenter
        })
    }



})();
