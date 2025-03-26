"use client";
// import Image from "next/image";
import { useState } from "react";
// import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { apiAdminUrl } from "../constants/contant";
// import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Loader from "./components/Loader";
import logo from "./assets/images/logo.png";
import gif from "./assets/images/signup.gif";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(""); // Clear error on input change
  };

  const validateForm = () => {
    const { firstname, lastname, email, password, confirmPassword } = formData;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return "All fields are required.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    // Add more validations as needed
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      // const response = await fetchData({
      //   method: "POST",
      //   url: "/api/auth/signup",
      //   baseUrl: apiAdminUrl,
      //   data: {
      //     first_name: formData.firstname,
      //     last_name: formData.lastname,
      //     email: formData.email,
      //     password: formData.password,
      //   },
      // });

      // if (response.success) {
      //   // console.log(response);
      //   // localStorage.setItem("token", response.data.token);
      //   localStorage.setItem("email", formData.email);
      //   setError("");
      //   toast.success(response.message);
      //   setTimeout(() => {
      //     router.push("/otp");
      //   }, 2000);

      //   // router.push("/otp");
      // } else {
      //   setError(response.message || "Something went wrong.");
      // }
    } catch (err) {
      setError("Failed to register. Please try again later.");
    }
  };


  if (error) {
    return (
      <div className="w-full flex justify-center items-center">
        <p className="text-red-500">SOME ERROR OCCURED!,{error}</p>
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
      {/* Left Section with cover photo */}
      <div className="hidden lg:block lg:w-3/5 relative">
        <img src={gif} className=" w-full h-full object-contain p-20" alt="Cover Photo" />
      </div>

      {/* Right Section */}
      <div className="flex flex-grow justify-center items-center bg-white rounded-l-3xl p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              className="hover:cursor-pointer w-25 h-25"
              alt="Logo"
            />
          </div>

          {/* Register Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Register</h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6">
              {/* First and Last Name */}
              <div className="flex flex-row lg:gap-4 ">
                <div className="">
                  <label
                    htmlFor="firstname"
                    className="text-sm font-semibold block mb-1"
                  >
                    First Name
                  </label>
                  <input
                    className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    id="firstname"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label
                    htmlFor="lastname"
                    className="text-sm font-semibold block mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    id="lastname"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold block mb-1"
                >
                  Email
                </label>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold block mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="border border-gray-300 rounded-md py-2 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ?
                      <FaEyeSlash className="h-5 w-5" /> :
                      <FaEye className="h-5 w-5" />
                    }
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold block mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className="border border-gray-300 rounded-md py-2 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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

              {/* Error/Success Messages */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {successMessage && (
                <p className="text-green-500 text-sm">{successMessage}</p>
              )}

              {/* Buttons */}
              <button
                type="submit"
                className="flex w-full justify-center items-center bg-primary hover:bg-primary-dark py-3 px-4 rounded-full gap-2 text-white font-bold"
              >
                <span>Sign Up</span>
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center text-md">
              <span>Already have an account?</span>{" "}
              <a href="/login">
                <span className="text-primary font-bold">Sign In</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
