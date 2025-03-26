import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './globals.css'

import Home from './pages/Home'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Otp from "./pages/Otp"
import ResetPassword from "./pages/ResetPassword"

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
