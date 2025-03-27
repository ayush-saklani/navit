import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiLogin } from "react-icons/hi";
import { Toaster, toast } from "react-hot-toast";
import Loader from "./components/Loader";
import logo from "./assets/images/logo.png";
import gif from "./assets/images/signin.gif";
import { serverlink } from "./utils/constant";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    fetch(`${serverlink}/resetpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.success) {
          toast.success("OTP sent to your email");
          setError("");
          setTimeout(() => {
            window.location.href = "/reset-password";
          }, 2000);
        } else {
          setError(data.errors || "Something went wrong.");
        }
      }).catch(error => {
        setSendButtonFreeze(false);
        console.error('out of service.. ~_~  @_@', error);
      });
  };
  const [sendButtonFreeze, setSendButtonFreeze] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    setSendButtonFreeze(true);
    fetch(`${serverlink}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then(response => response.json())
      .then(data => {
        setSendButtonFreeze(false);
        console.log('Success:', data);
        if (data.success) {
          console.log(data.data.user);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          toast.success("Sign In successful");
          setError("");
          setTimeout(() => {
            window.location.href = "/home";
          }, 2000);
        } else {
          setError(data.errors || "Something went wrong.");
        }
      }).catch(error => {
        setSendButtonFreeze(false);
        console.error('out of service.. ~_~  @_@', error);
      });
  };


  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      <Toaster />
      <div className="hidden lg:block lg:w-3/5 relative">
        <img src={gif} className=" w-full h-full object-contain p-20" alt="Cover Photo" />
      </div>
      <div className="flex flex-grow justify-center items-center bg-white rounded-l-3xl p-6">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              onClick={() => window.location.replace("/")}
              className="hover:cursor-pointer w-40 h-40"
              src={logo}
              alt=""
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Sign In</h2>
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            <div className="flex flex-col">
              <label
                htmlFor="emailorphone"
                className="text-sm font-semibold mb-1"
              >
                Email
              </label>
              <input
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                id="emailorphone"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-semibold mb-1">
                Password
              </label>
              <div className="relative w-full">
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {
                    showPassword ?
                      <FaEyeSlash className="h-5 w-5" /> :
                      <FaEye className="h-5 w-5" />
                  }
                </button>
              </div>
            </div>
            <div className="flex text-sm">
              <button
                className="text-primary font-semibold"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleLogin}
                disabled={sendButtonFreeze}
                className={`flex w-full justify-center items-center  hover:bg-primary-dark py-3 px-4 rounded-full gap-2 text-white font-bold
                ${sendButtonFreeze ? "cursor-not-allowed bg-gray-500" : "bg-primary hover:bg-primary-dark"}`}
              >
                <HiLogin className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            </div>
            <div className="text-center text-md">
              <span>Don’t have an account?</span>{" "}
              <a href="/signup">
                <span className="text-primary font-bold">Sign up now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signin;