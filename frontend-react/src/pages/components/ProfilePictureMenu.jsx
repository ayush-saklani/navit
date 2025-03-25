import React from "react";
import { HiLogout } from "react-icons/hi";

const ProfilePictureMenu = ({ profilepicture }) => {
    return (
        <div className="w-60 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl p-4 flex flex-col gap-3">
            <ul className="list-none flex flex-col gap-3 w-full">
                <li className="flex items-center w-full">
                    <div className="flex flex-col w-full">
                        <img src={profilepicture} alt="x" size={44} className='h-12 w-12 rounded-full p-0 cursor-pointer' />
                        <h1 className="text-lg text-white font-semibold">Lorem Ipsum Username</h1>
                        <div className="flex gap-2 items-center flex-wrap w-full text-gray-300">
                            <p className="text-sm break-words w-full">
                                Loremipsumco.88888888@gehu.ac.in
                            </p>
                            <div className="rounded-full px-2 py-1 text-xs bg-gray-600 text-white">
                                verified
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            {/* Separator */}
            <div className="border-t border-gray-700"></div>

            {/* Logout Option */}
            <ul className="list-none flex flex-col gap-2">
                <li className="flex items-center gap-3 text-gray-400 hover:bg-indigo-800 hover:text-white transition-all duration-300 p-2 rounded-md cursor-pointer">
                    <HiLogout size={20} />
                    <p className="font-semibold">Logout</p>
                </li>
            </ul>
        </div>
    );
};

export default ProfilePictureMenu;
