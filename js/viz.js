(function init(){

    'use strict';

    var airports
    var map;



    function drawMap(originator, destinations){
        var paths = [];
        var bubbles = [];

        destinations.forEach(function(dest){
            var bubble = $.extend(dest, {
                radius: 7,
                fillKey: 'destination'
            });
            bubbles.push(bubble);

            var destCoordinates = {
                latitude: dest.latitude ? dest.latitude : originator.latitude,
                longitude: dest.longitude ? dest.longitude : originator.longitude
            };

            var path = {
                origin: {
                    latitude: originator.latitude,
                    longitude: originator.longitude
                },
                destination: destCoordinates
            };
            paths.push(path);
        });

        originator.radius = 10;
        originator.fillKey = 'origin';

        bubbles.push(originator);

        map.bubbles(bubbles, {
            popupTemplate: function(geo, data) {
                var html = '<div class="hover-info">' + data.iataCode + ' - ' + data.name;
                    html += '</div>';
                return html;
            }
        });


    }


    function initializeMap(){
        map = new Datamap({
            element: document.getElementById('map'),
            scope: 'usa',
            fills: {
                origin: '#AA2519',
                defaultFill: '#E9D3A1'
            },
            geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true
            },
            setProjection: function(element, options) {
                var projection = d3.geo.albersUsa()
                        .scale(1400);


                var path = d3.geo.path().projection(projection);
                return {
                    path: path,
                    projection: projection
                };
            }
        });
    }


    initializeMap();

}());
