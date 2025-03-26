import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './globals.css'

import Home from './pages/Home'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Otp from "./pages/Otp"
import ResetPassword from "./pages/ResetPassword"
import Test from "./pages/Test";

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
                <Route path="/test" element={<Test />} />
            </Routes>
        </Router>
    )
}

export default App
