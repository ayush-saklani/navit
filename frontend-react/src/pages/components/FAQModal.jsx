import { FaCircle } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';
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
                <h2 className="text-2xl font-semibold text-gray-800">🚨 Rules & FAQs</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                >
                    <ImCross className="w-5 h-5" />
                </button>
            </div>

            <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start">
                    <span className="mr-3 text-lg">📍</span>
                    <span>
                        <strong>Long-press (mobile)</strong> or <strong>right-click (desktop)</strong> on a room to set it as a destination.
                    </span>
                </li>

                <li className="flex items-start">
                    <FaCircle className="text-red-500 mr-3 mt-1 w-4 h-4" />
                    <span>
                        <strong>Red rooms</strong> indicate they are currently <strong>occupied</strong> or <strong>unavailable</strong>.
                    </span>
                </li>

                <li className="flex items-start">
                    <FaCircle className="text-green-500 mr-3 mt-1 w-4 h-4" />
                    <span>
                        <strong>Green rooms</strong> indicate they are currently <strong>available</strong>.
                    </span>
                </li>

                <li className="flex items-start">
                    <span
                        className="mr-3 mt-1"
                        style={{
                            background: "conic-gradient(red, orange, yellow, green, blue, indigo, violet, red)",
                            borderRadius: "50%",
                            width: "1em",
                            height: "1em",
                            display: "inline-block",
                            minWidth: "1em",
                            minHeight: "1em"
                        }}
                    />
                    <span>
                        Other rooms have varied colors to indicate staff, office, or miscellaneous types.
                    </span>
                </li>

                <li className="flex items-start">
                    <span className="mr-3 text-lg">🕓</span>
                    <span>
                        The app works best during scheduled hours. Some features may be limited after hours.
                    </span>
                </li>

                <li className="flex items-start">
                    <span className="mr-3 text-lg">📘</span>
                    <span>
                        Use the info card on a room to view <strong>course, section, subject, and capacity</strong>.
                    </span>
                </li>

                <li className="flex items-start">
                    <span className="mr-3 text-lg">🧭</span>
                    <span>
                        Navigation shows the shortest indoor route between your location and selected room.
                    </span>
                </li>
            </ul>
        </Modal>
    );
};

export default FAQModal;
