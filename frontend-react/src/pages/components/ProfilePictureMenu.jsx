import React from "react";
import { GiExitDoor } from "react-icons/gi";
import { HiLogout } from "react-icons/hi";

const ProfilePictureMenu = ({ profilepicture, user }) => {
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
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.replace("/signup");
                        }}>
                        <GiExitDoor size={24} />
                        <p className="font-semibold">Sign Up</p>
                    </li>
                }
                <li className="flex items-center gap-2 text-gray-400 hover:bg-red-800 hover:text-white transition-all duration-300 p-2 rounded-md cursor-pointer"
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
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
