const map = L.map(('map'), {
    center: [30.2734504, 77.9997427],
    zoomAnimation: true,
    maxZoom: 22,
    minZoom: 18,
    zoomControl: false
});
// let map = L.map(('map'), {}).setView(latling, 18);
const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <p><a href="https://github.com/ayush-saklani"><img src="https://flagcdn.com/in.svg" width="15" alt="India"> Tempest</a></p>'
}).addTo(map);
//base map from open streetmap added 

let source, destination;
let points = [[], [], [], [], [], [], []]
let floor = 0, temp_point = 0, pathfloorindex = 0;
let curr_slot_data = [];
let curr_floor_geojson = {};

// intitialize  the map with default view and zoom level
const Load_geoJSON = () => {
    fetch(`./assets/mapgeoJSON/floor${floor}.geojson`)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: { color: 'cadetblue', weight: 1, opacity: 1 },
            }).addTo(map);
            map.fitBounds(L.geoJSON(data).getBounds()).setView([30.27332, 77.99979], 18);
        })
        .catch(error => console.error('out of service.. ~_~  @_@', error));
}
Load_geoJSON()

const calculate_antpath = () => {
    source = document.getElementById("Start").value;
    destination = document.getElementById("destination").value;
    if (source >= 6000 && source < 7000){
        floor = -1;
    }
    else{
        floor = Math.floor(source / 1000);
    }
    console.log(`${source}  => ${destination}`);
    
    fetch('http://127.0.0.1:3000/getCoordinates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            src: source,
            des: destination
        })
    }).then(response => response.json())
    .then(data => {
        points = data;
        temp_point = floor;
        if (floor == -1) {
            temp_point = 6;
        }
        Load_geoJSON_Event(floor, temp_point);
        let go_active_id = floor;
        if (floor == 0) {
            go_active_id = "G";
        }
        active(document.getElementById(go_active_id));
    }).catch(error => console.error('Error hai bhaisaab:', error));
};
const Load_geoJSON_Event = (mapfloor, pathfloor) => {
    map.eachLayer((layer) => {
        if (!!layer.toGeoJSON) { map.removeLayer(layer); }
    });
    fetch(`./assets/mapgeoJSON/floor${mapfloor}.geojson`).then(response => response.json()).then(data => {
        L.geoJSON(data, {
            style: { color: 'cadetblue', weight: 1, opacity: 1 }, //  ,fillOpacity: 0.5 // fill : bool
        }).addTo(map);
    }).catch(error => console.error('out of service.. ~_~  @_@', error));
    
    L.polyline.antPath(points[pathfloor], {
        "delay": 600,
        "dashArray": [1, 46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
    }).addTo(map);
    setTimeout(() => {
        render_slot_detail();
    }, 500);
};
const add_GeoJSON_EventListener = () => {
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            let mapfloor;
            let pathfloor;
            if (btn.id === 'G') {
                mapfloor = temp_point = pathfloor = pathfloorindex = 0
            }
            else if (btn.id == '-1') {
                mapfloor = -1;
                temp_point = pathfloor = pathfloorindex = 6;
            }
            else {
                mapfloor = temp_point = pathfloor = pathfloorindex = btn.id;
            }
            floor = mapfloor;
            Load_geoJSON_Event(mapfloor, pathfloor);
        });
    });
};
add_GeoJSON_EventListener();

