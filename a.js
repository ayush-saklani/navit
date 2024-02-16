const map = L.map(('map'),{center: [30.2734504,77.9997427],maxZoom:20,minZoom:18});
const tileurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tile = L.tileLayer(tileurl).addTo(map);
//base map from open streetmap added 

// testing
// const points = [[30.2731289, 77.9997726],[30.2732541, 77.9998359],[30.2733582, 77.9999662],[30.2734329, 78.0001123]];
// const    polytile = L.polyline(points).addTo(map);



let level=-1;//front end se fetch karna level 

fetch('./mapgeoJSON/floor'+level+'.geojson').then(response =>  response.json()).then(data => {
    L.geoJSON(data, {
        style:{color: 'cadetblue',weight: 1,opacity: 0.4},
    }).addTo(map);
    map.fitBounds(L.geoJSON(data).getBounds());
}).catch(error => console.error('out of service.. ~_~  @_@', error));   



let res = [
    [30.2731289, 77.9997726],
    [30.2732541, 77.9998359],
    [30.2733582, 77.9999662],
    [30.2734329, 78.0001123],
];
const customRoute = L.polyline(res,{ color: 'teal' }).addTo(map);

// steelblue teal cadetblue

//!!!!!!!!!!!!!!!!!!!!dont delete this segment!!!!!!!!!!!!!!!!!!!!

// if(level == 1){//for ground floor
//     // const geojsonLayer = L.geoJSON('og map.geojson').addTo(map);
//     fetch('./mapgeoJSON/og map.geojson').then(response =>  response.json()).then(data => {
    //         // Add GeoJSON layer to the map
    //         L.geoJSON(data, {
//             style:{
    //                 color: 'cadetblue',
    //                 weight: 1,
    //                 opacity: 0.4,
    //             },
    //             // onEachFeature: function (feature, layer) {
        //             //     if (feature.properties && feature.properties.label) {
            //             //         layer.bindPopup(feature.properties.label);
//             //     }
//             // }, 
//         }).addTo(map);
//         // Fit the map to the bounds of the GeoJSON layer
//         map.fitBounds(L.geoJSON(data).getBounds());
//     }).catch(error => console.error('Error loading GeoJSON file:', error));     
// }

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    






// const customRoute = L.polyline([
        //         [30.2731289, 77.9997726],
//         [30.2732541, 77.9998359],  // Add additional waypoints as needed
//         [30.2733582, 77.9999662],  // Add additional waypoints as needed
//         [30.2734329, 78.0001123],
//         // L.latLng(endPointLat, endPointLng)
//     ],{ color: 'red' }
// ).addTo(map);
// const customRoute2 = L.polyline([
//         [30.2732541, 77.9998359],  // Add additional waypoints as needed
//         [30.2732565, 77.9996570],  // Add additional waypoints as needed
//         // L.latLng(30.2734329, 78.0001123),
//         // L.latLng(endPointLat, endPointLng)
//     ],{ color: 'yellow' }
// ).addTo(map);

// // Create a Leaflet Routing Machine control and add it to the map
// const control = L.Routing.control({
//     waypoints: [
//         L.latLng(30.2731289, 77.9997726),
//         L.latLng(30.2732565, 77.9996570)
//     ],
// }).addTo(map);
// const allLayers = L.layerGroup([customRoute, customRoute2, control]);
//         map.fitBounds(allLayers.getBounds());







// const customPath = L.polyline([
//     [30.2731289, 77.9997726],    [30.2732541, 77.9998359],
//     [30.2733582, 77.9999662],    [30.2734329, 78.0001123],
// ], { color: 'red' }).addTo(map);
// const customPath2 = L.polyline([
//     [30.2732541, 77.9998359],    
//     [30.2732565, 77.9996570],    
// ], { color: 'blue' }).addTo(map);
// // Fit the map to the bounds of the custom path


// const control = L.Routing.control({
//     waypoints: [
//         L.latLng(30.2731289, 77.9997726),
//         L.latLng(30.2732565, 77.9996570),
//     ],
// }).addTo(map);

// map.fitBounds(customPath2.getBounds());
// map.fitBounds(customPath.getBounds());