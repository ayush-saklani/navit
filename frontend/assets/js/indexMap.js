const map = L.map(('map'), {
    center: [30.2734504, 77.9997427],
    zoom: 20,
    zoomAnimation: true,
    maxZoom: 22,
    minZoom: 16,
    zoomControl: false
});
map.on('zoomend', function() {
    console.log(map.getZoom());
    let currzoom = map.getZoom();
    if(currzoom < 18){
        document.querySelectorAll('.text-icon-size').forEach(element => {
            element.style.fontSize = '0px';
        });
        document.querySelectorAll('.text-icon-hide').forEach(element => {
            element.style.visibility = 'hidden';
        });
    }else if(currzoom >= 18 && currzoom < 20){
        document.querySelectorAll('.text-icon-size').forEach(element => {
            element.style.fontSize = 'smaller';
        });
        document.querySelectorAll('.text-icon-hide').forEach(element => {
            element.style.visibility = 'hidden';
        });
    }else if(currzoom >= 20 && currzoom < 21){
        document.querySelectorAll('.text-icon-size').forEach(element => {
            element.style.fontSize = 'small';
        });
        document.querySelectorAll('.text-icon-hide').forEach(element => {
            element.style.visibility = 'hidden';
        });
    }else if(currzoom >= 21 && currzoom < 22){
        document.querySelectorAll('.text-icon-size').forEach(element => {
            element.style.fontSize = 'large';
        });
        document.querySelectorAll('.text-icon-hide').forEach(element => {
            element.style.visibility = 'visible';
        });
    }else if(currzoom >= 22){
        document.querySelectorAll('.text-icon-size').forEach(element => {
            element.style.fontSize = 'x-large';
        });
        document.querySelectorAll('.text-icon-hide').forEach(element => {
            element.style.display = 'block';
        });
    }
});
// let map = L.map(('map'), {}).setView(latling, 18);
const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: `<p><a href="https://github.com/ayush-saklani"><img src="https://flagcdn.com/in.svg" width="15" alt="India"><b> Made by Ayush Saklani</b></a>
    <br>Co-powered by <a href="https://github.com/ayush-saklani/classsync"><b>Classsync</b></a></p>`,
}).addTo(map);
//base map from open streetmap added 
// const serverlink = "http://localhost:3001";                         // navit local server link
// const serverlink2 = "http://localhost:3000";                        // classsync local server link
// const serverlink = "https://navit.onrender.com";                    // navit online render server link
// const serverlink2 = "https://classsync-3ht1.onrender.com";          // classsync online render server link
const serverlink =  "https://navit.azurewebsites.net";              // navit azure server link 
const serverlink2 = "https://class-sync-azure.azurewebsites.net";   // classsync azure server link
let floorMap;
let pathPoints = [[], [], [], [], [], [], []] // defined because it looks for floors o n start 
let pathDistance = 0;
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
        document.getElementById("currtime").style.display = "none";
    } else if (loaderCounter == 0) {
        document.getElementById("loader").style.display = "none";
        document.getElementById("currtime").style.display = "flex";
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
                document.getElementById("hitcount").innerHTML = `${data.hitcount}`;
                console.log(data);
                floorMap = data.data;
                LoaderManager(0);
                document.getElementById(0).click();         // auto click on the ground floor
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
                pathPoints = data.data.antpath;
                pathDistance = data.data.distance;
                let tempTime = Math.round(pathDistance)/2;
                let message = `<b class="h4 fw-bold">Go</b>`
                if(tempTime < 60){
                    message = "~1 min";
                }else{
                    message = `${Math.ceil(tempTime/60)+1}min`;
                }
                document.getElementById("go").innerHTML = `<b class="h4 fw-bold"><i class="bi bi-person-walking"></i>${message}</b>`;
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
        style: {
            color: "var(--Dim-Blue)",
            weight: 1.5, 
            opacity: 1,
            fillColor: "var(--Dim-Blue)",
            // fillOpacity: 0.1,
        }, //  ,fillOpacity: 0.5 // fill : bool
    }).addTo(map);
    // console.log(floor)
    // console.log(pathPoints[floor]);
    L.polyline.antPath(pathPoints[floor], {
        opacity: 0.8,
        "delay": 800,
        "dashArray": [1, 46],
        "weight": 6,
        "color": 'var(--pulseColor)',
        "pulseColor": "var(--pulseColor2)",
    }).addTo(map);
    LoaderManager(0);
};
const circularButtonEventListener = () => {         // event listener for circular floor buttons
    return new Promise((resolve, reject) => {
        try{
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
                    renderMapAndPath(currfloormap.map, eval(btn.id) + 1); // +1 because floor starts from 1 UG = 0 ,G = 1 ...
                    renderRoomStatusAndDetail(currfloormap.map);
                });
            });
            LoaderManager(0);
            resolve();
        }
        catch(error){
            console.error('Error in circularButtonEventListener:', error);
            LoaderManager(0);
            reject(error);
        }
    });
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
                LoaderManager(0);
                document.getElementById(0).click();         // auto click on the ground floor
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
    // hours = 10;                          // for testing
    if (hours == 0) hours = 12;             // 12 am is 0 in js
    let houre = hours + 1;
    hours = (hours > 12) ? String(hours - 12).padStart(2, "0") : String(hours).padStart(2, "0");
    houre = (houre > 12) ? String(houre - 12).padStart(2, "0") : String(houre).padStart(2, "0");
    let time_slot = hours + "-" + houre;
    time_slot = (time_slot).toString();
    // console.log(time_slot)
    // console.log(day_slot)
    document.getElementById("currtime").innerHTML = `${time_slot}`;
    let timeslots = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"]
    document.getElementById("currtime").innerHTML = `${day_slot.toLocaleUpperCase()} ${time_slot}`;
    if (!timeslots.includes(time_slot)) {
        time_slot = "08-09";
    }
    // if((hours >= 18 && hours <= 23) || (hours >= 0 && hours <= 7)){     // for testing only
    if((today.getHours() >= 18 && today.getHours() <= 23) || (today.getHours() >= 0 && today.getHours() <= 7)){
        for (room in room_status_data) {
            floordata.features.forEach(feature => {
                if (feature.properties && feature.properties.room_id && feature.properties.room_id == room_status_data[room].roomid) {
                    let cc = getSpecificRoomCoordinates(floordata, room_status_data[room].roomid);      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
                    let polygon = L.polygon(cc, { 
                        color : "var(--Hard-Background)",
                        opacity: 0.2,
                        fillColor: "var(--Dim-Blue)",
                        fillOpacity: 0.5,
                    }).addTo(map);
                    let center = polygon.getBounds().getCenter();
                    let textIcon = L.divIcon({
                        className: 'text-icon-white text-icon-size',
                        html: room_status_data[room].name,
                        iconSize: [0, 0],
                        iconAnchor: [0, 0]
                    });
                    L.marker(center, { icon: textIcon }).addTo(map);
                    // Add a marker with the text icon at the center of the polygon
                }
            });
        }
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
                let polygon = L.polygon(cc, { 
                    color : "var(--Hard-Background)",
                    opacity: 0.1,
                    fillColor: "DarkCyan",
                    fillOpacity: 0.5,
    
                }).addTo(map);
                let center = polygon.getBounds().getCenter();
                let textIcon = L.divIcon({
                    className: 'text-icon-white text-icon-size',
                    html: "WC",
                    iconSize: [0, 0],
                    iconAnchor: [0, 0]
                });
                L.marker(center, { icon: textIcon }).addTo(map);
                // Add a marker with the text icon at the center of the polygon 
            }
        });
        document.getElementById("currtime").innerHTML = `<i class="bi bi-moon-stars-fill pe-2"></i> Campus<br>Closed`;
        LoaderManager(0);
        return ;
    }
    for (room in room_status_data) {
        // console.log(room_status_data[room].schedule[day_slot][time_slot].section.length)
        // console.log(room_status_data[room].roomid)
        if (room_status_data[room].schedule[day_slot][time_slot].section.length > 0) {
            // console.log("asdas")
            floordata.features.forEach(feature => {
                if (feature.properties && feature.properties.room_id && feature.properties.room_id == room_status_data[room].roomid) {
                    let cc = getSpecificRoomCoordinates(floordata, room_status_data[room].roomid);      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
                    let polygon = L.polygon(cc, { 
                        color : "var(--Hard-Background)",
                        opacity: 0.1,
                        fillColor: "var(--Red)",
                        fillOpacity: 0.5,
                    }).addTo(map);
                    let center = polygon.getBounds().getCenter();
                    let temproomdata = room_status_data[room].schedule[day_slot][time_slot];
                    let textIcon = L.divIcon({
                        className: 'text-icon text-icon-size',
                        html: room_status_data[room].name,
                        iconSize: [0, 0],
                        iconAnchor: [0, 0]
                    });
                    L.marker(center, { icon: textIcon }).addTo(map);
                    temproomdata = room_status_data[room].schedule[day_slot][time_slot];
                    textIcon = L.divIcon({
                        className: 'text-icon text-icon-size text-icon-hide',
                        html: room_status_data[room].name +" "+ temproomdata.course +" Section:" +temproomdata.section + " " + temproomdata.subjectcode + " " ,
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
                    let polygon = L.polygon(cc, {
                        color : "var(--Hard-Background)",
                        opacity: 0.1,
                        fillColor: "var(--Aqua)",
                        fillOpacity: 0.5,
                    }).addTo(map);
                    let center = polygon.getBounds().getCenter();
                    let textIcon = L.divIcon({
                        className: 'text-icon text-icon-size',
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
            let polygon = L.polygon(cc, { 
                color : "var(--Hard-Background)",
                opacity: 0.1,
                fillColor: "DarkCyan",
                fillOpacity: 0.5,

            }).addTo(map);
            let center = polygon.getBounds().getCenter();
            let textIcon = L.divIcon({
                className: 'text-icon text-icon-size',
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
    await circularButtonEventListener();
    await fetchGeoJSON();
    setTimeout(() => {
        document.getElementById('navitloader').style.display = "none";
    }, 3000);
    LoaderManager(1);
    await fetch_room_status();
    LoaderManager(0);
})
setInterval(() => {
    fetch(`${serverlink}/keepmeawake`, {            // keeps the server awake by sending a request every 1 minute
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Handshake failed');
        }
    }).then(() => {
        console.log("Still up and kicking Boi 🏃🏻‍♂️...💨");
    }).catch(error => {
        console.error('Handshake failed:', error);
    });
}, 60000);  // 1 minute