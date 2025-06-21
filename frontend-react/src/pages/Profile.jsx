import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import logo from "./assets/images/logo.png";
import { serverlink } from "./utils/constant";
import React, { useRef } from "react";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [sendbuttonfreeze, setSendButtonFreeze] = useState(false);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({});

  useEffect(() => {
    const userexists = localStorage.getItem('user');
    if (userexists) {
      if (!localStorage.getItem("faq")) {
        setIsOpen(true);
        localStorage.setItem("faq", "true");
      }
      setUser(JSON.parse(localStorage.getItem('user')));
    } else {
      localStorage.clear();
      window.location.href = '/signin';
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
    setError(""); // Clear error on input change
  };

  const validateForm = () => {
    const { first_name, last_name, email, password, role } = user;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gehu|geu)\.ac\.in$/;

    if (!first_name || !last_name || !email || !password || !role) {
      setError("All fields are required.");
      console.log(first_name, last_name, email, password, role);
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid gehu/geu email ID.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSendButtonFreeze(true);

    try {
      fetch(`${serverlink}/update_info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
          role: user.role,
          // course: user.course,
          // semester: user.semester,
          // section: user.section,
          profile_picture: user.profile_picture
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.data.user));
            setUser(data.data.user);
            toast.success("Profile updated successfully!");
            setSendButtonFreeze(false);
            setError("");
          } else {
            setSendButtonFreeze(false);
            setError(data.errors || "Something went wrong.");
          }
        }).catch(error => {
          setSendButtonFreeze(false);
          setError("Failed to update profile. Please try again later.");
          console.error('out of service.. ~_~  @_@', error);
        });
    } catch (err) {
      setError("Failed to register. Please try again later.");
    }
  };

  // Handle image upload, resize to max 400px, compress to <300KB, and convert to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxFileSize = 300 * 1024; // 300KB
      const maxDim = 400; // max width or height in px
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          // Resize logic
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((maxDim / width) * height);
              width = maxDim;
            } else {
              width = Math.round((maxDim / height) * width);
              height = maxDim;
            }
          }
          let quality = 0.92;
          let canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          let dataUrl = canvas.toDataURL('image/jpeg', quality);
          // Reduce quality until under 300KB or quality too low
          while (dataUrl.length > maxFileSize * 1.37 && quality > 0.4) {
            quality -= 0.07;
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
          if (dataUrl.length > maxFileSize * 1.37) {
            setError('Image is too large, please choose a smaller image.');
          } else {
            setUser((prev) => ({ ...prev, profile_picture: dataUrl }));
          }
        };
        img.onerror = () => setError('Invalid image file.');
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
    setError(""); // Clear error on input change
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      <Toaster />
      {/* Right Section */}
      <div className="flex flex-grow justify-center items-center bg-white rounded-l-3xl p-6">
        <div className="w-full max-w-md">
          {/* Register Form */}
          <div className="space-y-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold ">
              <img
                src={user.profile_picture || logo}
                alt="Profile"
                size={30}
                className='h-[8rem] w-[8rem] rounded-full p-0 cursor-pointer border-2 border-primary hover:opacity-80 transition duration-200'
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{ objectFit: 'cover' }}
                title="Click to change profile picture"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 w-full"
            >
              {/* First and Last Name */}
              <div className="flex flex-row lg:gap-4 ">
                <div className="">
                  <label
                    htmlFor="first_name"
                    className="text-sm font-semibold block mb-1"
                  >
                    First Name
                  </label>
                  <input
                    className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    id="first_name"
                    type="text"
                    placeholder="Enter your first name"
                    value={user.first_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label
                    htmlFor="last_name"
                    className="text-sm font-semibold block mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    id="last_name"
                    type="text"
                    placeholder="Enter your last name"
                    value={user.last_name}
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
                <div className="border border-gray-300 rounded-md py-2 px-4 w-full bg-gray-100 text-gray-700 cursor-not-allowed select-text">

                  {user.email}
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label
                  htmlFor="role"
                  className="text-sm font-semibold block mb-1"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  value={user.role}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select your role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
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
                    value={user.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ?
                      <FaEyeSlash className="h-5 w-5" /> :
                      <FaEye className="h-5 w-5" />
                    }
                  </button>
                </div>
              </div>

              {/* Error/Success Messages */}
              <div className="h-2 font-semibold my-2">
                {<p className="text-red-500 text-sm">{error}</p>}
              </div>

              {/* Buttons */}
              <button
                type="submit"
                disabled={sendbuttonfreeze}
                className={`flex w-full justify-center items-center py-3 px-4 rounded-full gap-2 text-white font-bold ${sendbuttonfreeze ? "cursor-not-allowed bg-gray-400" : "bg-primary hover:cursor-pointer hover:bg-primary-dark"}`}
              >
                <span>Sign Up</span>
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center text-md">
              <span>Already have an account?</span>{" "}
              <a href="/signin">
                <span className="text-primary font-bold">Sign In</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
