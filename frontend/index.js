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






const highlightroom = (req_room_id) => {
    curr_floor_geojson[btn.id].features.forEach(feature => {
        if (feature.properties && feature.properties.room_id && feature.properties.room_id == req_room_id) {
            let cc = getcustommarkings(feature.properties.room_id);
            L.polygon(cc, { "color": 'black', weight: 2, opacity: 2 }).addTo(map);
        }
    });
}

const render_aminities = () => {
    const aminities = [
        "1051","1029","1099","1083",
        "2051","2029","2099","2083",
        "3051","3029","3099","3083",
        "4051","4029","4099","4083",
        "5051","5029","5099","5083",
        "6051","6029","6099","6083"
    ]
    aminities.forEach(element => {
        let latLng = getcustommarkings(element);
        L.polygon(latLng, { "color": 'blue', weight: 0.5, opacity: 0.5 }).addTo(map);
    });
}

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
