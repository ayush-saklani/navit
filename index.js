const map = L.map(('map'), {
    center: [30.2734504, 77.9997427],
    zoomAnimation: true,
    maxZoom: 22,
    minZoom: 19,
    zoomControl: false
});
// let map = L.map(('map'), {}).setView(latling, 18);
const tileurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tile = L.tileLayer(tileurl, {
    attribution: '&copy; <p><a href="https://github.com/ayush-saklani"><img src="https://flagcdn.com/in.svg" width="15" alt="India"> Tempest</a></p>'
}).addTo(map);
//base map from open streetmap added 

let floor = 0, temp_point = 0;

// intitialize  the map with default view and zoom level
fetch(`./mapgeoJSON/floor${floor}.geojson`).then(response => response.json()).then(data => {
    L.geoJSON(data, {
        style: { color: 'cadetblue', weight: 1, opacity: 1 },
    }).addTo(map);
    map.fitBounds(L.geoJSON(data).getBounds()).setView([30.27332, 77.99979], 18);
}).catch(error => console.error('out of service.. ~_~  @_@', error));

let source, destination;
let points = [[], [], [], [], [], [], []]

const calculate_antpath = () => {
    source = document.getElementById("Start").value;
    destination = document.getElementById("destination").value;
    if (source > 0 && source < 1000) floor = 0;
    else if (source >= 1000 && source < 2000) floor = 1;
    else if (source >= 2000 && source < 3000) floor = 2;
    else if (source >= 3000 && source < 4000) floor = 3;
    else if (source >= 4000 && source < 5000) floor = 4;
    else if (source >= 5000 && source < 6000) floor = 5;
    else if (source >= 6000 && source < 7000) floor = -1;
    console.log(`${source}  => ${destination}`);
    fetch('http://127.0.0.1:3000/getCoordinates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ src: source, des: destination })
    })
        .then(response => response.json())
        .then(data => {
            points = data;
            temp_point = floor;
            if (floor == -1) {
                temp_point = 6;
            }
            geoJSONEvent(floor, temp_point);
            let go_active_id = floor;
            if (floor == 0) {
                go_active_id = "G";
            }
            active(document.getElementById(go_active_id));
        })
        .catch(error => console.error('Error hai bhaisaab:', error));
};
const geoJSONEvent = (mapfloor, pathfloor) => {
    map.eachLayer((layer) => {
        if (!!layer.toGeoJSON) { map.removeLayer(layer); }
    });
    fetch(`./mapgeoJSON/floor${mapfloor}.geojson`).then(response => response.json()).then(data => {
        L.geoJSON(data, {
            style: { color: 'cadetblue', weight: 1, opacity: 1 },
        }).addTo(map);
    }).catch(error => console.error('out of service.. ~_~  @_@', error));
    L.polyline.antPath(points[pathfloor], {
        "delay": 600,
        "dashArray": [1, 46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
    }).addTo(map);
    highlightroom(destination);
};
const add_GeoJSON_EventListener = () => {
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            let mapfloor;
            let pathfloor;
            if (btn.id === 'G') {
                mapfloor = pathfloor = 0
            }
            else if (btn.id == '-1') {
                mapfloor = -1; pathfloor = 6;
            }
            else {
                mapfloor = pathfloor = btn.id;
            }
            floor = mapfloor;
            geoJSONEvent(mapfloor, pathfloor);
        });
    });
};
add_GeoJSON_EventListener();

// document.getElementById('-1').addEventListener('click', () => {
// map.eachLayer(function(layer) {
// if (!!layer.toGeoJSON){map.removeLayer(layer);}
// });
// fetch('./mapgeoJSON/floor-1.geojson').then(response =>  response.json()).then(data => {
// L.geoJSON(data, {
// style:{color: 'cadetblue',weight: 1,opacity: 1},
// }).addTo(map);
// }).catch(error => console.error('out of service.. ~_~  @_@', error));   
// L.polyline.antPath(points[6],{
// "delay": 600,
// "dashArray": [1,46],
// "weight": 5,
// "color": '#327174',
// "pulseColor": "#000000",
//   }).addTo(map);
// });

// document.getElementById('G').addEventListener('click', () => {
// map.eachLayer(function(layer) {
// if (!!layer.toGeoJSON){map.removeLayer(layer);}
// });
// fetch('./mapgeoJSON/floor0.geojson').then(response =>  response.json()).then(data => {
// L.geoJSON(data, {
// style:{color: 'cadetblue',weight: 1,opacity: 1},
// }).addTo(map);
// }).catch(error => console.error('out of service.. ~_~  @_@', error));   
// L.polyline.antPath(points[0],{
// "delay": 600,
// "dashArray": [1,46],
// "weight": 5,
// "color": '#327174',
// "pulseColor": "#000000",
//   }).addTo(map);
// });

// document.getElementById('1').addEventListener('click', () => {
// map.eachLayer(function(layer) {
// if (!!layer.toGeoJSON){map.removeLayer(layer);}
// });
// fetch('./mapgeoJSON/floor1.geojson').then(response =>  response.json()).then(data => {
// L.geoJSON(data, {
// style:{color: 'cadetblue',weight: 1,opacity: 1},
// }).addTo(map);
// }).catch(error => console.error('out of service.. ~_~  @_@', error));   
// L.polyline.antPath(points[1],{
// "delay": 600,
// "dashArray": [1,46],
// "weight": 5,
// "color": '#327174',
// "pulseColor": "#000000",
//   }).addTo(map);
// });

