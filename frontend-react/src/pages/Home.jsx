import { useEffect, useRef, useState } from 'react'

import profilepicture from './assets/images/doof.png'
import './assets/css/floorbutton.css'
import './assets/css/bottombar.css'
import navitlogo from './assets/images/logo.png'
import roomData_prelude from './assets/room.json'
import gif from "./assets/images/logo.gif";

import AnimatedPolyline from './components/animatedpolyline'
import Loader from './components/Loader'
import FontAdjuster from './components/fontadjuster'
import ProfilePictureMenu from './components/ProfilePictureMenu'

import toast, { Toaster } from 'react-hot-toast';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, Polyline, Polygon, Circle, CircleMarker } from 'react-leaflet';
import { FaArrowRotateRight, FaLinkedinIn, FaGithub, FaCircle, FaQuestion } from 'react-icons/fa6'
import 'leaflet-ant-path'; // If you are using leaflet-ant-path for animated polylines
import L, { map } from "leaflet";
import { Scanner } from '@yudiel/react-qr-scanner';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { FaUserCircle } from 'react-icons/fa'
import { BsQrCodeScan } from 'react-icons/bs'
import { ImCross, ImLocation } from 'react-icons/im'
import Info_Card from './components/Info_Card'
import FAQModal from './components/FAQModal'
import { MdLocationOff } from 'react-icons/md'

import { weight, mapWeight, opacity, mapOpacity, fillOpacity, map_color_set } from './utils/color_set'

