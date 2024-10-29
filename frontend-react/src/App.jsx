import { useState } from 'react'
import './App.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import FloorButton from './components/floorbutton/floorbutton'
import Bottombar from './components/bottombar/bottombar'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function App() {

	return (
		<>
			<Header />
			<Footer />
			<FloorButton />
			<Bottombar />

			<MapContainer
				center={[30.2734504, 77.9997427]}
				zoom={18}
				maxZoom={22}
				minZoom={16}
				zoomControl={false}
				scrollWheelZoom={true}
				style={{ height: "100vh", width: "100%"}}
				id='map'
			>
				<TileLayer
					attribution='<p><a href="https://github.com/ayush-saklani"><img src="https://flagcdn.com/in.svg" width="15" alt="India"><b> Made by Ayush Saklani</b></a> <br>Co-powered by <a href="https://github.com/ayush-saklani/classsync"><b>Classsync</b></a></p>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
				/>
			</MapContainer>
		</>
	)
}

export default App
