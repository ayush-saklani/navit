import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './globals.css'
import Loader from "./pages/components/Loader";

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Otp = React.lazy(() => import('./pages/Otp'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const Test = React.lazy(() => import('./pages/Test'));

function App() {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
