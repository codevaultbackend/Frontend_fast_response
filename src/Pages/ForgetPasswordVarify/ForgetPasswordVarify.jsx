import React, { useState } from "react";
import assets from "../../../public/assets/asstes";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgetPasswordVarify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };


  const handleVerify = async () => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      setError("Email not found. Please go back and re-enter your email.");
      return;
    }

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter a 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${BACKEND_URL}/verifyEmail`, {
        email,
        otp: otpCode,
      });

      setSuccess(response.data.message);
      setTimeout(() => navigate("/successPage"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      setError("Email not found. Please go back and re-enter your email.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(`${BACKEND_URL}/forget/resend-otp`, { email });
      setSuccess(res.data.message || "OTP resent successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ForgetPasswordVarify">
      <div className="main-wrapper">
        <div className="w-full py-[10px] pl-[20px] flex">
          <img
            src={assets.MainLogo}
            alt="siteLogo"
            className="h-[70px] object-contain"
          />
        </div>

        <div className="flex flex-col max-w-[1280px] h-[550px] m-auto md:flex-row w-full mb-[100px] ">
          <div
            className="w-[50%] h-[540px] md:w-1/2 flex flex-col justify-center items-center bg-[var(--background-color)] max-[980px]:w-[100%] px-3.5"
          >
            <div className="flex items-center w-full max-w-md">
              <Link to="/login">
                <button className="text-[var(--text-color)] hover:text-gray-900 text-sm flex gap-[10px] mb-[20px] items-center font-semibold">
                  <span className="font-bold text-lg">
                    <img
                      src={assets.forgetPasswordicon}
                      className="!h-[12px] w-[9px]"
                      alt="forgetpassword"
                    />
                  </span>
                  Back to Login
                </button>
              </Link>
            </div>

            <div className="w-full max-w-md">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-color)] mb-[22px] font-[var(--font-family)]">
                Verify code
              </h2>
              <p className="text-[var(--text-color)] text-sm md:text-base !text-[14px] font-[var(--font-family)]">
                An authentication code has been sent to your email.
              </p>

              {/* OTP Input Boxes */}
              <div className="flex gap-[20px] flex-wrap justify-center my-[20px]">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleChange(e, i)}
                    className="h-[35px] w-[35px] border-[2px] !border-gray-500 text-center rounded-[7px] outline-0 text-[18px]"
                  />
                ))}
              </div>

              {error && <p className="text-red-500 text-center mb-2 text-[14px]">{error}</p>}
              {success && <p className="text-green-600 text-center mb-2 text-[14px]">{success}</p>}

              <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-[var(--primary-color)] text-white rounded-[4px] font-medium hover:bg-blue-700 transition h-[50px] text-[14px] cursor-pointer disabled:bg-gray-400"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>

              <p className="text-[15px] my-[15px] text-center">
                Didn’t receive the code?{" "}
                <span
                  onClick={handleResend}
                  className="text-[var(--primary-color)] cursor-pointer font-semibold"
                >
                  RESEND
                </span>
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center bg-gray-100 rounded-[8px]">
            <img
              src={assets.Loginbanner2}
              alt="banner"
              className="w-[450px] h-full !rounded-[4px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordVarify;