// document.getElementById('2').addEventListener('click', () => {
// map.eachLayer(function(layer) {
// if (!!layer.toGeoJSON){map.removeLayer(layer);}
// });
// fetch('./mapgeoJSON/floor2.geojson').then(response =>  response.json()).then(data => {
// L.geoJSON(data, {
// style:{color: 'cadetblue',weight: 1,opacity: 1},
// }).addTo(map);
// }).catch(error => console.error('out of service.. ~_~  @_@', error));   
// L.polyline.antPath(points[2],{
// "delay": 600,
// "dashArray": [1,46],
// "weight": 5,
// "color": '#327174',
// "pulseColor": "#000000",
//   }).addTo(map);
// });

// document.getElementById('3').addEventListener('click', () => {
// map.eachLayer(function(layer) {
// if (!!layer.toGeoJSON){map.removeLayer(layer);}
// });
// fetch('./mapgeoJSON/floor3.geojson').then(response =>  response.json()).then(data => {
// L.geoJSON(data, {
// style:{color: 'cadetblue',weight: 1,opacity: 1},
// }).addTo(map);
// }).catch(error => console.error('out of service.. ~_~  @_@', error));   
// L.polyline.antPath(points[3],{
// "delay": 600,
// "dashArray": [1,46],
// "weight": 5,
// "color": '#327174',
// "pulseColor": "#000000",
//   }).addTo(map);
// });

// document.getElementById('4').addEventListener('click', () => {
// map.eachLayer(function(layer) {
// if (!!layer.toGeoJSON){map.removeLayer(layer);}
// });
// fetch('./mapgeoJSON/floor4.geojson').then(response =>  response.json()).then(data => {
// L.geoJSON(data, {
// style:{color: 'cadetblue',weight: 1,opacity: 1},
// }).addTo(map);
// }).catch(error => console.error('out of service.. ~_~  @_@', error));   
// L.polyline.antPath(points[4],{
// "delay": 600,
// "dashArray": [1,46],
// "weight": 5,
// "color": '#327174',
// "pulseColor": "#000000",
//   }).addTo(map);
// });

// document.getElementById('5').addEventListener('click', () => {
// map.eachLayer(function(layer) {
// if (!!layer.toGeoJSON){map.removeLayer(layer);}
// });
// fetch('./mapgeoJSON/floor5.geojson').then(response =>  response.json()).then(data => {
// L.geoJSON(data, {
// style:{color: 'cadetblue',weight: 1,opacity: 1},
// }).addTo(map);
// }).catch(error => console.error('out of service.. ~_~  @_@', error));   
// L.polyline.antPath(points[5],{
// "delay": 600,
// "dashArray": [1,46],
// "weight": 5,
// "color": '#327174',
// "pulseColor": "#000000",
//   }).addTo(map);
// });

// document.getElementById('R').addEventListener('click', () => {
// map.eachLayer(function(layer) {
// if (!!layer.toGeoJSON){map.removeLayer(layer);}
// });
// fetch('./mapgeoJSON/floor0.geojson').then(response =>  response.json()).then(data => {
// L.geoJSON(data, {
// style:{color: 'cadetblue',weight: 1,opacity: 1},
// }).addTo(map);
// map.fitBounds(L.geoJSON(data).getBounds());
// }).catch(error => console.error('out of service.. ~_~  @_@', error));   
// points =  [[],[],[],[],[],[],[]]
// });


let curr_slot_data = [];
let curr_floor_geojson = {};

const fetch_curr_slot_details = () => {
    let today = new Date();
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let day_slot = weekdays[today.getDay()];
    let hours = today.getHours();
    let houre = hours + 1;
    hours = (hours > 12) ? String(hours - 12).padStart(2, "0") : String(hours).padStart(2, "0");
    houre = (houre > 12) ? String(houre - 12).padStart(2, "0") : String(houre).padStart(2, "0");
    let time_slot = hours + "-" + houre;
    // return [time_slot, day_slot]
    let requestBody = { floor: floor }; // not needed for now 
    fetch('http://127.0.0.1:3000/getstatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody) // Convert the object to JSON string not needed for now but it can break ;
    })
        .then(response => response.json())
        .then(data => {
            curr_slot_data = data.curr_slot_data;
        })
        .catch(error => console.error('Data about Classes unavailable:', error));
};
fetch_curr_slot_details();
setInterval(() => { fetch_curr_slot_details(); }, 60000);


let getcustommarkings = (room_id) => {
    let coordinates = [];
    curr_floor_geojson[floor].features.forEach(feature => {
        if (feature.properties && feature.properties.room_id && feature.properties.room_id === room_id) {
            coordinates.push(feature.geometry.coordinates);
        }
    });
    let latLngs = [];
    coordinates.forEach(coordinates => {
        coordinates.forEach(coord => {
            latLngs.push([coord[1], coord[0]]); // Leaflet uses [lat, lng] format
        });
    });
    return latLngs;
}
const highlightroom = (req_room_id) => {
    curr_floor_geojson[floor].features.forEach(feature => {
        if (feature.properties && feature.properties.room_id && feature.properties.room_id == req_room_id) {
            let cc = getcustommarkings(feature.properties.room_id);
            L.polygon(cc, { "color": 'green', weight: 2, opacity: 0.5 }).addTo(map);
        }
    });
}
const preloadFloorGeoJSON = async () => {
    try {
        for (let floor = 0; floor <= 5; floor++) {
            const response = await fetch(`./mapgeoJSON/floor${floor}.geojson`);
            const data = await response.json();
            curr_floor_geojson[floor] = data;
        }
        console.log("=========================asdasl;jdklasjdksajldk=================")
        console.log(curr_floor_geojson)
    } catch (error) {
        console.error('Error preloading floor GeoJSON data:', error);
    }
};
preloadFloorGeoJSON();

