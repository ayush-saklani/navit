import { useState } from 'react'
import './App.css'
import './assets/css/footer.css'
import './assets/css/floorbutton.css'
import './assets/css/bottombar.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import navitlogo from '/src/assets/images/logo.png'
import roomData from './room.json'

function App() {
	return (
		<div>
			<nav className="navbar navbar-expand p-2 position-fixed start-0 top-0" style={{ zIndex: 1000 }}>
				<a href="index_bootstrap.html"><img className="" src={navitlogo} height="80px" /></a>
				<h1 className="my-3 text coloring mx-2"><b>Indoor Mapping Navit</b></h1>
			</nav>
			<footer className="position-fixed top-50 end-0 translate-middle-y" style={{ zIndex: "50px" }}>
				<div className="btn-group-vertical social-links rounded-start-3">
					<a className="px-2 pt-2 pb-1 m-0 h3" href="https://github.com/ayush-saklani" target="_blank"><i className="bi bi-github"></i></a>
					<a className="px-2 pb-2 pt-1 m-0 h3" href="https://www.linkedin.com/in/ayush-saklani/" target="_blank"><i className="bi bi-linkedin"></i></a>
				</div>
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
