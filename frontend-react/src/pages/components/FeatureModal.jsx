import { BsQrCodeScan } from 'react-icons/bs';
import { FaCircle, FaRegCompass } from 'react-icons/fa6';
import { FiClock } from 'react-icons/fi';
import { GrResources } from 'react-icons/gr';
import { ImCross } from 'react-icons/im';
import { LuClipboardList, LuMousePointerClick } from 'react-icons/lu';
import { MdOutlineSystemSecurityUpdateGood } from 'react-icons/md';
import { PiPathBold } from 'react-icons/pi';
import Modal from 'react-modal';
import { useState } from 'react';

import occupied from '../assets/images/screenshots/occupied.png';
import unoccupied from '../assets/images/screenshots/unoccupied.png';
import singleclick from '../assets/images/screenshots/singleclick.gif';
import doubleclick from '../assets/images/screenshots/doubleclick.gif';
import antpath from '../assets/images/screenshots/antpath.gif';
import highlight from '../assets/images/screenshots/highlight.gif';
import infocard from '../assets/images/screenshots/infocard.png';
import othercolor from '../assets/images/screenshots/othercolor.png';

import { TbArrowBigLeftFilled, TbArrowBigRightFilled } from 'react-icons/tb';
const faqSlides = [
    {
        icon: <PiPathBold className='text-orange-500 mr-3 mt-1 w-40 h-40' />,
        title: 'Set Destination',
        text: <span><strong>Long-press</strong> (mobile) or <strong>right-click</strong> (desktop) to set destination.</span>,
        img: doubleclick
    },
    {
        icon: <LuMousePointerClick className='text-gray-500 mr-3 mt-1 w-40 h-40' />,
        title: 'View Info Card',
        text: <span><strong>Single press</strong> (mobile) or <strong>left-click</strong> (desktop) to view Info Card. Shows course, section, subject etc..</span>,
        img: singleclick
    },
    {
        icon: <MdOutlineSystemSecurityUpdateGood className='text-purple-500 w-40 h-40 flex-shrink-0' />,
        title: 'Current Class Highlight',
        text: <span>Your current class is highlighted if you have selected your course, semester and section in the menu.</span>,
        img: highlight
    },
    {
        icon: <FaCircle className="text-[#fb4934] mr-3 mt-1 w-40 h-40" />,
        title: 'Occupied/Unavailable',
        text: <span><strong>Red rooms</strong> are <strong>occupied</strong>.</span>,
        img: occupied
    },
    {
        icon: <FaCircle className="text-[#8ec07c] mr-3 mt-1 w-40 h-40" />,
        title: 'Available',
        text: <span><strong>Green rooms</strong> are <strong>available</strong>.</span>,
        img: unoccupied
    },
    {
        icon: <span className="mr-3 mt-1 w-40 h-40" style={{ background: "conic-gradient(red, orange, yellow, green, blue, indigo, violet, red)", borderRadius: "50%", display: "inline-block", minWidth: "2em", minHeight: "2em" }} />,
        title: 'Other Colors',
        text: <span>Other colors: staffrooms, offices, etc.</span>,
        img: othercolor
    },
    {
        icon: <FaRegCompass className='text-blue-500 w-40 h-40 flex-shrink-0' />,
        title: 'Navigation',
        text: <span>Shows shortest indoor route.</span>,
        img: antpath
    },
    {
        icon: <BsQrCodeScan className='text-blue-500 w-40 h-40 flex-shrink-0' />,
        title: 'QR Code Scanning',
        text: <span>QR comming soon around the campus.</span>,
        img: null
    },
    {
        icon: <GrResources className='text-green-500 w-40 h-40 flex-shrink-0' />,
        title: 'Class-Sync',
        text: <span>See <a href="https://gehutimetable.vercel.app/" target='_blank' className='text-blue-500 underline'>Class-Sync</a> for timetable.</span>,
        img: "https://gehutimetable.vercel.app/assets/image/logo.png"
    },
];

const FeatureModal = ({ modalIsOpen, setIsOpen }) => {
    const [current, setCurrent] = useState(0);
    const goPrev = () => setCurrent((prev) => (prev === 0 ? faqSlides.length - 1 : prev - 1));
    const goNext = () => setCurrent((prev) => (prev === faqSlides.length - 1 ? 0 : prev + 1));
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="FAQ Modal"
            className="w-full max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 outline-none z-[10000000]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9999999] flex items-center justify-center px-4"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">🚨 Features & FAQs</h2>
                <button onClick={() => setIsOpen(false)} className="text-red-500 hover:text-red-700">
                    <ImCross className="w-5 h-5" />
                </button>
            </div>
            <div className="flex flex-col items-center justify-center min-h-[220px]">
                <div className="flex flex-col items-center gap-2 w-full min-h-[140px] justify-center">
                    <div className="flex justify-center items-center w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-2">
                        {
                            faqSlides[current].img ?
                                <img src={faqSlides[current].img} alt="FAQ visual" className="object-cover h-full w-full max-w-full" /> :
                                <div className="flex items-center justify-center mb-2 text-4xl ">{faqSlides[current].icon}</div>
                        }
                    </div>
                    <div className="text-lg font-bold text-center text-gray-800 dark:text-gray-100 mb-1">{faqSlides[current].title}</div>
                    <div className="text-center text-gray-700 dark:text-gray-300 mb-2 md:h-8 h-10">{faqSlides[current].text}</div>
                </div>
                <div className="flex justify-between items-center w-full mt-4">
                    <button onClick={goPrev} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-lg font-bold"><TbArrowBigLeftFilled /> </button>
                    <div className="flex gap-1">
                        {faqSlides.map((_, idx) => (
                            <span key={idx} className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                        ))}
                    </div>
                    <button onClick={goNext} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-lg font-bold"><TbArrowBigRightFilled /> </button>
                </div>
            </div>
        </Modal>
    );
};

export default FeatureModal;
