import React from 'react'

const footer = () => {
    return (
        <footer className="position-fixed top-50 end-0 translate-middle-y" style={{zIndex:"50px"}}>
            <div className="btn-group-vertical social-links rounded-start-3">
                <a className="px-2 pt-2 pb-1 m-0 h3" href="https://github.com/ayush-saklani" target="_blank"><i className="bi bi-github"></i></a>
                <a className="px-2 pb-2 pt-1 m-0 h3" href="https://www.linkedin.com/in/ayush-saklani/" target="_blank"><i className="bi bi-linkedin"></i></a>
            </div>
        </footer >
    )
}

export default footer
