import React, { useState } from "react";
import assets from "../../../public/assets/asstes";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${BACKEND_URL}/forget/forgot-password`, {
        email,
      });

      if (res.data.success) {
        setSuccess("Verification email sent! Check your inbox.");
        setTimeout(() => {
          navigate("/verifyOtp", { state: { email } });
        }, 1500);
      } else {
        setError(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="w-full py-[10px] pl-[20px] flex">
        <img
          src={assets.MainLogo}
          alt="siteLogo"
          className="h-[70px] object-contain"
        />
      </div>

      <div className="flex flex-col max-w-[1280px] h-[550px] m-auto md:flex-row w-full mb-[100px]">
        <div
          className="w-[50%] h-[540px] md:w-1/2 flex flex-col justify-center items-center bg-[var(--background-color)] max-[980px]:w-[100%]
          px-3.5"
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
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-color)] mb-[12px] font-[var(--font-family)]">
              Forgot your password?
            </h2>
            <p className="text-[var(--text-color)] text-sm md:text-base !text-[14px] font-[var(--font-family)] mb-[40px]">
              Don’t worry, happens to all of us. Enter your email below to
              recover your password.
            </p>

            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 relative my-[15px]">
                <label
                  htmlFor="forgetemail"
                  className="text-sm font-medium text-[--text-color] absolute top-[-8px] left-[10px] bg-white px-[5px] !text-[12px] font-[500] z-10"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="forgetemail"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 h-[45px] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[10px] pl-[15px] pr-[35px] border-[var(--primary-color)] w-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary-color)] text-white rounded-[4px] font-medium hover:bg-blue-700 transition h-[50px] text-[14px] cursor-pointer"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>

            <div className="flex items-center my-[30px]">
              <hr className="flex-1 border-gray-300" />
              <span className="text-[var(--text-color)] text-sm px-[10px] font-[600] w-fit">
                Or log in with
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-[15px]">
            {[assets.googleicon, assets.iphoneicon, assets.facebookicon].map(
              (icon, i) => (
                <div
                  key={i}
                  className="border rounded-lg cursor-pointer hover:shadow-md transition-all h-[56px] w-[135px] flex justify-center p-[5px] border-[#515DEF] border-[1px] rounded-[2px] items-center max-[500px]:w-[90px]"
                >
                  <img src={icon} alt="social-icon" className="h-[28px]" />
                </div>
              )
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center bg-gray-100 rounded-[8px]">
          <img
            src={assets.Loginbanner3}
            alt="banner"
            className="w-[450px] h-full !rounded-[4px]"
          />
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
