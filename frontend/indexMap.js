const map = L.map(('map'), {
    center: [30.2734504, 77.9997427],
    zoom: 20,
    zoomAnimation: true,
    maxZoom: 22,
    minZoom: 18,
    zoomControl: false
});
// let map = L.map(('map'), {}).setView(latling, 18);
const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: `<p><a href="https://github.com/ayush-saklani"><img src="https://flagcdn.com/in.svg" width="15" alt="India"><b> Made by Ayush Saklani</b></a>
    <br>Co-powered by <a href="https://github.com/ayush-saklani/classsync"><b>Classsync</b></a></p>`,
}).addTo(map);
//base map from open streetmap added 
// const serverlink = "http://localhost:3001";                     // navit local server link
// const serverlink2 = "http://localhost:3000";                    // classsync local server link
const serverlink = "https://navit.onrender.com";             // navit online render server link
const serverlink2 = "https://classsync-25hj.onrender.com";    // classsync online render server link
let floorMap;
let pathPoints = [[], [], [], [], [], [], []] // defined because it looks for floors o n start 
let room_status_data;
let loaderCounter = 0;
const LoaderManager = (plus) => {        // loader counter 0 = decrease  1 = increase
    // console.log("counter"+loaderCounter);
    if (plus == 1) {
        loaderCounter++;
    } else if (plus == 0) {
        loaderCounter--;
    }
    if (loaderCounter > 0) {
        document.getElementById("loader").style.display = "flex";
    } else if (loaderCounter == 0) {
        document.getElementById("loader").style.display = "none";
    }
}

