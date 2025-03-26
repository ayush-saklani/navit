import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './globals.css'

import Home from './pages/Home.jsx'
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Otp from "./pages/Otp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/otp" element={<Otp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </Router>
    )
}

export default App
