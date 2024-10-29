import React from 'react'
import './floorbutton.css'
const floorbutton = () => {
    return (
        <div>
            <div className="floorbutton btn-group-vertical position-fixed bottom-0 start-0 top-0 m-3 " role="group">
                <button className="circular_button" id="-1"><b>-1</b></button>
                <button className="circular_button active" id="0"><b>G</b></button>
                <button className="circular_button" id="1"><b>1</b></button>
                <button className="circular_button" id="2"><b>2</b></button>
                <button className="circular_button" id="3"><b>3</b></button>
                <button className="circular_button" id="4"><b>4</b></button>
                <button className="circular_button" id="5"><b>5</b></button>
            </div>
        </div>
    )
}

export default floorbutton