let getcustommarkings = (room_id) => {
    let coordinates = [];
    curr_floor_geojson[temp_point].features.forEach(feature => {
        if (feature.properties && feature.properties.room_id && feature.properties.room_id === room_id) {
            if(feature.geometry.type === "Polygon"){
                coordinates.push(feature.geometry.coordinates[0]);
            }
            else{
                coordinates.push(feature.geometry.coordinates);
            }
        }
    });
    let latLngs = [];
    coordinates.forEach(coordinates => {
        coordinates.forEach(coord => {
            latLngs.push([coord[1], coord[0]]); // Leaflet uses [lat, lng] format not [lng, lat] so this
        });
    });
    return latLngs;
}
const highlightroom = (req_room_id) => {
    curr_floor_geojson[btn.id].features.forEach(feature => {
        if (feature.properties && feature.properties.room_id && feature.properties.room_id == req_room_id) {
            let cc = getcustommarkings(feature.properties.room_id);
            L.polygon(cc, { "color": 'black', weight: 2, opacity: 2 }).addTo(map);
        }
    });
}
const preloadFloorGeoJSON = async () => {
    try {
        for (let i = 0; i <= 6; i++) {
            if(i < 6){
                const response = await fetch(`./assets/mapgeoJSON/floor${i}.geojson`);
                const data = await response.json();
                curr_floor_geojson[i] = data;
            }
            else if(i===6){
                const response = await fetch('./assets/mapgeoJSON/floor-1.geojson');
                const data = await response.json();
                curr_floor_geojson[i] = data;
            }
        }
        console.log("=================== all map reading finish successfully =================")
        console.log(curr_floor_geojson)
    } catch (error) {
        console.error('Error preloading floor GeoJSON data:', error);
    }
};
preloadFloorGeoJSON();
const render_aminities = () => {
    const aminities = [ "51",  "29",  "99",  "83",
                        "1051","1029","1099","1083",
                        "2051","2029","2099","2083",
                        "3051","3029","3099","3083",
                        "4051","4029","4099","4083",
                        "5051","5029","5099","5083"
                    ];
    aminities.forEach(element => {
        let latLng = getcustommarkings(element);
        L.polygon(latLng, { "color": 'blue', weight: 0.5, opacity: 0.5 }).addTo(map);
    });
}
const render_slot_detail = () => {
    let today = new Date();
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let day_slot = weekdays[today.getDay()];
    let hours = today.getHours();
    let houre = hours + 1;
    hours = (hours > 12) ? String(hours - 12).padStart(2, "0") : String(hours).padStart(2, "0");
    houre = (houre > 12) ? String(houre - 12).padStart(2, "0") : String(houre).padStart(2, "0");
    let time_slot = hours + "-" + houre;
    time_slot = (time_slot).toString();
    // return [time_slot, day_slot]
    fetch('http://127.0.0.1:3000/getstatus', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json()).then(data => {
        curr_slot_data = data;
    })
    .catch(error => console.error('Data about Classes unavailable:', error));
    
    console.log(time_slot)
    render_aminities();
    time_slot = "08-09"
    day_slot = 'mon'                     //for tesing purpose should be deleted lator 
    curr_slot_data.forEach(slot => {
        if (slot.schedule[day_slot][time_slot].teacher_ID != null) {
            curr_floor_geojson[temp_point].features.forEach(feature => {
                if (feature.properties && feature.properties.room_id && feature.properties.room_id == slot.room_id) {
                    let cc = getcustommarkings(slot.room_id);
                    L.polygon(cc, { "color": 'red', weight: 1, opacity: 0.5 }).addTo(map);
                } 
            });
        }
        else if (slot.schedule[day_slot][time_slot].teacher_ID == null) {
            console.log("asdas")
            curr_floor_geojson[temp_point].features.forEach(feature => {
                if (feature.properties && feature.properties.room_id && feature.properties.room_id == slot.room_id) {
                    let cc = getcustommarkings(slot.room_id);
                    L.polygon(cc, { "color": 'green', weight: 0.5, opacity: 0.5 }).addTo(map);
                }
            });
        }
    });
};
const fetch_curr_slot_details = () => {
    fetch('http://127.0.0.1:3000/getstatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ floor: floor }) // Convert the object to JSON string not needed for now but it can break ;
    }).then(response => response.json())
    .then(data => {
        curr_slot_data = data;
        Load_geoJSON_Event(floor, pathfloorindex)
        console.log("updated");
    }).catch(error => ()=>{
        console.error('Data about Classes unavailable:', error);
    });
};
fetch_curr_slot_details();
setInterval(() => { fetch_curr_slot_details(); }, 60000);