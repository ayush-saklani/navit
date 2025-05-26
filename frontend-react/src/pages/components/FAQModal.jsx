import { BsQrCodeScan } from 'react-icons/bs';
import { FaCircle, FaRegCompass } from 'react-icons/fa6';
import { FiClock } from 'react-icons/fi';
import { GrResources } from 'react-icons/gr';
import { ImCross } from 'react-icons/im';
import { LuClipboardList, LuMousePointerClick } from 'react-icons/lu';
import { MdOutlineSystemSecurityUpdateGood } from 'react-icons/md';
import { PiPathBold } from 'react-icons/pi';
import Modal from 'react-modal';

const FAQModal = ({ modalIsOpen, setIsOpen }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="FAQ Modal"
            className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-xl p-6 outline-none z-[10000000]"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9999999] flex items-center justify-center px-4"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">🚨 Features & FAQs</h2>
                <button onClick={() => setIsOpen(false)} className="text-red-500 hover:text-red-700">
                    <ImCross className="w-5 h-5" />
                </button>
            </div>
            <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start">
                    <PiPathBold className='text-orange-500 mr-3 mt-1 w-5 h-5' />
                    <span><strong>Long-press</strong> (mobile) or <strong>right-click</strong> (desktop) to set destination.</span>
                </li>
                <li className="flex items-start">
                    <LuMousePointerClick className='text-gray-500 mr-3 mt-1 w-5 h-5' />
                    <span><strong>Single press</strong> (mobile) or <strong>left-click</strong> (desktop) to view room info.</span>
                </li>
                <li className="flex items-start">
                    <FaCircle className="text-[#fb4934] mr-3 mt-1 w-5 h-5" />
                    <span><strong>Red rooms</strong> are <strong>occupied</strong> or <strong>unavailable</strong>.</span>
                </li>
                <li className="flex items-start">
                    <FaCircle className="text-[#8ec07c] mr-3 mt-1 w-5 h-5" />
                    <span><strong>Green rooms</strong> are <strong>available</strong>.</span>
                </li>
                <li className="flex items-start">
                    <span className="mr-3 mt-1 w-5 h-5" style={{
                        background: "conic-gradient(red, orange, yellow, green, blue, indigo, violet, red)",
                        borderRadius: "50%",
                        display: "inline-block",
                        minWidth: "1em",
                        minHeight: "1em"
                    }} />
                    <span>Other colors: staff, office, or misc types.</span>
                </li>
                <li className="flex items-center gap-3">
                    <MdOutlineSystemSecurityUpdateGood className='text-purple-500 w-5 h-5 flex-shrink-0' />
                    <span>Your current class is highlighted on the map. Only if you have selected your course, semester and section in the menu.</span>
                </li>
                <li className="flex items-start">
                    <LuClipboardList className='text-yellow-600 mr-3 mt-1 w-5 h-5' />
                    <span>Info card: <strong>course, section, subject, capacity</strong>.</span>
                </li>
                <li className="flex items-center gap-3">
                    <FaRegCompass className='text-blue-500 w-5 h-5 flex-shrink-0' />
                    <span>Navigation shows shortest indoor route.</span>
                </li>
                <li className="flex items-center gap-3">
                    <BsQrCodeScan className='text-blue-500 w-5 h-5 flex-shrink-0' />
                    <span>QR code scanning (coming soon...)</span>
                </li>
                <li className="flex items-center gap-3">
                    <FiClock className='text-gray-500 w-5 h-5 flex-shrink-0' />
                    <span>Best during scheduled hours. Limited after hours.</span>
                </li>
                <li className="flex items-center gap-3">
                    <GrResources className='text-green-500 w-5 h-5 flex-shrink-0' />
                    <span>See <a href="https://gehutimetable.vercel.app/" target='_blank' className='text-blue-500 underline'>Class-Sync</a> for timetable & resource management.</span>
                </li>
            </ul>
        </Modal>
    );
};

export default FAQModal;
