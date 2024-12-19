import { useEffect, useRef, useState } from 'react'
import './App.css'
import './globals.css'
import './assets/css/floorbutton.css'
import './assets/css/bottombar.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import navitlogo from '/src/assets/images/logo.png'
import roomData from './room.json'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa6'
import L from 'leaflet'; // Import leaflet for map handling
import 'leaflet-ant-path'; // If you are using leaflet-ant-path for animated polylines

function App() {
    const mapRef = useRef(null);
    const serverlink = "https://navit.azurewebsites.net";               // navit azure server link 
    const serverlink2 = "https://class-sync-azure.azurewebsites.net";   // classsync azure server link

    const floors = [-1, 0, 1, 2, 3, 4, 5]
    const [activeFloor, setActiveFloor] = useState(0)
    const [timevar, setTimevar] = useState(`Closed`);
    const [loading, setLoading] = useState(true)
    const [down, setDown] = useState(false);
    const [hitcount, setHitcount] = useState(0);
    const [Gobuttontext, setGobuttontext] = useState("Go");

    const [pathDistance, setpathDistance] = useState(0);
    const [source, setsource] = useState(roomData.rooms[0].room_data[0].roomid);
    const [destination, setdestination] = useState(roomData.amenities[0].room_data[0].roomid);

    const [floorMap, setfloorMap] = useState(null);
    const [room_status_data, set_room_status_data] = useState(null);
    const [pathPoints, setpathPoints] = useState([[], [], [], [], [], [], []]);

    const handleClick = () => { setDown((prevDown) => !prevDown); };
    const [loaderCounter, setloaderCounter] = useState(0);
    const LoaderManager = (plus) => {        // loader counter 0 = decrease  1 = increase
        setloaderCounter((plus == 1) ? (loaderCounter + 1) : (loaderCounter - 1));
        setLoading(loaderCounter > 0 ? true : false);
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
                    setHitcount(data.hitcount);
                    setfloorMap(data.data);
                    LoaderManager(0);
                    setActiveFloor(0);
                }).catch(error => {
                    console.error('out of service.. ~_~  @_@', error);
                    LoaderManager(0);
                    reject(error);
                });
        });
    }
    useEffect(() => {
        fetchGeoJSON();
    }, []);

    const fetch_calculate_antpath = () => {
        return new Promise((resolve, reject) => {
            LoaderManager(1);
            // console.log(`source:${source} => destination:${destination}`);
            let floor = Math.floor(source / 1000) - 1;
            fetch(`${serverlink}/getCoordinates?src=${source}&des=${destination}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setpathPoints(data.data.antpath);
                    setpathDistance(data.data.distance);
                    let tempTime = Math.round(pathDistance) / 2;
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
    };
    useEffect(() => {
        fetch_calculate_antpath();
    }, [source, destination]);

    const renderMapAndPath = (currFloorData, floor) => {
        LoaderManager(1);
        if (!currFloorData) return;
        console.log(currFloorData);
        const map = mapRef.current;
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
            try {
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
                        fontadjuster();
                    });
                });
                LoaderManager(0);
                resolve();
            }
            catch (error) {
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
                    console.log(data);
                    set_room_status_data(data);
                    LoaderManager(0);
                    setActiveFloor(0);
                }).catch(error => {
                    console.error(':::: Room Data not available (SERVER ERROR) :::: ');
                    LoaderManager(0);
                    reject(error);
                });
        });
    };
   
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

    return (
        <div>
            <div className="position-fixed bottom-0 fw-bold left-0 text-lg text-brand-primary-dark px-2 fw-bold z-[1]">{hitcount}</div>
            <nav className="flex align-items-center p-2 position-fixed z-[1]">
                <img className="h-[80px]" src={navitlogo} height="70px" />
                <h1 className="text text-brand-primary-dark mx-2 text-4xl"><b>Navit</b></h1>
            </nav>

            <MapContainer
                center={[30.2734504, 77.9997427]}
                zoom={18}
                maxZoom={22}
                minZoom={16}
                zoomControl={false}
                scrollWheelZoom={true}
                zoomAnimation={true}
                style={{ height: '100vh', width: '100%' }}
                id="map"
                whenCreated={(map) => (mapRef.current = map)}
            >
                <TileLayer
                    attribution='<p><a href="https://github.com/ayush-saklani"><img src="https://flagcdn.com/in.svg" width="15" alt="India"><b> Made by Ayush Saklani</b></a> <br>Co-powered by <a href="https://github.com/ayush-saklani/classsync"><b>Classsync</b></a></p>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>

            {/* floorbutton */}
            <div className="floorbutton mx-3 flex gap-1 justify-content-center align-items-center z-[1] flex-column position-fixed  left-0 top-[14%]" >
                {floors.map((floor, index) => (
                    <button key={index} className={`circular_button aspect-square ${activeFloor === floor ? 'active' : ''}`} id={floor} onClick={() => setActiveFloor(floor)}><b>{floor === -1 ? 'B' : floor === 0 ? 'G' : floor}</b></button>
                ))}
            </div>
            {/* floorbutton */}

            {/* bottombar */}
            <div className={`bottom-bar ${down ? 'bottom-bar-down' : ''}`}>
                <button className="countboxi" onClick={handleClick}>
                    <i id="foldup-icon" className={`bi ${down ? 'bi-caret-up-fill' : 'bi-caret-down-fill'} h3`}></i>
                </button>
                <div className="container row justify-content-center mb-2 w-[80%]">
                    <div className="form-floating col-lg-5 col-md-5 col-sm-12 pb-1 text">
                        <select className="form-select" id="Start"
                            onChange={() => { setsource(document.getElementById("Start").value); }}
                            value={source}
                        >
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
                        <label className="ms-2 text coloring" name="Start">
                            <b>Start</b>
                        </label>
                    </div>
                    <div className="form-floating col-lg-5 col-md-4 col-sm-12 pb-1 text">
                        <select className="form-select" id="destination"
                            onChange={() => { setdestination(document.getElementById("destination").value); }}
                            value={destination}
                        >
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
                        <label className="ms-2 text coloring">
                            <b>Destination</b>
                        </label>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-12 pb-1 align-items-center justify-content-center d-flex">
                        <button
                            type="button"
                            className="btn btn-lg btn-light coloring rounded-pill col-12 px-2"
                            id="go"
                            onClick={() => { fetch_calculate_antpath(); }}
                        >
                            <b className="h4 fw-bold text">{Gobuttontext}
                                {Gobuttontext !== "Go" && <i class="bi bi-person-walking"></i>}
                            </b>
                        </button>
                    </div>
                </div>
            </div>
            {/* bottombar */}

            <footer className="fixed top-0 right-0 m-1 z-[1] flex flex-col gap-1 align-items-end justify-content-center">
                <div className="text-3xl px-1 text-brand-primary-dark fw-bold">
                    {loading == false ?
                        <div className="text-3xl text-brand-primary-dark py-1">{timevar}</div> :
                        <div className="spinner-border text-3xl text-brand-primary-dark p-[12px]"></div>}
                </div>
                <a href="https://github.com/ayush-saklani" target="_blank">
                    <FaGithub size={44} className='bg-brand-primary rounded-xl p-2 hover:bg-brand-primary-light text-foreground-1' />
                </a>
                <a href="https://www.linkedin.com/in/ayush-saklani/" target="_blank">
                    <FaLinkedinIn size={44} className='bg-brand-primary rounded-xl p-2 hover:bg-brand-primary-light text-foreground-1' />
                </a>
            </footer >
        </div>
    )
}

export default App
