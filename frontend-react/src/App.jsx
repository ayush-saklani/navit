import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './globals.css'

import Home from './pages/Home'
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp"
import Otp from "./pages/Otp"
import ResetPassword from "./pages/ResetPassword"
import Test from "./pages/Test";
import QRGenerator from "./pages/QRGenerator";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />           {/* done  */}
                <Route path="/home" element={<Home />} />       {/* done  */}
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<SignUp />} />   {/* done  */}
                <Route path="/otp" element={<Otp />} />         {/* done  */}
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/test" element={<Test />} />       {/* done  */}
                <Route path="/qrgenerator" element={<QRGenerator />} />
            </Routes>
        </Router>
    )
}

export default App
