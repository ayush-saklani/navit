const map = L.map(('map'),{
    center: [30.2734504,77.9997427],
    zoomAnimation:true,
    maxZoom: 22,
    minZoom:19,
    zoomControl: false 
});
const tileurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tile = L.tileLayer(tileurl,{
    attribution: '&copy; <a href="https://github.com/ayush-saklani">Tempest</a>'
}).addTo(map);

//base map from open streetmap added 

let floor = 0;let temp_point=0;
let points =  [[],[],[],[],[],[],[]]
document.getElementById('go').addEventListener('click', () => {
    var source = document.getElementById("Start").value;
    var destination = document.getElementById("destination").value;
    
    if(source>0 && source<1000)     floor=0;
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
        console.log(points); // Coordinates received from the server
        map.eachLayer(function(layer){if (layer.toGeoJSON){map.removeLayer(layer);}});
        fetch(`./mapgeoJSON/floor${floor}.geojson`).then(response =>  response.json()).then(data => {
            L.geoJSON(data,{style:{color: 'cadetblue',weight: 1,opacity: 1}}).addTo(map);
        }).catch(error => console.error('out of service.. ~_~  @_@', error));
        if(floor==-1){
            temp_point = points[6];
        }
        else{
            temp_point = points[floor];
        }
        L.polyline.antPath(temp_point,{
            "delay": 600,
            "dashArray": [1,46],
            "weight": 5,
            "color": '#327174',
            "pulseColor": "#000000",
          }).addTo(map);
    })
    .catch(error => console.error('Error hai bhaisaab:', error));
});


// intitialize  the map with default view and zoom level
fetch('./mapgeoJSON/floor0.geojson').then(response =>  response.json()).then(data => {
    L.geoJSON(data, {
        style:{color: 'cadetblue',weight: 1,opacity: 1},
    }).addTo(map);
    map.fitBounds(L.geoJSON(data).getBounds());
}).catch(error => console.error('out of service.. ~_~  @_@', error));  





document.getElementById('-1').addEventListener('click', () => {
    map.eachLayer(function(layer) {
        if (!!layer.toGeoJSON){map.removeLayer(layer);}
    });
    fetch('./mapgeoJSON/floor-1.geojson').then(response =>  response.json()).then(data => {
        L.geoJSON(data, {
            style:{color: 'cadetblue',weight: 1,opacity: 1},
        }).addTo(map);
    }).catch(error => console.error('out of service.. ~_~  @_@', error));   
    L.polyline.antPath(points[6],{
        "delay": 600,
        "dashArray": [1,46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
      }).addTo(map);
});

document.getElementById('G').addEventListener('click', () => {
    map.eachLayer(function(layer) {
        if (!!layer.toGeoJSON){map.removeLayer(layer);}
    });
    fetch('./mapgeoJSON/floor0.geojson').then(response =>  response.json()).then(data => {
        L.geoJSON(data, {
            style:{color: 'cadetblue',weight: 1,opacity: 1},
        }).addTo(map);
    }).catch(error => console.error('out of service.. ~_~  @_@', error));   
    // const polytile = L.polyline(points[1]).addTo(map);
    L.polyline.antPath(points[0],{
        "delay": 600,
        "dashArray": [1,46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
      }).addTo(map);
});

document.getElementById('1').addEventListener('click', () => {
    map.eachLayer(function(layer) {
        if (!!layer.toGeoJSON){map.removeLayer(layer);}
    });
    fetch('./mapgeoJSON/floor1.geojson').then(response =>  response.json()).then(data => {
        L.geoJSON(data, {
            style:{color: 'cadetblue',weight: 1,opacity: 1},
        }).addTo(map);
    }).catch(error => console.error('out of service.. ~_~  @_@', error));   
    L.polyline.antPath(points[1],{
        "delay": 600,
        "dashArray": [1,46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
      }).addTo(map);
});

document.getElementById('2').addEventListener('click', () => {
    map.eachLayer(function(layer) {
        if (!!layer.toGeoJSON){map.removeLayer(layer);}
    });
    fetch('./mapgeoJSON/floor2.geojson').then(response =>  response.json()).then(data => {
        L.geoJSON(data, {
            style:{color: 'cadetblue',weight: 1,opacity: 1},
        }).addTo(map);
    }).catch(error => console.error('out of service.. ~_~  @_@', error));   
    L.polyline.antPath(points[2],{
        "delay": 600,
        "dashArray": [1,46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
      }).addTo(map);
});

document.getElementById('3').addEventListener('click', () => {
    map.eachLayer(function(layer) {
        if (!!layer.toGeoJSON){map.removeLayer(layer);}
    });
    fetch('./mapgeoJSON/floor3.geojson').then(response =>  response.json()).then(data => {
        L.geoJSON(data, {
            style:{color: 'cadetblue',weight: 1,opacity: 1},
        }).addTo(map);
    }).catch(error => console.error('out of service.. ~_~  @_@', error));   
    L.polyline.antPath(points[3],{
        "delay": 600,
        "dashArray": [1,46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
      }).addTo(map);
});

document.getElementById('4').addEventListener('click', () => {
    map.eachLayer(function(layer) {
        if (!!layer.toGeoJSON){map.removeLayer(layer);}
    });
    fetch('./mapgeoJSON/floor4.geojson').then(response =>  response.json()).then(data => {
        L.geoJSON(data, {
            style:{color: 'cadetblue',weight: 1,opacity: 1},
        }).addTo(map);
    }).catch(error => console.error('out of service.. ~_~  @_@', error));   
    L.polyline.antPath(points[4],{
        "delay": 600,
        "dashArray": [1,46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
      }).addTo(map);
});

document.getElementById('5').addEventListener('click', () => {
    map.eachLayer(function(layer) {
        if (!!layer.toGeoJSON){map.removeLayer(layer);}
    });
    fetch('./mapgeoJSON/floor5.geojson').then(response =>  response.json()).then(data => {
        L.geoJSON(data, {
            style:{color: 'cadetblue',weight: 1,opacity: 1},
        }).addTo(map);
    }).catch(error => console.error('out of service.. ~_~  @_@', error));   
    L.polyline.antPath(points[5],{
        "delay": 600,
        "dashArray": [1,46],
        "weight": 5,
        "color": '#327174',
        "pulseColor": "#000000",
      }).addTo(map);
});

document.getElementById('R').addEventListener('click', () => {
    map.eachLayer(function(layer) {
        if (!!layer.toGeoJSON){map.removeLayer(layer);}
    });
    fetch('./mapgeoJSON/floor0.geojson').then(response =>  response.json()).then(data => {
        L.geoJSON(data, {
            style:{color: 'cadetblue',weight: 1,opacity: 1},
        }).addTo(map);
        map.fitBounds(L.geoJSON(data).getBounds());
    }).catch(error => console.error('out of service.. ~_~  @_@', error));   
    points =  [[],[],[],[],[],[],[]]
});