function Home() {
    const debug = false; // set to true for debugging purpose
    // Disable browser context menu except for elements with 'allow-browser-menu' class
    useEffect(() => {
        const handleContextMenu = (e) => {
            // Allow browser menu for elements with this class
            if (e.target.closest('.allow-browser-menu')) return;
            e.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    const [user, setUser] = useState(null);
    useEffect(() => {
        const userexists = localStorage.getItem('user');
        if (userexists) {
            if (!localStorage.getItem("faq")) {
                setIsOpen(true);
                localStorage.setItem("faq", "true");
            }
            setUser(JSON.parse(localStorage.getItem('user')));
        } else {
            localStorage.clear();
            window.location.href = '/signin';
        }
    }, []);

    const mapRef = useRef(null);
    const serverlink = "https://navit.azurewebsites.net";               // navit azure server link 
    const serverlink2 = "https://class-sync-azure.azurewebsites.net";   // classsync azure server link

    const floors = [-1, 0, 1, 2, 3, 4, 5]
    const [activeFloor, setActiveFloor] = useState(0)
    const [timevar, setTimevar] = useState(`Closed`);
    const [loading, setLoading] = useState(true)
    const [Globalloading, setGlobalLoading] = useState(true)
    const [down, setDown] = useState(false);
    const [hitcount, setHitcount] = useState(0);
    const [signalStrength, setSignalStrength] = useState(0); // 0 means no signal, 1 means weak signal, 2 means good signal, 3 means strong signal
    const [Gobuttontext, setGobuttontext] = useState("Go");
    const [dayslot, setdayslot] = useState("08-09");
    const [hourslot, sethourslot] = useState("08-09");
    const [showScanner, setShowScanner] = useState(false);

    const [source, setsource] = useState(0);
    const [destination, setdestination] = useState(0);

    const [floorMap, setfloorMap] = useState(null);
    const [room_status_data, set_room_status_data] = useState(localStorage.getItem('roomstatus_infocache') ? JSON.parse(localStorage.getItem('roomstatus_infocache')) : null);
    const [roomstatus_fresh, setroomstatus_fresh] = useState(false);
    const [pathPoints, setpathPoints] = useState([[], [], [], [], [], [], []]);
    const [roomData, setRoomData] = useState(roomData_prelude);
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleClick = () => { setDown((prevDown) => !prevDown); };
    const [loaderCounter, setloaderCounter] = useState(0);
    const LoaderManager = (plus) => {        // loader counter 0 = decrease  1 = increase
        setloaderCounter((plus == 1) ? (loaderCounter + 1) : (loaderCounter - 1));
        setLoading(loaderCounter > 0 ? true : false);
    }

    const fetchGeoJSON = async () => {
        LoaderManager(1);
        try {
            let mapData = localStorage.getItem('mapData');
            let mapsetdate = localStorage.getItem('mapsetdate');
            if (mapData && mapsetdate && (Date.now() - mapsetdate < 24 * 60 * 60 * 1000 * 7)) { // 7 days 
                setfloorMap(JSON.parse(mapData));
                setHitcount(localStorage.getItem('hitcount'));
                return;
            }
            localStorage.removeItem('mapData');
            localStorage.removeItem('hitcount');
            localStorage.removeItem('mapsetdate');

            const response = await fetch(`${serverlink}/getmap`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            localStorage.setItem('mapData', JSON.stringify(data.data));
            localStorage.setItem('hitcount', JSON.stringify(data.hitcount));
            localStorage.setItem('mapsetdate', Date.now());
            setHitcount(data.hitcount);
            setfloorMap(data.data);
        } catch (error) {
            console.error('out of service.. ~_~  @_@', error);
            throw error;
        } finally {
            LoaderManager(0);
        }
    }

    const fetch_calculate_antpath = async () => {
        if (source == 0 || destination == 0) {
            return;
        }
        LoaderManager(1);
        let floor = Math.floor(source / 1000) - 1;
        try {
            const response = await fetch(`${serverlink}/getCoordinates?src=${source}&des=${destination}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setpathPoints(data.data.antpath);
            let tempTime = Math.round(data.data.distance) / 2;
            let message = (tempTime < 60) ? "~1 min" : `${Math.ceil(tempTime / 60) + 1} min`;
            setGobuttontext(message);
            setActiveFloor(floor);
        } catch (error) {
            console.error('Error fetching path coordinates:', error);
            throw error;
        } finally {
            LoaderManager(0);
        }
    }

    const fetch_room_status = async () => {
        try {
            let today = new Date();
            let stored_status = localStorage.getItem('roomstatus_infocache');
            if (((today.getHours() >= 18 && today.getHours() <= 23) || (today.getHours() >= 0 && today.getHours() <= 7)) && stored_status) { // Campus is closed
                return;
            }
            let roomstatus_setdate = localStorage.getItem('roomstatus_setdate');
            let todayDate = today.toISOString().split('T')[0];
            if (stored_status && roomstatus_setdate && (todayDate == roomstatus_setdate)) { //
                set_room_status_data(JSON.parse(stored_status));
                setroomstatus_fresh(true);
                toast.success("Room status updated from cache");
                return;
            }
            LoaderManager(1); // Start loading
            const response = await fetch(`${serverlink2}/room/getall`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            const rooms = result.data || [];

            localStorage.setItem('roomstatus_infocache', JSON.stringify(rooms));
            localStorage.setItem('roomstatus_setdate', todayDate);
            set_room_status_data(rooms);
            setroomstatus_fresh(true);
            toast.success("Room status updated");
            toast.success("Please change floor to see");
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.error("Storage limit exceeded!");
            }
            console.error(':::: Room Data not available (SERVER ERROR) :::: ', error);
            throw error;
        } finally {
            LoaderManager(0); // Stop loading
        }
    };


    const [hour, setHour] = useState(new Date().getHours());
    useEffect(() => {
        const checkHour = () => {
            const currentHour = new Date().getHours();
            if (currentHour !== hour) {
                setHour(currentHour);
            }
        }
        const interval = setInterval(checkHour, 60 * 1000 * 5); // check every 5 minute
        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    useEffect(() => {
        const update_room_status = async () => {
            // console.log("Hour changed! New hour:", hour);
            await fetch_room_status();
        };
        update_room_status();
    }, [hour]);

    const getSpecificRoomCoordinates = (floordata, room_id) => {      // returns the coordinates of the room RETURNS: [lat,lng] format of the room (helper function)
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
        return latLngs;
    }

    const fetch_time_detail = (floordata) => {
        LoaderManager(1);
        let today = new Date();
        const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        let day_slot = weekdays[today.getDay()];
        setdayslot(day_slot.toString().toUpperCase());
        if (debug) setdayslot("MON");                // for testing purpose
        let hours = today.getHours();
        if (hours == 0) hours = 12;             // 12 am is 0 in js
        let houre = hours + 1;
        hours = (hours > 12) ? String(hours - 12).padStart(2, "0") : String(hours).padStart(2, "0");
        houre = (houre > 12) ? String(houre - 12).padStart(2, "0") : String(houre).padStart(2, "0");
        let time_slot = hours + "-" + houre;
        time_slot = (time_slot).toString();
        sethourslot(time_slot.toString());
        if (debug) sethourslot("08-09");             // for testing purpose
        setTimevar(`${time_slot}`)
        let timeslots = ["08-09", "09-10", "10-11", "11-12", "12-01", "01-02", "02-03", "03-04", "04-05", "05-06"]
        setTimevar(`${day_slot.toLocaleUpperCase()} ${time_slot}`);
        if (!timeslots.includes(time_slot)) {
            time_slot = "08-09";
        }
        if ((today.getHours() >= 18 && today.getHours() <= 23) || (today.getHours() >= 0 && today.getHours() <= 7)) {
            setTimevar(`Closed`);
        }
        LoaderManager(0);
    };

    const handledata = async () => {
        setGlobalLoading(true);
        fetch_time_detail();
        await fetchGeoJSON();
        setGlobalLoading(false);
        // await fetch_room_status();
    }

    useEffect(() => {
        // setGlobalLoading(false); // for ui editing uncomment this line and comment the line below
        handledata();
    }, []);
    useEffect(() => {
        fetch_calculate_antpath();
    }, [source, destination]);

    const [coordinates, setCoordinates] = useState(null);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (position.coords.accuracy > 30) {
                        setSignalStrength(1);
                    } else if (position.coords.accuracy > 10) {
                        setSignalStrength(2);
                    } else {
                        setSignalStrength(3);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error.message);
                }
            );

            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    console.log(position.coords.accuracy);
                    if (position.coords.accuracy < 30) {
                        setCoordinates([position.coords.latitude, position.coords.longitude]);
                    }
                    else {
                        setCoordinates([position.coords.latitude, position.coords.longitude]);
                        // navigator.geolocation.clearWatch(watchId);
                    }
                },
                (error) => {
                    toast.error("Error fetching location", {
                        duration: 2000,
                        position: 'top-center',
                    });
                    console.error('Error watching location:', error);
                },
                { enableHighAccuracy: true } // Optional: use high accuracy for better location updates
            );
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error('Geolocation not supported by this browser.');
            toast.error('Geolocation not supported', {
                duration: 2000,
                position: 'top-center',
            });
        }
    }, []); // Empty dependency array ensures it runs once on mount
    useEffect(() => {
        try {
            const url = new URL(window.location.href);
            const src = url.searchParams.get("source");
            const dest = url.searchParams.get("destination");

            if (src || dest) {
                if (src) setsource(src);
                if (dest) setdestination(dest);
                toast.success("Source and Destination set from URL");
            }
        } catch (err) {
            console.error("URL Parse Error on load:", err);
        }
    }, []);
    const convertRoomStatusDataToFloorList = (rooms) => {
        const floorMap = {
            "Ground floor": [],
            "1st floor": [],
            "2nd floor": [],
            "3rd floor": [],
            "4th floor": [],
            "5th floor": [],
            "Underground floor": [],
        };

        function getFloorLabel(roomid) {
            const id = parseInt(roomid);
            if (id < 1000) return "Underground floor";
            if (id < 2000) return "Ground floor";
            if (id < 3000) return "1st floor";
            if (id < 4000) return "2nd floor";
            if (id < 5000) return "3rd floor";
            if (id < 6000) return "4th floor";
            if (id < 7000) return "5th floor";
            return null;
        }

        for (const room of rooms) {
            const { roomid, name, type } = room;
            if (!roomid || !name) continue;
            if (type == "ladieswashroom" || type == "gentswashroom") continue;
            const floorLabel = getFloorLabel(roomid);
            if (!floorLabel) continue;

            floorMap[floorLabel].push({
                roomid: roomid,
                room_name: name,
                room_type: type || "unknown"
            });
        }

        const finallist = {
            rooms: [],
            amenities: roomData_prelude.amenities
        };

        for (const floor in floorMap) {
            if (floorMap[floor].length > 0) {
                const sortedRooms = floorMap[floor].sort((a, b) => {
                    if (a.room_type < b.room_type) return -1;
                    if (a.room_type > b.room_type) return 1;
                    return parseInt(a.roomid) - parseInt(b.roomid);
                });

                finallist.rooms.push({
                    floor_label: floor,
                    room_data: sortedRooms
                });
            }
        }
        setRoomData(finallist);
        console.log("Room data updated:", finallist);
    }
    useEffect(() => {
        if (room_status_data && Array.isArray(room_status_data)) {
            convertRoomStatusDataToFloorList(room_status_data);
        }
    }, [room_status_data]);

    if (!user) {
        return <div className="position-fixed w-full h-full flex justify-center align-items-center">
            <div className="flex flex-col items-center justify-center">
                <img src={gif} alt="Loading animation" className="h-50 w-50" />
                <p className="text-xl text-brand-primary-dark mt-2 fw-bold animate-pulse">Signing in
                    <span className="animate-ping">...</span>
                </p>
            </div>
        </div>
    }
    const isActivehour = () => { // check if the current hour is between 18:00 and 07:00 as the campus is closed active hour is  8am to 6 pm
        if (debug) return false;
        const today = new Date();
        const currentHour = today.getHours();
        return (currentHour >= 18 && currentHour <= 23) || (currentHour >= 0 && currentHour <= 7 || roomstatus_fresh == false);
    }
    return (
        <div>
            {/* 
                // this is the format of the data in the QR code - this is a json object
                {
                    "roomid": "1171" // outdated
                }
            */}
            {
                showScanner &&
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[1001]">
                    <div className="w-3/4 max-w-lg flex shadow-2xl rounded-lg">
                        <button
                            onClick={() => setShowScanner(false)}
                            className="absolute top-2 right-2 text-white rounded-full p-3 hover:bg-black hover:bg-opacity-50 transition"
                        >
                            <ImCross className="text-2xl" />
                        </button>
                        <Scanner
                            onScan={(detectedCodes) => {
                                if (detectedCodes.length > 0) {
                                    const scannedValue = detectedCodes[0].rawValue;
                                    try {
                                        let scanneddata = new URL(scannedValue);
                                        const scannedSource = scanneddata.searchParams.get("source");
                                        const scannedDestination = scanneddata.searchParams.get("destination");
                                        if (scannedSource || scannedDestination) {
                                            if (scannedSource) {
                                                setsource(scannedSource);
                                            }
                                            if (scannedDestination) {
                                                setdestination(scannedDestination);
                                            }
                                            toast.success("QR code Scanned");
                                        } else {
                                            toast.error("Invalid QR code");
                                        }
                                        setShowScanner(false);
                                    } catch (error) {
                                        toast.error("Invalid QR code");
                                        setShowScanner(false);
                                    }
                                }
                            }}
                            onError={(error) => {
                                console.error("Scanner Error:", error);
                                toast.error("Error scanning QR code");
                            }}
                            constraints={{ facingMode: "environment" }} // Uses back camera
                            scanDelay={5000} // Adjusts delay between scans
                            allowMultiple={true} // Prevents duplicate scanning
                            className="w-full h-full"
                        />
                    </div>
                </div>
            }
            {
                Globalloading &&
                <div className="z-[1002] backdrop-blur-sm position-fixed w-full h-full bg-bg-blur flex justify-center align-items-center">
                    <Loader />
                </div>
            }
            <Toaster />
            <div className="position-fixed bottom-0 fw-bold left-0 text-lg text-brand-primary-dark px-2 fw-bold z-[1]">{hitcount}</div>
            <div className="position-fixed bottom-0 fw-bold right-0 text-lg text-brand-primary-dark p-1 fw-bold z-[1]">
                {signalStrength === 0 ?
                    <MdLocationOff className='text-xl' /> :
                    <FaCircle className={`shadow-2xl drop-shadow-2xl text-md animate-pulse  ${signalStrength === 1 ? 'text-[red]' : signalStrength === 2 ? 'text-orange' : 'text-[green]'}`} />
                }
            </div>
            <nav className="flex align-items-center p-2 position-fixed z-[1]">
                <img className="h-[80px]" src={navitlogo} height="70px" />
                <h1 className="text text-brand-primary-dark mx-2 text-4xl"><b>Navit</b></h1>
            </nav>

            <MapContainer
                center={[30.2734504, 77.9997427]}
                zoom={19}
                maxZoom={22}
                minZoom={1}
                zoomControl={false}
                scrollWheelZoom={true}
                zoomAnimation={true}
                style={{ height: '100vh', width: '100%' }}
                id="map"
                whenCreated={(map) => (mapRef.current = map)}
            >
                <FontAdjuster />
                <TileLayer
                    attribution='<p><a href="https://github.com/ayush-saklani"><img src="https://flagcdn.com/in.svg" width="15" alt="India"><b> Made by Ayush Saklani</b></a> <br>Co-powered by <a href="https://github.com/ayush-saklani/classsync"><b>Classsync</b></a></p>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { // floorMap
                    floorMap && floorMap.map((floor, index) => (
                        (floor.floor === activeFloor.toString()) &&
                        <GeoJSON key={index} attribution="&copy; credits due..." data={floor.map}
                            style={{
                                color: map_color_set["floormap"].color,
                                weight: mapWeight,
                                opacity: mapOpacity,
                                fillColor: map_color_set["floormap"].fillColor,
                            }}
                        />
                    ))
                }
                { // antpath
                    pathPoints[activeFloor + 1] && (pathPoints[activeFloor + 1].length > 0) &&
                    <AnimatedPolyline
                        positions={pathPoints[activeFloor + 1]}
                        options={{
                            opacity: 0.8,
                            "delay": 800,
                            "dashArray": [1, 46],
                            "weight": 6,
                            "color": 'var(--pulseColor)',
                            "pulseColor": "var(--pulseColor2)",
                        }}
                    />
                }
                {coordinates &&
                    <Circle center={coordinates}
                        radius={2}
                        className='leaflet-wave'
                        fillColor='var(--brand-primary-dark)'
                        color="var(--Blue)"
                        fillOpacity={0.5}
                        fill={true}
                    />
                }
                { // room status
                    room_status_data && floorMap && floorMap.map((floordata, index) => {
                        if (floordata.floor === activeFloor.toString()) {
                            return floordata.map.features.map((feature) => {
                                if (feature.properties?.room_id && room_status_data?.find(room => room.roomid === feature.properties.room_id)) {
                                    const room_talking_about = room_status_data?.find(room => room.roomid === feature.properties.room_id);
                                    const tempvar = room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()];
                                    return <>
                                        <Polygon
                                            key={feature.properties.room_id}
                                            positions={getSpecificRoomCoordinates(floordata.map, feature.properties.room_id)}
                                            color={
                                                map_color_set[room_talking_about.type] ? map_color_set[room_talking_about.type].color :
                                                    isActivehour() ? map_color_set["closed"].color :
                                                        room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].section.length > 0 ?
                                                            map_color_set["occupied"].color : map_color_set["available"].color
                                            }
                                            opacity={opacity}
                                            fillColor={
                                                map_color_set[room_talking_about.type] ? map_color_set[room_talking_about.type].fillColor :
                                                    isActivehour() ? map_color_set["closed"].fillColor :
                                                        room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].section.length > 0 ?
                                                            map_color_set["occupied"].fillColor : map_color_set["available"].fillColor
                                            }
                                            fillOpacity={fillOpacity}
                                            eventHandlers={{
                                                contextmenu: (e) => {
                                                    e.originalEvent.preventDefault();
                                                    if (room_talking_about.type == "ladieswashroom") {
                                                        setdestination(1998);
                                                    } else if (room_talking_about.type == "gentswashroom") {
                                                        setdestination(1999);
                                                    } else {
                                                        setdestination(room_talking_about.roomid);
                                                    }
                                                }
                                            }}
                                        >
                                            <Popup closeButton={false} className="popup-content">
                                                {
                                                    <Info_Card
                                                        roomname={room_talking_about.name}
                                                        course={!isActivehour() ? room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].course.toLocaleUpperCase() : ""}
                                                        section={!isActivehour() ? room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].section : ""}
                                                        subjectcode={!isActivehour() ? room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].subjectcode : ""}
                                                        roomid={room_talking_about.roomid}
                                                        type={room_talking_about.type}
                                                        capacity={room_talking_about.capacity}
                                                        semester={!isActivehour() ? room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].semester : ""}
                                                        infotype={
                                                            (room_talking_about.type == "ladieswashroom" || room_talking_about.type == "gentswashroom") ? "washroom" :
                                                                isActivehour() ? "closed" :
                                                                    room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].section.length > 0 ? "occupied" : "available"}
                                                        active={!isActivehour()}
                                                    />
                                                }
                                            </Popup>
                                            <Marker
                                                position={L.polygon(getSpecificRoomCoordinates(floordata.map, feature.properties.room_id)).getBounds().getCenter()}
                                                icon={
                                                    L.divIcon({
                                                        className: 'text-icon text-icon-size',
                                                        html: room_talking_about.name,
                                                        iconSize: [0, 0],
                                                        iconAnchor: [0, 0]
                                                    })
                                                }
                                            />
                                        </Polygon>
                                        {
                                            (!user.guest && user.section && user.course && user.semester && (tempvar.section.includes(user.section) && tempvar.course == user.course && tempvar.semester == user.semester)) &&
                                            <AnimatedPolyline
                                                positions={getSpecificRoomCoordinates(floordata.map, feature.properties.room_id)}
                                                options={{
                                                    opacity: 0.8,
                                                    delay: 2500,
                                                    dashArray: [50, 50],
                                                    weight: 6,
                                                    color: '#7bccc4', // Bright yellow for high visibility
                                                    pulseColor: '#0769ad', // Bright orange-red for strong highlight

                                                }}
                                            />
                                        }
                                    </>
                                }
                                return null;
                            });
                        }
                        return null;
                    })
                }
            </MapContainer>

            {/* floorbutton */}
            <div className="floorbutton mx-3 flex gap-1 justify-content-center align-items-center z-[1] flex-column position-fixed  left-0 top-[14%]" >
                {floors.map((floor, index) => (
                    <button key={index} className={`bg-brand-primary-light text-white dark:bg-brand-primary-dark dark:text-white border-3 border-brand-primary-dark ${activeFloor === floor && 'dark:bg-brand-primary-light dark:border-brand-primary-dark'} dark:border-brand-primary-light
                        circular_button aspect-square ${activeFloor === floor ? 'active' : ''}`} id={floor} onClick={() => setActiveFloor(floor)}><b>{floor === -1 ? 'B' : floor === 0 ? 'G' : floor}</b></button>
                ))}
            </div>
            {/* floorbutton */}

            {/* bottombar */}
            <div className={`bottom-bar p-0 ${down ? 'bottom-bar-down' : ''}`}>
                <button className="countboxi text-brand-primary-dark" onClick={handleClick}>
                    <i id="foldup-icon" className={`bi ${down ? 'bi-caret-up-fill' : 'bi-caret-down-fill'} h3`}></i>
                </button>
                <div className="container row justify-content-center my-auto">
                    <div className="form-floating col-lg-5 col-md-5 col-sm-12 pb-1 text">
                        <select className="form-select" id="Start"
                            onChange={() => { setsource(document.getElementById("Start").value); }}
                            value={source}
                        >
                            <option value={0} disabled>
                                {"Choose Start"}
                            </option>
                            {roomData.rooms.map((room, index) => (
                                <optgroup label={room.floor_label} key={index}>
                                    {room.room_data.map((subroom, subindex) => (
                                        <option key={subindex} value={subroom.roomid}
                                            style={{
                                                // fontWeight: subroom.room_type == "class" ? "bold" : subroom.room_type == "class" ? "" : "normal",
                                                // color: map_color_set[subroom.room_type]?.fillColor ? map_color_set[subroom.room_type].fillColor : subroom.room_type == "class" ? "green" : "red",
                                            }}
                                        >
                                            {subroom.room_name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        <label className="ms-2 text" name="Start">
                            <b className={`${source != 0 ? "font-extrabold text-[#20a1a1] " : "text-[#919191]"}`}>Start</b>
                        </label>
                        <div
                            onClick={() => {
                                setShowScanner(true);
                                setTimeout(() => {
                                    setShowScanner(false);
                                }, 10000);
                            }}>
                            <BsQrCodeScan className="position-absolute top-50 end-0 translate-middle-y mx-4 text-5xl p-2 cursor-pointer text-brand-primary-dark bg-white hover:bg-brand-primary-dark" />
                        </div>
                    </div>
                    <div className="form-floating col-lg-5 col-md-4 col-sm-12 pb-1 text">
                        <select className="form-select  h-full" id="destination"
                            onChange={() => { setdestination(document.getElementById("destination").value); }}
                            value={destination}
                        >
                            <option value={0} disabled>
                                {"Choose Destination"}
                            </option>
                            {roomData.amenities.map((room, index) => (
                                <optgroup label={room.floor_label} key={index}>
                                    {room.room_data.map((subroom, subindex) => (
                                        <option key={subindex} value={subroom.roomid}>
                                            {subroom.room_name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                            {roomData.rooms.map((room, index) => (
                                <optgroup label={room.floor_label} key={index}>
                                    {room.room_data.map((subroom, subindex) => (
                                        <option key={subindex} value={subroom.roomid}>
                                            {subroom.room_name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        <label className="ms-2 text" name="destination">
                            <b className={`${destination != 0 ? "font-extrabold text-[#20a1a1] " : "text-[#919191]"}`}>Destination</b>
                        </label>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-12 pb-1 align-items-center justify-content-center d-flex">
                        <button
                            type="button"
                            className="btn btn-lg btn-light col-12 px-2 h-full text-brand-primary-dark"
                            id="go"
                            onClick={() => {
                                if (source == 0 || destination == 0) {
                                    toast.error("Please select source and destination", {
                                        duration: 2000,
                                        position: 'top-center',
                                    });
                                    return;
                                }
                                fetch_calculate_antpath();
                            }}
                        >
                            <b className="h4 fw-bold text">{Gobuttontext}
                                {Gobuttontext !== "Go" && <i className="bi bi-person-walking"></i>}
                            </b>
                        </button>
                    </div>
                </div>
            </div>
            {/* bottombar */}

            <footer className="fixed top-0 right-0 m-1 z-[1] flex flex-col gap-1 align-items-end justify-content-center">
                <div className="text-3xl px-1 text-brand-primary-dark fw-bold">
                    {loading == false ?
                        <div className="text-2xl text-brand-primary-dark py-1">{timevar}</div> :
                        <div className="spinner-border text-3xl text-brand-primary-dark p-[12px]"></div>}
                </div>
                <div>
                    <Popover className="relative center flex flex-col gap-1">
                        <PopoverButton>
                            {
                                user.guest ?
                                    <FaUserCircle size={44} className='bg-brand-primary rounded-xl p-2 hover:bg-brand-primary-light text-foreground-1 cursor-pointer text-3xl' /> :
                                    <img src={profilepicture} alt="" size={44} className='h-12 w-12 rounded-full p-0 cursor-pointer' />
                            }
                        </PopoverButton>
                        <PopoverPanel anchor="bottom" className="flex flex-col bg-brand-primary-light rounded-xl z-[1001]">
                            <ProfilePictureMenu profilepicture={profilepicture} user={user} />
                        </PopoverPanel>
                    </Popover>
                </div>
                <a href="https://github.com/ayush-saklani" target="_blank">
                    <FaGithub size={44} className='bg-brand-primary rounded-xl p-2 hover:bg-brand-primary-light text-foreground-1' />
                </a>
                <a href="https://www.linkedin.com/in/ayush-saklani/" target="_blank">
                    <FaLinkedinIn size={44} className='bg-brand-primary rounded-xl p-2 hover:bg-brand-primary-light text-foreground-1' />
                </a>
                {/* 
                <div href="https://www.linkedin.com/in/ayush-saklani/" target="_blank">
                    <FaArrowsRotate size={44} className='bg-brand-primary rounded-xl p-2 hover:bg-brand-primary-light text-foreground-1 cursor-pointer text-3xl'
                        onClick={() => handledata()}
                    />
                </div>
                */}
                {/* <div href="https://www.linkedin.com/in/ayush-saklani/" target="_blank" >
                    <div className='bg-brand-primary rounded-xl  hover:bg-brand-primary-light text-foreground-1'>
                        <DarkModeSwitch
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                            size={44}
                            className=' p-2 text-foreground-1'
                        />
                    </div>
                </div> */}
                <div href="https://www.linkedin.com/in/ayush-saklani/" target="_blank">
                    <FaArrowRotateRight size={44} className='bg-brand-primary rounded-xl p-2 hover:bg-brand-primary-light text-foreground-1 cursor-pointer text-3xl'
                        onClick={() => {
                            setGobuttontext("Go");
                            setsource(0);
                            setpathPoints([[], [], [], [], [], [], []]);
                            setActiveFloor("0");
                            setdestination(0);
                        }}
                    />
                </div>
                <div href="https://www.linkedin.com/in/ayush-saklani/" target="_blank">
                    <FaQuestion size={44} className='bg-brand-primary rounded-xl p-2 hover:bg-brand-primary-light text-foreground-1 cursor-pointer text-3xl'
                        onClick={() => { setIsOpen(true) }}
                    />
                </div>
            </footer >
            <FAQModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default Home
