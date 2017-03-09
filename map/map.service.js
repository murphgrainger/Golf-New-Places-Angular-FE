(function() {
    'use strict';

    angular
        .module('app')
        .service('mapService', mapService);

    function mapService($http) {

        var latlong;

        this.geolocate = function(googleURL) {
            return $http.get(googleURL).then(function(response) {
                let latlong = response.data.results[0].geometry.location
                return latlong;
            });
        };

        this.initMap = function(lat, long) {
            var options = {
                center: new google.maps.LatLng(lat, long),
                zoom: 10,
                disableDefaultUI: true
            }
            this.map = new google.maps.Map(
                document.getElementById("map"), options
            );
            this.places = new google.maps.places.PlacesService(this.map);
        }

        this.addMarker = function(res) {
            if (this.marker) this.marker.setMap(null);
            this.marker = new google.maps.Marker({
                map: this.map,
                position: res.location
            });
            this.map.setCenter(res.location);
        }
    }
}())
