import { useEffect, useRef, useState } from 'react'

import profilepicture from './assets/images/doof.png'
import './assets/css/floorbutton.css'
import './assets/css/bottombar.css'
import navitlogo from './assets/images/logo.png'
import roomData from './assets/room.json'
import gif from "./assets/images/logo.gif";

import AnimatedPolyline from './components/animatedpolyline'
import Loader from './components/Loader'
import FontAdjuster from './components/fontadjuster'
import ProfilePictureMenu from './components/ProfilePictureMenu'

import toast, { Toaster } from 'react-hot-toast';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, Polyline, Polygon, Circle, CircleMarker } from 'react-leaflet';
import { FaArrowRotateRight, FaLinkedinIn, FaGithub } from 'react-icons/fa6'
import 'leaflet-ant-path'; // If you are using leaflet-ant-path for animated polylines
import L from "leaflet";
import { Scanner } from '@yudiel/react-qr-scanner';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { FaUserCircle } from 'react-icons/fa'
import { BsQrCodeScan } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'

function Home() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const userexists = localStorage.getItem('user');
        if (userexists) {
            setUser(JSON.parse(localStorage.getItem('user')));
        } else {
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
    const [Gobuttontext, setGobuttontext] = useState("Go");
    const [dayslot, setdayslot] = useState("08-09");
    const [hourslot, sethourslot] = useState("08-09");
    const [showScanner, setShowScanner] = useState(false);

    const [source, setsource] = useState(0);
    const [destination, setdestination] = useState(0);

    const [floorMap, setfloorMap] = useState(null);
    const [room_status_data, set_room_status_data] = useState();
    const [pathPoints, setpathPoints] = useState([[], [], [], [], [], [], []]);

    const handleClick = () => { setDown((prevDown) => !prevDown); };
    const [loaderCounter, setloaderCounter] = useState(0);
    const LoaderManager = (plus) => {        // loader counter 0 = decrease  1 = increase
        setloaderCounter((plus == 1) ? (loaderCounter + 1) : (loaderCounter - 1));
        setLoading(loaderCounter > 0 ? true : false);
    }

    const aminities = [
        "1051", "1029", "1099", "1083",
        "2051", "2029", "2099", "2083",
        "3051", "3029", "3099", "3083",
        "4051", "4029", "4099", "4083",
        "5051", "5029", "5099", "5083",
        "6051", "6029", "6099", "6083"
    ]

    const fetchGeoJSON = () => {
        return new Promise((resolve, reject) => {
            LoaderManager(1);
            fetch(`${serverlink}/getmap`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    setHitcount(data.hitcount);
                    setfloorMap(data.data);
                    LoaderManager(0);
                    resolve();
                }).catch(error => {
                    console.error('out of service.. ~_~  @_@', error);
                    LoaderManager(0);
                    reject(error);
                });
        });
    }
    const fetch_calculate_antpath = () => {
        return new Promise((resolve, reject) => {
            if (source == 0 || destination == 0) {
                return;
            }
            LoaderManager(1);
            let floor = Math.floor(source / 1000) - 1;
            fetch(`${serverlink}/getCoordinates?src=${source}&des=${destination}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    // console.log(data.data.antpath);
                    setpathPoints(data.data.antpath);
                    let tempTime = Math.round(data.data.distance) / 2;
                    let message = (tempTime < 60) ? "~1 min" : `${Math.ceil(tempTime / 60) + 1} min`
                    setGobuttontext(message);
                    setActiveFloor(floor);
                    LoaderManager(0);
                    resolve();
                }).catch(error => {
                    console.error('Error fetching path coordinates:', error);
                    LoaderManager(0);
                    reject(error);
                });
        });
    }
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
                    // console.log(data);
                    set_room_status_data(data);
                    LoaderManager(0);
                    resolve();
                }).catch(error => {
                    console.error(':::: Room Data not available (SERVER ERROR) :::: ');
                    LoaderManager(0);
                    reject(error);
                });
        });
    };

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
        let hours = today.getHours();
        if (hours == 0) hours = 12;             // 12 am is 0 in js
        let houre = hours + 1;
        hours = (hours > 12) ? String(hours - 12).padStart(2, "0") : String(hours).padStart(2, "0");
        houre = (houre > 12) ? String(houre - 12).padStart(2, "0") : String(houre).padStart(2, "0");
        let time_slot = hours + "-" + houre;
        time_slot = (time_slot).toString();
        sethourslot(time_slot.toString());
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
        await fetch_room_status();
    }


    useEffect(() => {
        setGlobalLoading(false); // for ui editing uncomment this line and comment the line below
        // handledata();
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
                        toast.dismiss();
                        toast.error("Location accuracy low", {
                            duration: 2000,
                            position: 'top-center',
                        });
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
    return (
        <div>
            {/* 
                // this is the format of the data in the QR code - this is a json object
                {
                    "roomid": "1171"
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
                                color: "var(--Dim-Blue)",
                                weight: 1.5,
                                opacity: 1,
                                fillColor: "var(--Dim-Blue)",
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
                { // ammenities
                    floorMap && floorMap.map((floordata, index) => {
                        if (floordata.floor === activeFloor.toString()) {
                            return floordata.map.features.map((feature) => {
                                if (feature.properties && feature.properties.room_id && aminities.includes(feature.properties.room_id)) {
                                    // console.log("Rendering polygon for room_id:", feature.properties.room_id);
                                    return (
                                        <Polygon
                                            key={feature.properties.room_id} // Ensure a unique key for each Polygon
                                            positions={getSpecificRoomCoordinates(floordata.map, feature.properties.room_id)}
                                            color='var(--Hard-Background)'
                                            opacity={0.1}
                                            fillColor='DarkCyan'
                                            fillOpacity={0.5}
                                        >
                                            <Popup closeButton={false} className="popup-content">
                                                Washroom
                                            </Popup>
                                            <Marker position={L.polygon(getSpecificRoomCoordinates(floordata.map, feature.properties.room_id)).getBounds().getCenter()} icon={
                                                L.divIcon({
                                                    className: 'text-icon text-icon-size',
                                                    html: "WC",
                                                    iconSize: [0, 0],
                                                    iconAnchor: [0, 0]
                                                })
                                            } />
                                        </Polygon>
                                    );
                                }
                                return null; // Return null if conditions aren't met
                            });
                        }
                        return null; // Return null if floor does not match activeFloor
                    })
                }
                { // room status
                    room_status_data && floorMap && floorMap.map((floordata, index) => {
                        if (floordata.floor === activeFloor.toString()) {
                            return floordata.map.features.map((feature) => {
                                if (feature.properties?.room_id && room_status_data?.find(room => room.roomid === feature.properties.room_id)) {
                                    const room_talking_about = room_status_data?.find(room => room.roomid === feature.properties.room_id);
                                    let today = new Date();
                                    return (today.getHours() >= 18 && today.getHours() <= 23) || (today.getHours() >= 0 && today.getHours() <= 7) ?
                                        (   // Campus is closed
                                            <Polygon
                                                key={feature.properties.room_id} // Ensure a unique key for each Polygon
                                                positions={getSpecificRoomCoordinates(floordata.map, feature.properties.room_id)}
                                                color='var(--Hard-Background)'
                                                opacity={0.2}
                                                fillColor={`var(--Dim-Blue)`}
                                                fillOpacity={0.5}
                                            >
                                                <Popup closeButton={false} className="popup-content">
                                                    {room_talking_about.name}
                                                </Popup>
                                                <Marker position={L.polygon(getSpecificRoomCoordinates(floordata.map, feature.properties.room_id)).getBounds().getCenter()}
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
                                        ) :
                                        (// Campus is open
                                            <Polygon
                                                key={feature.properties.room_id} // Ensure a unique key for each Polygon
                                                positions={getSpecificRoomCoordinates(floordata.map, feature.properties.room_id)}
                                                color='var(--Hard-Background)'
                                                opacity={0.1}
                                                fillColor={`${room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].section.length > 0 ? "var(--Red)" : "var(--Aqua)"}`}
                                                fillOpacity={0.5}
                                            >
                                                <Popup closeButton={false} className="popup-content">
                                                    {
                                                        room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].section.length > 0 ?
                                                            <div className='flex flex-col'>
                                                                <span>{room_talking_about.name}</span>
                                                                <span>{room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].course.toLocaleUpperCase()}</span>
                                                                <span>{"Section: " + room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].section}</span>
                                                                <span>{room_talking_about.schedule[dayslot.toLocaleLowerCase()][hourslot.toLocaleLowerCase()].subjectcode}</span>
                                                            </div> : room_talking_about.name
                                                    }
                                                </Popup>
                                                <Marker position={L.polygon(getSpecificRoomCoordinates(floordata.map, feature.properties.room_id)).getBounds().getCenter()} icon={
                                                    L.divIcon({
                                                        className: 'text-icon text-icon-size',
                                                        html: room_talking_about.name,
                                                        iconSize: [0, 0],
                                                        iconAnchor: [0, 0]
                                                    })
                                                } />
                                            </Polygon>
                                        );
                                }
                                return null;
                            });
                        }
                        return null;
                    })
                }
                {

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
                                        <option key={subindex} value={subroom.roomid}>
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
                        <PopoverPanel anchor="bottom" className="flex flex-col bg-brand-primary-light rounded-xl z-10">
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
            </footer >
        </div>
    )
}

export default Home