const fetchGeoJSON = () => {
    return new Promise((resolve, reject) => {
        LoaderManager(1);
        fetch(`${serverlink}/getmap`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data.data);
                floorMap = data.data;
                document.getElementById(0).click();         // auto click on the ground floor
                LoaderManager(0);
                resolve(data);
            }).catch(error => {
                console.error('out of service.. ~_~  @_@', error);
                LoaderManager(0);
                reject(error);
            });
    });
}
const fetch_calculate_antpath = () => {
    return new Promise((resolve, reject) => {
        LoaderManager(1);
        source = document.getElementById("Start").value;
        destination = document.getElementById("destination").value;
        console.log(`source:${source} => destination:${destination}`);
        let floor = Math.floor(source / 1000) - 1;

        fetch(`${serverlink}/getCoordinates?src=${source}&des=${destination}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data.data);
                pathPoints = data.data;
                document.getElementById(floor).click();
                LoaderManager(0);
                resolve();
            }).catch(error => {
                console.error('Error fetching path coordinates:', error);
                LoaderManager(0);
                reject(error);
            });
    });
};
const renderMapAndPath = (currFloorData, floor) => {
    LoaderManager(1);
    map.eachLayer((layer) => {
        if (!!layer.toGeoJSON) { map.removeLayer(layer); }
    });
    L.geoJSON(currFloorData, {
        style: { color: 'cadetblue', weight: 1, opacity: 1 }, //  ,fillOpacity: 0.5 // fill : bool
    }).addTo(map);
    // console.log(floor)
    // console.log(pathPoints[floor]);
    L.polyline.antPath(pathPoints[floor], {
        "delay": 600,
        "dashArray": [1, 46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
    }).addTo(map);
    LoaderManager(0);
};
const circularButtonEventListener = () => {         // event listener for circular floor buttons
    LoaderManager(1);
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            let currfloormap;
            for (ele in floorMap) {
                if (floorMap[ele].floor === btn.id) {
                    currfloormap = floorMap[ele]
                    console.log(currfloormap);
                }
            }
            renderMapAndPath(currfloormap, eval(btn.id) + 1); // +1 because floor starts from 1 UG = 0 ,G = 1 ...
            renderRoomStatusAndDetail(currfloormap);
        });
    });
    LoaderManager(0);
};
const fetch_room_status = () => {		// fetches the room list from the server
    return new Promise((resolve, reject) => {
        LoaderManager(1);
        fetch(`${serverlink2}/room/getall`, {            // fetches the room list from the CLASSSYNC API
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
                LoaderManager(0);
                resolve(data);
            }).catch(error => {
                console.error(':::: Room Data not available (SERVER ERROR) :::: ');
                LoaderManager(0);
                reject(error);
            });
    });
};


let getSpecificRoomCoordinates = (floordata, room_id) => {      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
    LoaderManager(1)
    let coordinates = [];
    floordata.features.forEach(feature => {
        if (feature.properties && feature.properties.room_id) {
            if (feature.properties.room_id === room_id) {
                if (feature.geometry.type === "Polygon") {
                    coordinates.push(feature.geometry.coordinates[0]);
                }
                else {
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
    LoaderManager(0);
    return latLngs;
}
const renderRoomStatusAndDetail = (floordata) => {
    LoaderManager(1);
    let today = new Date();
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let day_slot = weekdays[today.getDay()];
    let hours = today.getHours();
    if (hours == 0) hours = 12;          // 12 am is 0 in js
    let houre = hours + 1;
    hours = (hours > 12) ? String(hours - 12).padStart(2, "0") : String(hours).padStart(2, "0");
    houre = (houre > 12) ? String(houre - 12).padStart(2, "0") : String(houre).padStart(2, "0");
    let time_slot = hours + "-" + houre;
    time_slot = (time_slot).toString();
    // console.log(time_slot)
    // console.log(day_slot)
    let timeslots = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"]
    if (!timeslots.includes(time_slot)) {
        time_slot = "08-09";
    }
    for (room in room_status_data) {
        // console.log(room_status_data[room].schedule[day_slot][time_slot].section.length)
        // console.log(room_status_data[room].roomid)
        if (room_status_data[room].schedule[day_slot][time_slot].section.length > 0) {
            // console.log("asdas")
            floordata.features.forEach(feature => {
                if (feature.properties && feature.properties.room_id && feature.properties.room_id == room_status_data[room].roomid) {
                    let cc = getSpecificRoomCoordinates(floordata, room_status_data[room].roomid);      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
                    let polygon = L.polygon(cc, { "color": "#cc2412", weight: 0.8, opacity: 10 }).addTo(map);
                    let center = polygon.getBounds().getCenter();
                    let textIcon = L.divIcon({
                        className: 'text-icon',
                        html: room_status_data[room].name,
                        iconSize: [0, 0],
                        iconAnchor: [0, 0]
                    });
                    L.marker(center, { icon: textIcon }).addTo(map);
                    // Add a marker with the text icon at the center of the polygon
                }
            });
        }
        else if (room_status_data[room].schedule[day_slot][time_slot].section.length == 0) {
            floordata.features.forEach(feature => {
                // console.log("asdas");
                if (feature.properties && feature.properties.room_id && feature.properties.room_id == room_status_data[room].roomid) {
                    let cc = getSpecificRoomCoordinates(floordata, room_status_data[room].roomid);      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
                    let polygon = L.polygon(cc, { "color": "#457c46", weight: 0.8, opacity: 10 }).addTo(map);
                    let center = polygon.getBounds().getCenter();
                    let textIcon = L.divIcon({
                        className: 'text-icon',
                        html: room_status_data[room].name,
                        iconSize: [0, 0],
                        iconAnchor: [0, 0]
                    });
                    L.marker(center, { icon: textIcon }).addTo(map);
                    // Add a marker with the text icon at the center of the polygon
                }
            });
        }
    };
    floordata.features.forEach(feature => {             // for aminities like washroom etc
        const aminities = [
            "1051", "1029", "1099", "1083",
            "2051", "2029", "2099", "2083",
            "3051", "3029", "3099", "3083",
            "4051", "4029", "4099", "4083",
            "5051", "5029", "5099", "5083",
            "6051", "6029", "6099", "6083"
        ]
        if (feature.properties && feature.properties.room_id && aminities.includes(feature.properties.room_id)) {
            let cc = getSpecificRoomCoordinates(floordata, feature.properties.room_id);
            let polygon = L.polygon(cc, { "color": 'blue', weight: 0.8, opacity: 10 }).addTo(map);
            let center = polygon.getBounds().getCenter();
            let textIcon = L.divIcon({
                className: 'text-icon',
                html: "WC",
                iconSize: [0, 0],
                iconAnchor: [0, 0]
            });
            L.marker(center, { icon: textIcon }).addTo(map);
            // Add a marker with the text icon at the center of the polygon 
        }
    });
    LoaderManager(0);
};
document.getElementById('go').addEventListener('click', () => { fetch_calculate_antpath(); });
document.getElementById('Start').addEventListener('change', () => { fetch_calculate_antpath(); });
document.getElementById('destination').addEventListener('change', () => { fetch_calculate_antpath(); });
document.addEventListener("DOMContentLoaded", async () => {
    await fetchGeoJSON();
    circularButtonEventListener();
    await fetch_room_status();
    document.getElementById(0).click();         // auto click on the ground floor
})
setTimeout(() => {
    fetch_room_status();
}, 1000 * 60 * 45); // 45 minutes 