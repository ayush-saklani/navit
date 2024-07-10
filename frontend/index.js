let floorMap;
let points = [[], [], [], [], [], [], []]
let source, destination;
let floor = 0, temp_point = 0, pathfloorindex = 0;
let curr_slot_data = [];
let curr_floor_geojson = {};
// L.geoJSON(data, {
//     style: { color: 'cadetblue', weight: 1, opacity: 1 },
// }).addTo(map);
// map.fitBounds(L.geoJSON(data).getBounds()).setView([30.27332, 77.99979], 18);

// intitialize  the map with default view and zoom level


const calculate_antpath = () => {
    return new Promise((resolve,reject) => {
        source = document.getElementById("Start").value;
        destination = document.getElementById("destination").value;
        floor = Math.floor(source / 1000);
        console.log(`${source}  => ${destination}`);
        
        fetch(`http://localhost:3000/getCoordinates?src=${source}&des=${destination}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            points = data;
            active(document.getElementById(go_active_id));
            resolve();
        }).catch(error => {
            console.error('Error fetching path coordinates:', error);
            reject(error);
        });
    });
};


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


document.addEventListener('DOMContentLoaded', () => {
    Load_geoJSON(floor);
});
