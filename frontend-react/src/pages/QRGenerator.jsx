import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiDownload, HiLogin } from "react-icons/hi";
import { Toaster, toast } from "react-hot-toast";
import Loader from "./components/Loader";
import logo from "./assets/images/logo.png";
import jingle from "./assets/images/doof.mp3";
import gif from "./assets/images/qrgenerator.gif";
import { serverlink } from "./utils/constant";
import { BiDownload } from "react-icons/bi";

const QRGenerator = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendButtonFreeze, setSendButtonFreeze] = useState(true);
    const [timer, setTimer] = useState(0); // 60 seconds timer

    useEffect(() => {
        let interval;
        if (sendButtonFreeze && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setSendButtonFreeze(false);
        }
        return () => clearInterval(interval);
    }, [sendButtonFreeze, timer]);

    const generateqrpdf = async () => {
        setSendButtonFreeze(true);
        console.log("Generating QR Code PDF...");
        let roomdata = JSON.parse(localStorage.getItem("roomstatus_infocache"));
        for (let i = 0; i < roomdata.length; i++) {
            roomdata[i].schedule = {};
        }
        console.log("Room Data:", roomdata);
        // return;
        try {
            const response = await fetch(`${serverlink}/generateqrpdf`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomdata: roomdata })
            });
            console.log("Fetching PDF from server...");
            console.log(response)
            if (!response.ok) {
                throw new Error("Failed to fetch PDF");
            }
            console.log("PDF generated successfully! 1");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Create a download link
            const a = document.createElement('a');
            a.href = url;
            a.download = 'RoomPosters.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            console.log("PDF generated successfully! 1.5");

            window.URL.revokeObjectURL(url); // Clean up

            console.log("PDF download triggered!");
        } catch (error) {
            console.error('PDF generation failed:', error);
        } finally {
            setSendButtonFreeze(false);
        }
    };


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
                    <div className="space-y-5">
                        <h2 className="text-2xl font-bold text-center my-2">Download QR Codes</h2>
                        <ol className="list-disc text-base">
                            <h1 className="text-lg font-semibold text-center mb-3">
                                Read the points before downloading
                            </h1>
                            <li>
                                QR codes are designed to be scanned by the
                                <span className="font-bold"> QR Code Scanner</span> in the
                                <span className="font-bold"> Navit app</span>.
                            </li>
                            <li>
                                These QR Codes are to be pasted outside every room.
                            </li>
                            <li>
                                The QR Codes are also used to promote<span className="font-bold"> Navit</span>.
                            </li>
                            <li>
                                These QR Codes are also used for quick source selection.
                            </li>
                        </ol>
                        {
                            <div className="text-red-500 text-center m-0 h-2">{error}</div>
                        }
                        <div className="space-y-4">
                            <button
                                disabled={sendButtonFreeze}
                                className={`flex w-full justify-center items-center hover:bg-primary-dark py-3 px-4 rounded-full gap-2 text-white font-bold
                                        ${sendButtonFreeze ? "cursor-not-allowed bg-gray-500" :
                                        "bg-primary hover:bg-primary-dark"}`}
                                onClick={generateqrpdf}
                            >
                                <HiDownload className="h-5 w-5" />
                                <span>{sendButtonFreeze ? `Download in ${timer}s` : "Download"}</span>
                            </button>
                        </div>
                        <div className="text-center text-md gap-1 flex w-full justify-center items-center">
                            <span>Don’t Want to Download ?</span>
                            <a href="/">
                                <span className="text-primary font-bold"> Go Back</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default QRGenerator;