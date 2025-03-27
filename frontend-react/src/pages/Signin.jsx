import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiLogin } from "react-icons/hi";
import { Toaster, toast } from "react-hot-toast";
import Loader from "./components/Loader";
import logo from "./assets/images/logo.png";
import gif from "./assets/images/signin.gif";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const asyncfunction = async (playerid) => {
    const response = await fetchData({
      method: "GET",
      url: `/api/player?id=${playerid}`,
      baseUrl: apiAdminUrl,
    });

    if (response.success) {
      setRole(response.data.data.rank);
      if (response.data.data.rank === "admin") {
        console.log("Player is admin");
        router.push("/admin/addteam");
      } else if (
        response.data.data.rank === "captain" ||
        response.data.data.rank === "co-captain"
      ) {
        console.log("Player has captain privilege");
        router.push("/captain/myteam");
      } else {
        alert(
          "Players are not authorized to login. Contact admin. Redirecting to homepage!!"
        );
        router.push("/");
      }
    }
    else {
      alert(
        "You are not authorized to login. Contact admin. Redirecting to homepage!!"
      );
      router.push("/");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    const response = await fetchData({
      method: "POST",
      url: "/api/auth/resetPassword",
      baseUrl: apiAdminUrl,
      data: { email },
    });
    if (response.success) {
      setError("");
      toast.success(response.message);
      setTimeout(() => {
        router.push("/signin/resetpass");
      }, 2000);
    } else {
      setError(response.message || "An error occurred");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetchData({
      method: "POST",
      url: "/api/auth/signin",
      baseUrl: apiAdminUrl,
      data: { email, password },
    });

    if (response.success) {
      toast.success("Sign In successful");
      setJwt(response.data.data.token);
      setPlayerId(response.data.data.playerid);
      setRole(response.data.role);
      setError("");
      asyncfunction(response.data.data.playerid);
    } else {
      setError(response.message || "An error occurred");
      router.push("/register");
    }
  };

  useEffect(() => {
    // Check if window is defined before accessing localStorage
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, []);

  if (error) {
    return (
      <div className="w-full flex justify-center items-center">
        <p className="text-red-500">SOME ERROR OCCURED!, {error}</p>
      </div>
    );
  }
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
                className="text-primary font-medium"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleLogin}
                className="flex w-full justify-center items-center bg-primary hover:bg-primary-dark py-3 px-4 rounded-full gap-2 text-white font-bold"
              >
                <HiLogin className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            </div>
            <div className="text-center text-md">
              <span>Don’t have an account?</span>{" "}
              <a href="/register">
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