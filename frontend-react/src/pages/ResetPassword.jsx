import { useState, useEffect, KeyboardEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LuSend } from "react-icons/lu";
// import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import logo from "./assets/images/logo.png";
import gif from "./assets/images/logo.gif";

const ResetPassword = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [timer, setTimer] = useState(0); // Timer for the countdown

    useEffect(() => {
        let interval = null;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Ensure only one digit
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleResendOTP = async () => {
        setError(""); // Clear previous errors
        setLoading(true);

        if (!email) {
            setError("Email not found. Please try logging in again.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetchData({
                method: "POST",
                url: "/api/auth/resetPassword/resendotp",
                baseUrl: apiAdminUrl,
                data: { email },
            });

            if (response.success) {
                toast.success("OTP Resent successfully.");
                setTimer(300); // Start 5-minute timer (300 seconds)
            } else {
                setError(response.message || "Failed to resend OTP. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while resending OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setError(""); // Clear previous errors
        setLoading(true);

        const enteredOtp = otp.join("");

        if (!enteredOtp || enteredOtp.length < 6) {
            setError("Please enter the complete 6-digit OTP.");
            setLoading(false);
            return;
        }

        if (!password || !confirmPassword) {
            setError("Please enter both password and confirm password.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (!email) {
            setError("Email not found. Please try logging in again.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetchData({
                method: "PATCH",
                url: "/api/auth/resetPassword",
                baseUrl: apiAdminUrl,
                data: { email, password, otp: enteredOtp },
            });

            if (response.success) {
                toast.success("Password reset successfully.");
                localStorage.removeItem("email"); // Clear email from local storage
                setError("");
                setTimeout(() => {
                    router.push("/signin");
                }, 2000);
            } else {
                setError(response.message || "Failed to reset password. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while resetting the password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);


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
            <div className="hidden lg:block lg:w-3/5 relative">
                <img src={gif} className=" w-full h-full object-contain p-20" alt="Cover Photo" />
            </div>

            <div className="flex flex-grow justify-center items-center bg-white rounded-l-3xl p-6">
                <div className="w-full max-w-md">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                        <p className="text-sm text-center text-gray-600">
                            Enter the 6-digit code sent to your email and reset your password.
                        </p>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        {/* OTP Input */}
                        <div className="flex justify-between gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-14 h-14 border border-gray-300 rounded-md text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            ))}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="text-sm font-semibold block mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="border border-gray-300 rounded-md py-2 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="text-sm font-semibold block mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    className="border border-gray-300 rounded-md py-2 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Resend OTP Button */}
                        <div>
                            <button
                                className={`flex w-full justify-center items-center border-2 border-primary hover:bg-primary-dark py-3 px-4 rounded-full gap-2 text-primary font-bold ${timer > 0 || loading ? "cursor-not-allowed opacity-50" : ""
                                    }`}
                                onClick={handleResendOTP}
                                disabled={timer > 0 || loading}
                            >
                                <LuSend className="h-5 w-5" />
                                <span>{timer > 0 ? `Resend in ${timer}s` : loading ? "Resending..." : "Resend OTP"}</span>
                            </button>
                        </div>

                        {/* Reset Password Button */}
                        <div>
                            <button
                                className={`flex w-full justify-center items-center py-3 px-4 rounded-full gap-2 text-white font-bold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"
                                    }`}
                                onClick={handleResetPassword}
                                disabled={loading}
                            >
                                <HiOutlineMail className="h-5 w-5" />
                                <span>{loading ? "Resetting..." : "Reset Password"}</span>
                            </button>
                        </div>

                        {/* Back to signin */}
                        <div className="text-center text-md">
                            <span>Entered the wrong email?</span>{" "}
                            <a href="/signin">
                                <span className="text-primary font-bold">Go back to Sign In page</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ResetPassword;
