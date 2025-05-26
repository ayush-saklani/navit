import React, { useEffect, useState } from "react";
import { GiExitDoor } from "react-icons/gi";
import { HiLogout } from "react-icons/hi";
// dynamic_options data (move to top of file) fetch from class-sync api when available currently only hardcoded is the way
import { dynamic_options } from "../utils/constant";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ProfilePictureMenu = ({ profilepicture, user }) => {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("");
    const [sectionOptions, setSectionOptions] = useState([]);
    const [selectedSection, setSelectedSection] = useState("");
    const [dropdownExpanded, setDropdownExpanded] = useState(false); // New state for dropdown

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

    useEffect(() => {        // Update section dynamic_options when semester or course changes
        const course = dynamic_options.courses.find(c => c.course_id === selectedCourse);
        if (!course || !selectedSemester) {
            setSectionOptions([]);
            // Only clear selectedSection if selectedSemester is being cleared
            if (!selectedSemester) setSelectedSection("");
            return;
        }
        const sectionList = course.sections[selectedSemester] || [];
        setSectionOptions(sectionList);
        // Only clear selectedSection if the new semester doesn't contain the old section
        if (!sectionList.includes(selectedSection)) setSelectedSection("");
    }, [selectedCourse, selectedSemester]);

    // On mount, fetch from localStorage and fill options if available
    useEffect(() => {
        if (!user.guest) {
            const saved = localStorage.getItem('profile_selection');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.course) setSelectedCourse(parsed.course);
                    // Set semester and section after course options update
                    setTimeout(() => {
                        if (parsed.semester) setSelectedSemester(parsed.semester);
                        if (parsed.section) setSelectedSection(parsed.section);
                    }, 0);
                } catch (e) {
                    // ignore parse errors
                }
            }
        }
    }, [semesterOptions, sectionOptions]);

    // Save values to localStorage as a single unit
    const saveSelection = () => {
        if (!user.guest && selectedCourse && selectedSemester && selectedSection) {
            const profileSelection = {
                course: selectedCourse,
                semester: selectedSemester,
                section: selectedSection
            };
            localStorage.setItem('profile_selection', JSON.stringify(profileSelection));
        }
    };
    return (
        <div className="w-60 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl p-4 flex flex-col gap-3">
            <ul className="list-none flex flex-col gap-3 w-full">
                <li className="flex items-center w-full">
                    <div className="flex flex-col w-full gap-1">
                        {
                            user.guest ?
                                // <div alt="profile pic" className='h-12 w-12 rounded-full p-0 cursor-pointer bg-slate-200 flex items-center justify-center text-slate-800 font-semibold text-3xl capitalize' >{user.first_name[0]}</div> :
                                <img src={profilepicture} alt="x" size={44} className='h-12 w-12 rounded-full p-0 cursor-pointer ' /> :
                                <img src={profilepicture} alt="x" size={44} className='h-12 w-12 rounded-full p-0 cursor-pointer ' />
                        }
                        <h1 className="text-lg text-white font-semibold">
                            {
                                user.guest ?
                                    "Doofinator" :
                                    user.first_name + user.last_name
                            }
                        </h1>
                        <div className="flex gap-2 items-center flex-wrap w-full text-gray-300">
                            <p className="text-sm break-words w-full">
                                {
                                    user.guest ?
                                        "doofenshmsirtz@evilincorp.com" :
                                        user.email
                                }
                            </p>
                        </div>
                        {
                            user.guest &&
                            <div className="flex gap-2 items-center flex-wrap w-full text-gray-300">
                                <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full">
                                    Guest
                                </span>
                            </div>
                        }

                        {
                            !user.guest &&
                            <div className="flex flex-col gap-2 w-full mt-2">
                                <div className="">
                                    <button
                                        className="focus:outline-none flex justify-between items-center mb-1 gap-1"
                                        onClick={() => setDropdownExpanded(prev => !prev)}
                                        aria-label="Toggle selection section"
                                        type="button"
                                    >
                                        <span className="text-xs text-gray-300 font-semibold pl-1">Course/Semester/Section</span>
                                        {
                                            dropdownExpanded ?
                                                <IoIosArrowDown className={`text-gray-300 w-5 h-5 transition-transform`} /> :
                                                <IoIosArrowUp className={`text-gray-300 w-5 h-5 transition-transform`} />
                                        }
                                    </button>
                                </div>
                                <div className={`overflow-hidden transition-all duration-300 ${dropdownExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} w-full`}>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="course_option" className="text-xs text-gray-300 font-semibold mb-1 pl-1">Course</label>
                                        <select
                                            className="bg-gray-800 text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
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
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="semester_option" className="text-xs text-gray-300 font-semibold mb-1 pl-1">Semester</label>
                                        <select
                                            className="bg-gray-800 text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
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
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="section_option" className="text-xs text-gray-300 font-semibold mb-1 pl-1">Section</label>
                                        <select
                                            className="bg-gray-800 text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
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
                                        <button
                                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
                                            onClick={saveSelection}
                                            disabled={!(selectedCourse && selectedSemester && selectedSection)}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </li>
            </ul>

            {/* Separator */}
            <div className="border-t border-gray-700"></div>

            {/* Logout Option */}
            <ul className="list-none flex flex-col gap-2">
                {user.guest &&
                    <li className="flex items-center gap-2 text-gray-400 hover:bg-indigo-800 hover:text-white transition-all duration-300 p-2 rounded-md cursor-pointer"
                        onClick={() => {
                            localStorage.clear();
                            window.location.replace("/signup");
                        }}>
                        <GiExitDoor size={24} />
                        <p className="font-semibold">Sign Up</p>
                    </li>
                }
                <li className="flex items-center gap-2 text-gray-400 hover:bg-red-800 hover:text-white transition-all duration-300 p-2 rounded-md cursor-pointer"
                    onClick={() => {
                        localStorage.clear();
                        window.location.replace("/");
                    }}>
                    <HiLogout size={24} />
                    <p className="font-semibold">Logout</p>
                </li>
            </ul>
        </div>
    );
};

export default ProfilePictureMenu;
