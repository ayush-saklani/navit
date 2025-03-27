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
                <Route path="/" element={<Home />} />           {/* done  */}
                <Route path="/home" element={<Home />} />       {/* done  */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />   {/* done  */}
                <Route path="/otp" element={<Otp />} />         {/* done  */}
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/test" element={<Test />} />       {/* done  */}
            </Routes>
        </Router>
    )
}

export default App
