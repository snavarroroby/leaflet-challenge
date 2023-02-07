
var myMap = L.map("map").setView([39.8283, -98.5795], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    console.log(data);

    var earthquakes = data.features;
    console.log(earthquakes);
    console.log(earthquakes[0]);
    for (var i = 0; i < 100; i++) {
        var quake = earthquakes[i];
        var coordinates = [quake.geometry.coordinates[1], quake.geometry.coordinates[0]];
        var depth = [quake.geometry.coordinates[2]];
        console.log(depth);
        var opacity = 0
        if (depth > 50) {
            opacity = 0.9;
        } else if (depth >35) {
            opacity = 0.5;
        } else if (depth > 20) {
            opacity = 0.3;
        } else {opacity = 0.2;}
        var magnitude = quake.properties.mag;

        var circleradius = 0;
        if (magnitude>2) {
            circleradius = 50000;
        } else if(magnitude > 1.5) {
            circleradius = 30000;
        } else if(magnitude > 1) {
            circleradius = 10000;
        } else {circleradius = 5000;}

        var marker = L.circle(coordinates, {
            color : 'green',
            fillColor : 'green',
            fillOpacity : opacity,
            radius : circleradius
        }).bindPopup("<h2>Magnitude: " + magnitude + "</h2><h3>Depth: " + depth + "</h3>").addTo(myMap);


    }
    // var legend = L.control({position: 'bottomright'});
    // legend.onAdd = function() {
    //     var div = L.DomUtil.create('div', 'legend');

    // }
    // legend.addTo(myMap);
});
