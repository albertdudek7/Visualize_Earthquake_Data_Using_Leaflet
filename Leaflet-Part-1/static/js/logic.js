// link for json of Significant Earthquakes in the last 30 days
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

//Request to the url query
d3.json(url, function(data){
    console.log(data);
    // features from data
    earthquakeFeatures(data.feautres);
});


let map = L.map("map", {
    // Minneapolis
    center: [44.9778, 93.2650],
    zoom: 4,
    layers:[street, earthquakes]
  });

// Create a map that plots all the earthquakes from the dataset based on longitude and latitude

// Data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color
// Earthquakes with higher magnitudes should appear larger 
// Earthquakes with greater depth should appear darker in color
// Hint: Depth of the earthquake can be found as the third coordiante for each earthquake

// Include popups that provide additional information about the earthquake when its associated marker is clicked

// Create a Legend with context for map data

// Function to fill color of Earthquake in regards to the Earthquakes Depth
// From ColorBrewer 2.0 using Sequential coloring with 6 data classes
function markerColor(depth){

    let color = '';
    if (depth > 90){
        color = '#a50f15';
    } else if (depth >= 70){
        color = '#de2d26';
    } else if (depth >= 50){
        color = '#fb6a4a';
    }else if (depth >= 30){
        color = '#fc9272';
    }else if (depth >= 10){
        color = '#fcbba1';
    } else {
        color = '#fee5d9';
    }
}

// Function to make higher magnitudes appear larger
function markerSize(magnitude){
    return magnitude*4000
}
// Function to create a pop up for earthquake data markers based on magnitude and depth
function earthquakeFeatures(earthquakeData){
    // log data
    console.log(earthquakeData);

    function onEachFeature(feature, layer){
        // Feature in popup with the time and palace of each earthquake
        layer.bindPopUp(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><ul><li>Earthquake Magnitude: ${feature.properties.mag}</li><li>Earthquake Depth: ${feature.geometry.coordinates[2]}</li></ul>`);
    }


    

    // GeoJSON layer containing the features array on the earthquakeData
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng){

            var circleMarkers = {

                radius: markerSize(feature.properties.mag),
                colorFill: markerColor(feature.geometry.coordinates[2]),
                opacity: 1,
                fillOpacity: .7
            }
            return L.circle(latlng,markers);
        }
    });
    createMap(earthquakes);
}
    
function createMap(earthquakes){
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	    subdomains: 'abcd',
	    maxZoom: 20
    });

    var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo,
        "Dark Map": dark
    };

    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create Legend for the Map
    var legend = L.control({position: "bottomright"});

    legend.onAdd = function (){
        var div = L.DomUtil.create("div","info legend");
        var grades = [-10,10,30,50,70,90];
        var colors =[
            '#fee5d9',
            '#fcbba1',
            '#fc9272',
            '#fb6a4a',
            '#de2d26',
            '#a50f15'
        ];
        for (var i = 0; i < grades.length; i++){
            div.innerHTML += "<i style=background: " + colors[i] + "></i> " + grades[i] + (grades[i +1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
    };

    legend.addTo(map);

    // layer control
    L.control.layers(

        baseMaps, overlayMaps, {
            collapsed: false

        }
    ).addTo(map);

}