import React from 'react'
import './bottombar.css'
import roomData from './room.json'
const bottombar = () => {
    return (
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
    )
}

export default bottombar