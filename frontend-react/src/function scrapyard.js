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









  // document.addEventListener("DOMContentLoaded", async () => {
    //     await circularButtonEventListener();
    //     await fetchGeoJSON();
    //     setTimeout(() => {
    //         document.getElementById('navitloader').style.display = "none";
    //     }, 3000);
    //     LoaderManager(1);
    //     await fetch_room_status();
    //     LoaderManager(0);
    // })
