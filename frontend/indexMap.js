const map = L.map(('map'), {
    center: [30.2734504, 77.9997427],
    zoom: 18,
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

let floorMap;
let pathPoints = [[], [], [], [], [], [], []] // defined because it looks for floors o n start 
let curr_slot_data = [];
let curr_floor_geojson = {};
let room_status_data;

const fetchGeoJSON = () => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3001/getmap`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data.data);
            floorMap = data.data;
            document.getElementById(0).click();         // auto click on the ground floor
            resolve(data);
        }).catch(error => {
            console.error('out of service.. ~_~  @_@', error);
            reject(error);
        });
    });
}
const calculate_antpath = () => {
    return new Promise((resolve,reject) => {
        source = document.getElementById("Start").value;
        destination = document.getElementById("destination").value;
        console.log(`source:${source} => destination:${destination}`);
        let floor = Math.floor(source/1000)-1 ; 
        
        fetch(`http://localhost:3001/getCoordinates?src=${source}&des=${destination}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data.data);
            pathPoints = data.data;
            document.getElementById(floor).click();
            resolve();
        }).catch(error => {
            console.error('Error fetching path coordinates:', error);
            reject(error);
        });
    });
};
const renderMapAndPath = (currFloorData,floor) => {
    map.eachLayer((layer) => {
        if (!!layer.toGeoJSON) { map.removeLayer(layer); }
    });
    L.geoJSON(currFloorData, {
        style: { color: 'cadetblue', weight: 1, opacity: 1 }, //  ,fillOpacity: 0.5 // fill : bool
    }).addTo(map);
    console.log(floor)
    console.log(pathPoints[floor]);
    L.polyline.antPath(pathPoints[floor], {
        "delay": 600,
        "dashArray": [1, 46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
    }).addTo(map);
};
const circularButtonEventListener = () => {         // event listener for circular floor buttons
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            let currfloormap;
            for(ele in floorMap){
                if(floorMap[ele].floor === btn.id){
                    currfloormap = floorMap[ele]
                    console.log(currfloormap);
                }
            }
            renderMapAndPath(currfloormap,eval(btn.id)+1); // +1 because floor starts from 1 UG = 0 ,G = 1 ...
            render_slot_detail(currfloormap);
        });
    });
};
const fetch_room_status = () => {		// fetches the room list from the server
	fetch(`http://localhost:3000/room/getall`, {            // fetches the room list from the CLASSSYNC API
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json())
	.then(data => {
		data = data.data;
        room_status_data = data;
		console.log(data);
        document.getElementById(0).click();         // auto click on the ground floor
	}).catch(error => {
		console.error(':::: Room Data not available (SERVER ERROR) :::: ', error)
	});
};	


let getcustommarkings = (floordata,room_id) => {      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
    let coordinates = [];
    floordata.features.forEach(feature => {
        if (feature.properties && feature.properties.room_id ){
            if (feature.properties.room_id === room_id) {
                if(feature.geometry.type === "Polygon"){
                    coordinates.push(feature.geometry.coordinates[0]);
                }
                else{
                    coordinates.push(feature.geometry.coordinates);
                }
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
const render_slot_detail = (floordata) => {
    let today = new Date();
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let day_slot = weekdays[today.getDay()];
    // let hours = today.getHours();
    let hours = 9;                          // for testing purpose should be deleted later
    let houre = hours + 1;
    hours = (hours > 12) ? String(hours - 12).padStart(2, "0") : String(hours).padStart(2, "0");
    houre = (houre > 12) ? String(houre - 12).padStart(2, "0") : String(houre).padStart(2, "0");
    let time_slot = hours + "-" + houre;
    time_slot = (time_slot).toString();
    console.log(time_slot)
    console.log(day_slot)
    // render_aminities();                  // add later ############################## 
    // time_slot = "08-09"
    // day_slot = 'mon'                     //for tesing purpose should be deleted lator
    // fetch_room_status();                 //for tesing purpose should be deleted lator
    for(room in room_status_data){
        // console.log(room_status_data[room].schedule[day_slot][time_slot].section.length)
        // console.log(room_status_data[room].roomid)
        if (room_status_data[room].schedule[day_slot][time_slot].section.length > 0) {
            // console.log("asdas")
            floordata.features.forEach(feature => {
                if (feature.properties && feature.properties.room_id && feature.properties.room_id == room_status_data[room].roomid) {
                    let cc = getcustommarkings(floordata,room_status_data[room].roomid);      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
                    L.polygon(cc, { "color": 'red', weight: 1, opacity: 0.5 }).addTo(map);
                } 
            });
        }
        else if (room_status_data[room].schedule[day_slot][time_slot].section.length == 0) {
            floordata.features.forEach(feature => {
                // console.log("asdas");
                if (feature.properties && feature.properties.room_id && feature.properties.room_id == room_status_data[room].roomid) {
                    let cc = getcustommarkings(floordata,room_status_data[room].roomid);      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
                    L.polygon(cc, { "color": 'green', weight: 0.5, opacity: 0.5 }).addTo(map);
                }
            });
        }
    };
};
document.addEventListener("DOMContentLoaded",()=>{
    circularButtonEventListener();    
    fetch_room_status();
    fetchGeoJSON();
})
setTimeout(() => {
    fetch_room_status();
}, 1000*60*45); // 45 minutes 