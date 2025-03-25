import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './globals.css'

import Home from './pages/home'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default App
