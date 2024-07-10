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
let source, destination;
let floor = 0, temp_point = 0, pathfloorindex = 0;
let curr_slot_data = [];
let curr_floor_geojson = {};

const fetchGeoJSON = () => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/getmap`,{
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
        
        fetch(`http://localhost:3000/getCoordinates?src=${source}&des=${destination}`, {
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
const Load_geoJSON_Event = (currFloorData,floor) => {
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
const circularButtonEventListener = () => {
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
            Load_geoJSON_Event(currfloormap,eval(btn.id)+1); // +1 because floor starts from 1 UG = 0 ,G = 1 ...
        });
    });
};
document.addEventListener("DOMContentLoaded",()=>{
    fetchGeoJSON();
    circularButtonEventListener();
})