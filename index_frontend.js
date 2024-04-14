// all javascript related to front end will be written here other one is for mapping and server talking  
let active = (activebtn) => {
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    activebtn.classList.add('active');
}
let addEventListenertobutton = () => {
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.addEventListener("click", () => { active(btn); });
    });
}
addEventListenertobutton();

let change = 1;

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            change++;
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const latlng = [latitude, longitude];
            let changea ;
            let a;
            // Update the content of the 'demo' element
            document.getElementById('demo').innerHTML = `${latitude}, ${longitude} x ${change}`;
            if(!changea){
                a = L.marker(latlng).addTo(map);
                changea = latlng
            }
            else if(latlng !=changea){
                a.setLatlng(latlng)
                changea = latlng
            }
            else{
                changea = latlng
            }
            // Create a Leaflet marker at the updated position
            // if (!mapMarker) {
            //     mapMarker = L.marker(latlng).addTo(map);
            // } else {
            //     mapMarker.setLatLng(latlng);
            // }

            // Set the map view to the updated position

            map.setView(latlng, 18);
        },console.error,{maximumAge: 1000,timeout: 1000,enableHighAccuracy: true});
    } else {
        console.log("Geolocation is not supported by this browser");
    }
};

// Call the getLocation function to start tracking the user's position
getLocation();

// var myIcon = L.icon({
//     iconUrl: 'media/logo.png',
//     iconSize: [30]
// });

// var ladi = () => {
//     let lats = [
//     [30.27282360000,77.99994990000],
//     [30.27275250000,77.99994590000],
//     [30.27269090000,77.99996430000],
//     [30.27263770000,78.00000690000],
//     [30.27259260000,78.00009140000],
//     [30.27254470000,78.00017210000],
//     [30.27252370000,78.00024700000],
//     [30.27251660000,78.00030210000],
//     [30.27253060000,78.00037580000],
//     [30.27255340000,78.00043640000],
//     [30.27260800000,78.00054340000],
//     [30.27265290000,78.00061440000]];
//     lats.forEach(element => {
//         L.marker(element, { icon: myIcon }).addTo(map);
//     });
// }
// ladi()