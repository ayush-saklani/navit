import { useState } from 'react'
import './App.css'
import './globals.css'
import './assets/css/floorbutton.css'
import './assets/css/bottombar.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import navitlogo from '/src/assets/images/logo.png'
import roomData from './room.json'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa6'

function App() {
    const [activeFloor, setActiveFloor] = useState(0)
    const floors = [-1, 0, 1, 2, 3, 4, 5]
    const [timevar, setTimevar] = useState(null)
    const [down, setDown] = useState(false);

    const handleClick = () => {
        setDown((prevDown) => !prevDown);
    };

    
    const [loaderCounter, setloaderCounter] = useState(0);
    const LoaderManager = (plus) => {        // loader counter 0 = decrease  1 = increase
        // console.log("counter"+loaderCounter);
        if (plus == 1) {
            setloaderCounter(loaderCounter + 1);
        } else if (plus == 0) {
            setloaderCounter(loaderCounter - 1);
        }
        if (loaderCounter > 0) {
            document.getElementById("loader").style.display = "flex";
            document.getElementById("currtime").style.display = "none";
        } else if (loaderCounter == 0) {
            document.getElementById("loader").style.display = "none";
            document.getElementById("currtime").style.display = "flex";
        }
    }
    return (
        <div>
            <div className="position-fixed bottom-0 fw-bold left-0 text-lg text-brand-primary-dark px-2 fw-bold z-[1]">Hits</div>
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
                style={{ height: "100vh", width: "100%" }}
                id='map'
            >
                <TileLayer
                    attribution='<p><a href="https://github.com/ayush-saklani"><img src="https://flagcdn.com/in.svg" width="15" alt="India"><b> Made by Ayush Saklani</b></a> <br>Co-powered by <a href="https://github.com/ayush-saklani/classsync"><b>Classsync</b></a></p>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>

            <floorbutton className="floorbutton mx-3 flex gap-1 justify-content-center align-items-center z-[1] flex-column position-fixed  left-0 top-[14%]" >
                {floors.map((floor, index) => (
                    <button key={index} className={`circular_button aspect-square ${activeFloor === floor ? 'active' : ''}`} id={floor} onClick={() => setActiveFloor(floor)}><b>{floor === -1 ? 'B' : floor === 0 ? 'G' : floor}</b></button>
                ))}
            </floorbutton>

            <bottombar className={`bottom-bar ${down ? 'bottom-bar-down' : ''}`}>
                <button className="countboxi" onClick={handleClick}>
                    <i id="foldup-icon" className={`bi ${down ? 'bi-caret-up-fill' : 'bi-caret-down-fill'} h3`}></i>
                </button>
                <div className="container row justify-content-center mb-2 w-[80%]">
                    <div className="form-floating col-lg-5 col-md-5 col-sm-12 pb-1 text">
                        <select className="form-select" id="Start">
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
                            <b>Start</b>
                        </label>
                    </div>
                    <div className="form-floating col-lg-5 col-md-4 col-sm-12 pb-1 text">
                        <select className="form-select" id="destination">
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
                        >
                            <b className="h4 fw-bold">Go</b>
                        </button>
                    </div>
                </div>
            </bottombar>

            <footer className="fixed top-0 right-0 m-1 z-[1] flex flex-col gap-1 align-items-center justify-content-center">
                <div className="text-xl px-1 text-brand-primary-dark fw-bold">
                    {timevar !== null ? timevar : <div className="spinner-border text-2xl text-brand-primary-dark p-3"></div>}
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
