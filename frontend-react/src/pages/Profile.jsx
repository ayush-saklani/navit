import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import logo from "./assets/images/logo.png";
import { serverlink } from "./utils/constant";
import React, { useRef } from "react";
// data fetch from class-sync api when available currently only hardcoded is the way
import { dynamic_options } from "./utils/constant";
import navitlogo from './assets/images/logo.png'
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Profile = () => {
  const [error, setError] = useState("");
  const [sendbuttonfreeze, setSendButtonFreeze] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({});

  const [selectedCourse, setSelectedCourse] = useState("");
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [sectionOptions, setSectionOptions] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {           // Update semester dynamic_options when course or term changes
    const course = dynamic_options.courses.find(c => c.course_id === selectedCourse);
    if (!course) return;
    let firstSem = dynamic_options.curr_term === "odd" ? 1 : 2;
    let sems = [];
    for (let i = firstSem; i <= course.total_sem; i += 2) {
      sems.push(i.toString());
    }
    setSemesterOptions(sems);
    setSelectedSemester("");
  }, [selectedCourse]);
  useEffect(() => {           // Update section dynamic_options when semester or course changes
    const course = dynamic_options.courses.find(c => c.course_id === selectedCourse);
    if (!course || !selectedSemester) {
      setSectionOptions([]);
      if (!selectedSemester) setSelectedSection("");
      return;
    }
    const sectionList = course.sections[selectedSemester] || [];
    setSectionOptions(sectionList);
    if (!sectionList.includes(selectedSection)) setSelectedSection("");
  }, [selectedCourse, selectedSemester]);
  useEffect(() => {
    if (!user.guest) {
      if (user.course && user.course !== selectedCourse) setSelectedCourse(user.course);
    }
  }, [user.course]);
  useEffect(() => {
    if (!user.guest) {
      if (user.semester && semesterOptions.includes(user.semester) && user.semester !== selectedSemester) setSelectedSemester(user.semester);
    }
  }, [user.semester, semesterOptions]);
  useEffect(() => {
    if (!user.guest) {
      if (user.section && sectionOptions.includes(user.section) && user.section !== selectedSection) setSelectedSection(user.section);
    }
  }, [user.section, sectionOptions]);

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
    const { first_name, last_name, email, role } = user;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gehu|geu)\.ac\.in$/;

    if (!first_name || !last_name || !email || !role) {
      setError("All fields are required.");
      console.log(first_name, last_name, email, role);
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid gehu/geu email ID.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSendButtonFreeze(true);

    if (user.guest === true) {
      toast.error("Guest users cannot update information.");
      return;
    }
    if(!localStorage.getItem("token")){
      toast.error("You are not logged in. Please log in to update your profile.");
      setSendButtonFreeze(false);
      return;
    }

    if (!selectedCourse || !selectedSemester || !selectedSection) {
      toast.error("Please select course, semester, and section.");
      return;
    }

    try {
      fetch(`${serverlink}/update_info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          course: user.course,
          semester: user.semester,
          section: user.section,
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
      setImageProcessing(true);
      const maxFileSize = 300 * 1024; // 300KB
      const maxDim = 400; // Resize to 400x400

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Calculate square crop from center
          const side = Math.min(img.width, img.height);
          const sx = (img.width - side) / 2;
          const sy = (img.height - side) / 2;

          // Prepare canvas
          const canvas = document.createElement("canvas");
          canvas.width = maxDim;
          canvas.height = maxDim;
          const ctx = canvas.getContext("2d");

          // Draw cropped and resized image
          ctx.drawImage(
            img,
            sx, sy, side, side,       // crop source
            0, 0, maxDim, maxDim       // draw to canvas (resize)
          );

          // Compress to JPEG under 300KB
          let quality = 0.92;
          let dataUrl = canvas.toDataURL("image/jpeg", quality);
          while (dataUrl.length > maxFileSize * 1.37 && quality > 0.4) {
            quality -= 0.07;
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }

          if (dataUrl.length > maxFileSize * 1.37) {
            setError("Image is too large, please choose a smaller image.");
          } else {
            setUser((prev) => ({ ...prev, profile_picture: dataUrl }));
          }

          setImageProcessing(false);
        };

        img.onerror = () => {
          setError("Invalid image file.");
          setImageProcessing(false);
        };

        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
      setError(""); // Clear error
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-grow min-h-screen mb-10">
        {/* Right Section */}
        <div className="flex flex-grow justify-center items-center bg-white p-6">
          <div className="w-full max-w-md flex flex-col justify-center min-h-[80vh] mx-auto"> {/* Added vertical centering */}
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


                {
                  user.role === 'student' &&
                  <div className="space-y-6 flex flex-col bg-[#e7e6e6ab] p-3 rounded-lg">
                    <div className="">
                      <label htmlFor="course_option" className="text-sm font-semibold block mb-1">Course</label>
                      <select
                        className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
                        name="course"
                        id="course_option"
                        value={selectedCourse}
                        onChange={e => setSelectedCourse(e.target.value)}
                      >
                        <option value="">Select a course</option>
                        {dynamic_options.courses.map(course => (
                          <option key={course.course_id} value={course.course_id}>{course.course_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="">
                      <label htmlFor="semester_option" className="text-sm font-semibold block mb-1">Semester</label>
                      <select
                        className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
                        name="semester"
                        id="semester_option"
                        value={selectedSemester}
                        onChange={e => setSelectedSemester(e.target.value)}
                      >
                        <option value="">Select a semester</option>
                        {semesterOptions.map(sem => (
                          <option key={sem} value={sem}>{sem}</option>
                        ))}
                      </select>
                    </div>
                    <div className="">
                      <label htmlFor="section_option" className="text-sm font-semibold block mb-1">Section</label>
                      <select
                        className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
                        name="section"
                        id="section_option"
                        value={selectedSection}
                        onChange={e => setSelectedSection(e.target.value)}
                      >
                        <option value="">Select a section</option>
                        {sectionOptions.map(section => (
                          <option key={section} value={section}>{section}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                }

                {/* Error/Success Messages */}
                <div className="h-2 font-semibold my-2">
                  {imageProcessing && <span className="text-blue-500 text-sm">Processing image...</span>}
                  {<p className="text-red-500 text-sm">{error}</p>}
                </div>

                {/* Buttons */}
                <button
                  type="submit"
                  disabled={sendbuttonfreeze || imageProcessing}
                  className={`flex w-full justify-center items-center py-3 px-4 rounded-full gap-2 text-white font-bold ${sendbuttonfreeze || imageProcessing ? "cursor-not-allowed bg-gray-400" : "bg-brand-primary-dark hover:cursor-pointer hover:bg-primary-dark"}`}
                >
                  <span>{imageProcessing ? "Processing..." : "Update Profile"}</span>
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center text-md">
                <span>Nothing to do here? Go </span>{" "}
                <a href="/home">
                  <span className="text-brand-primary-dark font-bold">Home</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-brand-primary-dark text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Brand Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-full mr-4 backdrop-blur-sm border border-white/10">
                <img
                  className="h-[4rem] w-[4rem] object-contain"
                  src={navitlogo}
                  alt="Navit app logo"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold">Navit</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Smart campus navigation & scheduling app
                </p>
              </div>
            </div>

            <p className="text-gray-300 max-w-xl mt-2 md:mt-0 text-sm leading-relaxed">
              Navit helps students navigate classrooms, manage personalized timetables, and stay organized throughout their academic journey. Designed for simplicity, built for students.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Navit. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ayush-saklani/navit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://www.linkedin.in/ayush-saklani/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
