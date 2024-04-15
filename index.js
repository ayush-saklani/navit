const map = L.map(('map'),{
    center: [30.2734504,77.9997427],
    zoomAnimation:true,
    maxZoom: 22,
    minZoom:15,
    zoomControl: false 
});
// let map = L.map(('map'), {}).setView(latling, 18);
const tileurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tile = L.tileLayer(tileurl,{
    attribution: '&copy; <p><a href="https://github.com/ayush-saklani"><img src="https://flagcdn.com/in.svg" width="15" alt="India"> Tempest</a></p>'
}).addTo(map);

//base map from open streetmap added 

let floor = 0;let temp_point=0;
let points =  [[],[],[],[],[],[],[]]
document.getElementById('go').addEventListener('click', () => {
    var source = document.getElementById("Start").value;
    var destination = document.getElementById("destination").value;
    
    if(source>0 && source<1000)        floor=0;
    else if(source>=1000 && source<2000)    floor=1;
    else if(source>=2000 && source<3000)    floor=2;
    else if(source>=3000 && source<4000)    floor=3;
    else if(source>=4000 && source<5000)    floor=4;
    else if(source>=5000 && source<6000)    floor=5;
    else if(source>=6000 && source<7000)    floor=-1;
    console.log(source);
    console.log(destination);
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
        if(floor==-1){
            temp_point = 6;
        }
        geoJSONEvent(floor,temp_point);
        let go_active_id = floor;
        if(floor==0){
            go_active_id="G";
        }           
        active(document.getElementById(go_active_id));
    })
    .catch(error => console.error('Error hai bhaisaab:', error));
});


// intitialize  the map with default view and zoom level
fetch(`./mapgeoJSON/floor${floor}.geojson`).then(response =>  response.json()).then(data => {
    L.geoJSON(data, {
        style:{color: 'cadetblue',weight: 1,opacity: 1},
    }).addTo(map);
    map.fitBounds(L.geoJSON(data).getBounds());
}).catch(error => console.error('out of service.. ~_~  @_@', error));  


const geoJSONEvent =  (mapfloor,pathfloor) => {
    map.eachLayer((layer) => {
        if (!!layer.toGeoJSON){map.removeLayer(layer);}
    });
    fetch(`./mapgeoJSON/floor${mapfloor}.geojson`).then(response =>  response.json()).then(data => {
        L.geoJSON(data, {
            style:{color: 'cadetblue',weight: 1,opacity: 1},
        }).addTo(map);
    }).catch(error => console.error('out of service.. ~_~  @_@', error));   
    L.polyline.antPath(points[pathfloor],{
        "delay": 600,
        "dashArray": [1,46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
      }).addTo(map);
};
let add_GeoJSON_EventListener = () => {
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            let mapfloor;
            let pathfloor;
            if(btn.id === 'G'){
                mapfloor = pathfloor = 0
            }
            else if(btn.id == '-1'){
                mapfloor=-1;pathfloor = 6;
            }
            else {
                mapfloor = pathfloor = btn.id;
            }
            geoJSONEvent(mapfloor,pathfloor);
        });
    });
}
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