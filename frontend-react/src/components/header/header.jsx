import React from 'react'
import navitlogo from '/src/assets/images/logo.png'
const header = () => {
    return (
        <nav className="navbar navbar-expand p-2 position-fixed start-0 top-0" style={{ zIndex: 1000 }}>
            <a href="index_bootstrap.html"><img className="" src={navitlogo} height="80px" /></a>
            <h1 className="my-3 text coloring mx-2"><b>Indoor Mapping Navit</b></h1>
        </nav>
    )
}

export default header
