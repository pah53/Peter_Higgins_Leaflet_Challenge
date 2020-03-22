const API_Key = "pk.eyJ1IjoicGFoNTMiLCJhIjoiY2s3MTNxMmxnMDJ0MzNubXk3dGFicW9ueSJ9.agjKe0QDU71HaW2k94h5lQ";

var map = L.map("map", {
    center: [39.77, -115.42],
    zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 3,
    id:"mapbox.streets",
    accessToken: API_Key
}).addTo(map);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Creating function to size markers proportionate to the magnitude of an earthquake
function markerSize(marker) {
    return marker * 10
};


//Grabbing GeoJSON data
d3.json(link, function(data) {
    //Creating a function for bubble radius based on magnitude
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }

        return magnitude * 4;
    }

    //Creating a function for bubble color based on magnitude
    function getColor(magnitude){
        switch(true) {
            case magnitude > 5:
                return "blue";
            case magnitude > 4:
                return "red";
            case magnitude > 3:
                return "orange";
            case magnitude > 2:
                return "yellow";
            case magnitude > 1:
                return "grey";
            default:
                return "white"    
        }
    }
    
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: function(feature) {
            return {
                opacity: 1,
                fillOpacity: 1,
                fillColor: getColor(feature.properties.mag),
                color: "black",
                stroke: true,
                radius: getRadius(feature.properties.mag)
            }
        },
        onEachFeature: function(feature, layer){
            layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}`);
        }
    }).addTo(map);
    
    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        
        var grades = [0,1,2,3,4,5];
        var colors = [
            "white",
            "green",
            "yellow",
            "orange",
            "red",
            "blue"
        ];

        for (var i = 0; i<grades.length; i++) {
            div.innerHTML +
                `${grades[i]} <br>`;
        }
        
        div.innerHTHML = "test";


    }

    div.innerHTML = "test";

    return div;

    legend.addTo(map);
});