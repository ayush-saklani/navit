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
    return (
        <div>
            <nav className="flex align-items-center p-2 position-fixed z-[1]">
                <img className="h-[88px]" src={navitlogo} height="80px" />
                <h1 className="text text-brand-primary-dark mx-2 text-5xl"><b>Navit</b></h1>
            </nav>
            <footer className="position-fixed top-0 right-0 m-1 flex gap-1 z-[1]" >
                <a href="https://github.com/ayush-saklani" target="_blank">
                    <FaGithub size={44} className='bg-brand-primary rounded-xl p-2 hover:bg-brand-primary-light text-foreground-1' />
                </a>
                <a href="https://www.linkedin.com/in/ayush-saklani/" target="_blank">
                    <FaLinkedinIn size={44} className='bg-brand-primary rounded-xl p-2 hover:bg-brand-primary-light text-foreground-1' />
                </a>
            </footer >
            <floorbutton>
                <div className="floorbutton btn-group-vertical position-fixed bottom-0 start-0 top-0 m-3 " role="group">
                    <button className="circular_button" id="-1"><b>-1</b></button>
                    <button className="circular_button active" id="0"><b>G</b></button>
                    <button className="circular_button" id="1"><b>1</b></button>
                    <button className="circular_button" id="2"><b>2</b></button>
                    <button className="circular_button" id="3"><b>3</b></button>
                    <button className="circular_button" id="4"><b>4</b></button>
                    <button className="circular_button" id="5"><b>5</b></button>
                </div>
            </floorbutton>
            <div className="bottom-bar ">
                <button className="countboxi" id="foldup">
                    <i id="foldup-icon" className="bi bi-caret-down-fill h3"></i>
                </button>
                <div className="container row justify-content-center mb-2">
                    <div className="form-floating col-lg-5 col-md-5 col-sm-12 pb-1 text">
                        <select className="form-select" id="Start">
                            {roomData.rooms.map((room, index) => (
                                <optgroup label={room.floor_label} key={index}>
                                    {room.room_data.map((subroom, subindex) => (
                                        <option key={subindex} value={subroom.roomid}>{subroom.room_name}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        <label className="ms-2 text coloring"><b>Start</b></label>
                    </div>
                    <div className="form-floating col-lg-5 col-md-4 col-sm-12 pb-1 text">
                        <select className="form-select" id="destination">
                            {roomData.amenities.map((room, index) => (
                                <optgroup label={room.floor_label} key={index}>
                                    {room.room_data.map((subroom, subindex) => (
                                        <option key={subindex} value={subroom.roomid}>{subroom.room_name}</option>
                                    ))}
                                </optgroup>
                            ))}
                            {roomData.rooms.map((room, index) => (
                                <optgroup label={room.floor_label} key={index}>
                                    {room.room_data.map((subroom, subindex) => (
                                        <option key={subindex} value={subroom.roomid}>{subroom.room_name}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        <label className="ms-2 text coloring"><b>Destination</b></label>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-12 pb-1 align-items-center justify-content-center d-flex">
                        <button type="button" className="btn btn-lg btn-light coloring rounded-pill col-12 px-2" id="go"><b className="h4 fw-bold">Go</b></button>
                    </div>
                </div>
            </div>

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
        </div>
    )
}

export default App
