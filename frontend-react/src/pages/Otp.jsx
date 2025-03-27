import { KeyboardEvent, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { LuSend } from "react-icons/lu";
import { Toaster, toast } from "react-hot-toast";
import Loader from "./components/Loader";
import logo from "./assets/images/logo.png";
import gif from "./assets/images/logo.gif";
import { serverlink } from "./utils/constant";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  // Fetch email from local storage
  const email = localStorage.getItem("email");

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
      fetch(`${serverlink}/resendotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          if (data.success) {
            setError("");
            toast.success("OTP Resent successfully.");
            setTimer(300); // Start 5-minute timer (300 seconds)
          } else {
            setError(data.errors || "Failed to resend OTP. Please try again.");
            setTimer(20);
          }
        }).catch(error => {
          console.error('out of service.. ~_~  @_@', error);
        });
    } catch (err) {
      console.error(err);
      setError("An error occurred while resending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError(""); // Clear previous errors
    setLoading(true);

    const enteredOtp = otp.join("");

    if (!enteredOtp || enteredOtp.length < 6) {
      setError("Please enter the complete 6-digit OTP.");
      setLoading(false);
      return;
    }

    if (!email) {
      setError("Email not found. Please try logging in again.");
      setLoading(false);
      return;
    }

    try {
      fetch(`${serverlink}/verifyotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          otp: otp.join(""),
          email: localStorage.getItem("email"),
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(otp.join(""), localStorage.getItem("email"),);
          console.log('Success:', data);
          if (data.success) {
            toast.success("OTP verified successfully.");
            setError("");
            localStorage.removeItem("email"); // Clear email from local storage
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
          } else {
            setError(data.errors || "Failed to verify OTP. Re-Check you OTP.");
          }
        }).catch(error => {
          console.error('out of service.. ~_~  @_@', error);
        });

    } catch (err) {
      console.error(err);
      setError("An error occurred while verifying OTP. Please try again.");
    } finally {
      setLoading(false);
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
      {/* Left Section - Image */}
      <Toaster />
      <div className="hidden lg:block lg:w-3/5 relative">
        <img src={gif} className=" w-full h-full object-contain p-20" alt="Cover Photo" />
      </div>

      {/* Right Section - Form */}
      <div className="flex flex-grow justify-center items-center bg-white rounded-l-3xl p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              onClick={() => window.location.replace("/")}
              className="hover:cursor-pointer w-40 h-40"
              src={logo}
              alt=""
            />
          </div>

          {/* OTP Verification Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Email Verification</h2>
            <p className="text-sm text-center text-gray-600">
              Enter the 6-digit code sent to your email.
            </p>

            {<p className="text-sm text-red-500 text-center h-4 font-semibold">{error}</p>}

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

            {/* Resend OTP */}
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


            {/* Verify Button */}
            <div>
              <button
                className={`flex w-full justify-center items-center py-3 px-4 rounded-full gap-2 text-white font-bold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"
                  }`}
                onClick={handleVerifyOTP}
                disabled={loading}
              >
                <HiOutlineMail className="h-5 w-5" />
                <span>{loading ? "Verifying..." : "Verify OTP"}</span>
              </button>
            </div>

            {/* Back to Login */}
            <div className="text-center text-md flex justify-center items-center gap-2 cursor-pointer">
              <span>Entered wrong email?</span>{" "}
              <div onClick={() => {
                localStorage.removeItem("email")
                window.location.href = "/signup"
              }}>
                <span className="text-primary font-bold">Go back to login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
