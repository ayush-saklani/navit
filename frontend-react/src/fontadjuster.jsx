import { useMapEvents } from "react-leaflet";

const FontAdjuster = () => {
    const fontadjuster = (currzoom) => {
        // console.log("Current Zoom Level:", currzoom);
        if (currzoom < 18) {
            document.querySelectorAll(".text-icon-size").forEach(element => {
                element.style.fontSize = "0px";
            });
            document.querySelectorAll(".text-icon-hide").forEach(element => {
                element.style.visibility = "hidden";
            });
        } else if (currzoom >= 18 && currzoom < 20) {
            document.querySelectorAll(".text-icon-size").forEach(element => {
                element.style.fontSize = "smaller";
            });
            document.querySelectorAll(".text-icon-hide").forEach(element => {
                element.style.visibility = "hidden";
            });
        } else if (currzoom >= 20 && currzoom < 21) {
            document.querySelectorAll(".text-icon-size").forEach(element => {
                element.style.fontSize = "small";
            });
            document.querySelectorAll(".text-icon-hide").forEach(element => {
                element.style.visibility = "hidden";
            });
        } else if (currzoom >= 21 && currzoom < 22) {
            document.querySelectorAll(".text-icon-size").forEach(element => {
                element.style.fontSize = "large";
            });
            document.querySelectorAll(".text-icon-hide").forEach(element => {
                element.style.visibility = "visible";
            });
        } else if (currzoom >= 22) {
            document.querySelectorAll(".text-icon-size").forEach(element => {
                element.style.fontSize = "x-large";
            });
            document.querySelectorAll(".text-icon-hide").forEach(element => {
                element.style.display = "block";
            });
        }
    };

    // Use useMapEvents to listen to zoomend
    useMapEvents({
        zoomend: (e) => {
            const map = e.target; // The map instance
            const currzoom = map.getZoom(); // Get current zoom level
            fontadjuster(currzoom);
        },
    });
    return null; // This component does not render anything
};

export default FontAdjuster;
