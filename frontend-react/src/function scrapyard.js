const fontadjuster = () => {
    console.log(map.getZoom());
    let currzoom = map.getZoom();
    if (currzoom < 18) {
        document.querySelectorAll('.text-icon-size').forEach(element => {
            element.style.fontSize = '0px';
        });
        document.querySelectorAll('.text-icon-hide').forEach(element => {
            element.style.visibility = 'hidden';
        });
    } else if (currzoom >= 18 && currzoom < 20) {
        document.querySelectorAll('.text-icon-size').forEach(element => {
            element.style.fontSize = 'smaller';
        });
        document.querySelectorAll('.text-icon-hide').forEach(element => {
            element.style.visibility = 'hidden';
        });
    } else if (currzoom >= 20 && currzoom < 21) {
        document.querySelectorAll('.text-icon-size').forEach(element => {
            element.style.fontSize = 'small';
        });
        document.querySelectorAll('.text-icon-hide').forEach(element => {
            element.style.visibility = 'hidden';
        });
    } else if (currzoom >= 21 && currzoom < 22) {
        document.querySelectorAll('.text-icon-size').forEach(element => {
            element.style.fontSize = 'large';
        });
        document.querySelectorAll('.text-icon-hide').forEach(element => {
            element.style.visibility = 'visible';
        });
    } else if (currzoom >= 22) {
        document.querySelectorAll('.text-icon-size').forEach(element => {
            element.style.fontSize = 'x-large';
        });
        document.querySelectorAll('.text-icon-hide').forEach(element => {
            element.style.display = 'block';
        });
    }
};
// map.on('zoomend', fontadjuster);


 const getSpecificRoomCoordinates = (floordata, room_id) => {      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
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
    if ((today.getHours() >= 18 && today.getHours() <= 23) || (today.getHours() >= 0 && today.getHours() <= 7)) {
        for (room in room_status_data) {
            floordata.features.forEach(feature => {
                if (feature.properties && feature.properties.room_id && feature.properties.room_id == room_status_data[room].roomid) {
                    let cc = getSpecificRoomCoordinates(floordata, room_status_data[room].roomid);      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
                    let polygon = L.polygon(cc, {
                        color: "var(--Hard-Background)",
                        opacity: 0.2,
                        fillColor: "var(--Dim-Blue)",
                        fillOpacity: 0.5,
                    }).addTo(map).addTo(map).bindPopup(`${room_status_data[room].name}`, { closeButton: false, className: "popup-content" });
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
                    color: "var(--Hard-Background)",
                    opacity: 0.1,
                    fillColor: "DarkCyan",
                    fillOpacity: 0.5,

                }).addTo(map).addTo(map).bindPopup(`Washroom`, { closeButton: false, className: "popup-content" });
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
        setTimevar(`Closed`);
        // document.getElementById("currtime").innerHTML = ;
        LoaderManager(0);
        return;
    }
    for (room in room_status_data) {
        // console.log(room_status_data[room].schedule[day_slot][time_slot].section.length)
        // console.log(room_status_data[room].roomid)
        if (room_status_data[room].schedule[day_slot][time_slot].section.length > 0) {
            // console.log("asdas")
            floordata.features.forEach(feature => {
                if (feature.properties && feature.properties.room_id && feature.properties.room_id == room_status_data[room].roomid) {
                    let cc = getSpecificRoomCoordinates(floordata, room_status_data[room].roomid);      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
                    let temproomdata = room_status_data[room].schedule[day_slot][time_slot];
                    let polygon = L.polygon(cc, {
                        color: "var(--Hard-Background)",
                        opacity: 0.1,
                        fillColor: "var(--Red)",
                        fillOpacity: 0.5,
                    }).addTo(map).bindPopup(`${room_status_data[room].name}<br>${temproomdata.course.toLocaleUpperCase()} <br> Section: ${temproomdata.section} <br> ${temproomdata.subjectcode} `, { closeButton: false, className: "popup-content" });
                    let center = polygon.getBounds().getCenter();
                    let textIcon = L.divIcon({
                        className: 'text-icon text-icon-size',
                        html: room_status_data[room].name,
                        iconSize: [0, 0],
                        iconAnchor: [0, 0]
                    });
                    L.marker(center, { icon: textIcon }).addTo(map);
                    // temproomdata = room_status_data[room].schedule[day_slot][time_slot];
                    // textIcon = L.divIcon({
                    //     className: 'text-icon text-icon-size text-icon-hide',
                    //     html: room_status_data[room].name +" "+ temproomdata.course +" Section:" +temproomdata.section + " " + temproomdata.subjectcode + " " ,
                    //     iconSize: [0, 0],
                    //     iconAnchor: [0, 0]
                    // });
                    // L.marker(center, { icon: textIcon }).addTo(map);
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
                        color: "var(--Hard-Background)",
                        opacity: 0.1,
                        fillColor: "var(--Aqua)",
                        fillOpacity: 0.5,
                    }).addTo(map).addTo(map).bindPopup(`${room_status_data[room].name}`, { closeButton: false, className: "popup-content" });
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
                color: "var(--Hard-Background)",
                opacity: 0.1,
                fillColor: "DarkCyan",
                fillOpacity: 0.5,

            }).addTo(map).addTo(map).bindPopup(`Washroom`, { closeButton: false, className: "popup-content" });
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