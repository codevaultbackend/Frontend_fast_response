import React, { useState, useEffect } from "react";
import assets from "../../../public/assets/asstes";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const email = query.get("email");
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("signupEmail", email);
      navigate("/client");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.agree) return setError("Please agree to the terms first.");
    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match.");

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/auth/client-register`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );

      if (res.status === 200 || res.data.success) {
        localStorage.setItem("signupEmail", formData.email);
        navigate("/verifySignup", { state: { email: formData.email } });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    try {
      window.location.href = `${API_URL}/auth/google`;
    } catch (err) {
      console.error("Google Signup Error:", err);
    }
  };

  const handleFacebookSignup = () => {
    try {
      const baseUrl = API_URL.replace(/\/api\/auth|\/api/g, "");
      window.location.href = `${API_URL}/auth/facebook?role=client`;
    } catch (err) {
      console.error("Facebook Signup Error:", err);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const LoginBanner = [
    { loginBannerImg: assets.Loginbanner1 },
    { loginBannerImg: assets.Loginbanner2 },
    { loginBannerImg: assets.Loginbanner3 },
  ];

  return (
    <div className="min-h-screen flex flex-col Signup ">
      <div className="w-full py-[10px] pl-[10px] flex">
        <img
          src={assets.MainLogo}
          alt="siteLogo"
          className="h-[70px] object-contain"
        />
      </div>

      <div className="flex lg:flex-row max-w-full w-full mx-auto py-[20px] gap-[15px] px-[8px] justify-center gap-[70px] overflow-hidden px-[40px] max-[500px]:px-[10px]">
        <div className="login-slider-wrap rounded-xl overflow-hidden h-[560px] w-[500px] max-[970px]:hidden">
          <div className="main-banner w-full rounded-xl overflow-hidden login-slider-wrap">
            <Slider {...settings}>
              {LoginBanner.map((item, index) => (
                <div key={index} className="w-full">
                  <img
                    src={item.loginBannerImg}
                    alt="login-banner"
                    className="w-full h-[560px]"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 flex flex-col max-w-[550px] max-[1024px]:max-w-[480px]"
        >
          <h2 className="text-[24px] font-[600] text-[#313131]">Sign Up</h2>
          <p className="text-gray-500 text-[16px]">
            Let’s get you all set up so you can access your personal account.
          </p>

          <div className="max-w-[full] flex flex-col gap-[10px] h-50px relative ">
            <div className="flex flex-row justify-between items-center gap-[10px] ">
              <label className="flex flex-col gap-1 text-gray-600 font-medium relative mt-[20px] mb-[15px] items-center w-[50%]  ">
                <span className=" absolute top-[-28%] left-[9px] bg-white h-fit text-[13px] font-[500] px-[3px]">
                  First Name
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="max-w-[full] rounded-[4px] border border-gray-500 focus:outline-none focus:border-indigo-500 h-[35px] pl-[10px] border-[2px] w-full text-[17px] placeholder:text-[14px]"
                />
              </label>

              <label className="flex flex-col gap-1 text-gray-600 font-medium relative mt-[20px] mb-[15px] items-center w-[50%] ">
                <span className=" absolute top-[-28%] left-[9px] bg-white h-fit text-[13px] font-[500] px-[3px]">
                  Last Name
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="max-w-[full] rounded-[4px] border border-gray-500 focus:outline-none focus:border-indigo-500 h-[35px] pl-[10px] border-[2px] w-full text-[17px] placeholder:text-[14px]"
                />
              </label>
            </div>

            <div className="flex flex-row justify-between gap-[10px] ">
              <label className="flex flex-col gap-1 text-gray-600 font-medium relative w-[50%] ">
                <span className=" absolute top-[-28%] left-[9px] bg-white h-fit text-[13px] font-[500] px-[3px] ">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="max-w-[full] rounded-[4px] border border-gray-500 focus:outline-none focus:border-indigo-500 h-[35px] pl-[10px] border-[2px] w-full text-[17px] placeholder:text-[14px]"
                />
              </label>

              <label className="flex flex-col gap-1 text-gray-600 font-medium relative w-[50%] ">
                <span className=" absolute top-[-28%] left-[9px] bg-white h-fit text-[13px] font-[500] px-[3px]">
                  Phone Number
                </span>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="max-w-[full] rounded-[4px] border border-gray-500 focus:outline-none focus:border-indigo-500 h-[35px] pl-[10px] border-[2px] w-full text-[17px] placeholder:text-[14px]"
                />
              </label>
            </div>

            {/* Password Field */}
            <label className="flex flex-col gap-1 text-gray-600 font-medium relative mt-[10px] mb-[15px] ">
              <span className=" absolute top-[-28%] left-[9px] !bg-white h-fit text-[13px] font-[500] px-[3px] z-10">
                Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full rounded-[4px] border border-gray-500 focus:outline-none focus:border-indigo-500 h-[35px] text-[17px] pl-[10px] pr-[35px] border-[2px] placeholder:text-[14px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-[6px] text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <label className="flex flex-col gap-1 text-gray-600 font-medium relative pb-[10px] ">
              <span className=" absolute top-[-23%] left-[9px] bg-white text-[13px] font-[500] px-[3px] z-10">
                Confirm Password
              </span>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full rounded-[4px] border border-gray-500 focus:outline-none focus:border-indigo-500 h-[35px] placeholder:text-[14px] pl-[10px] pr-[35px] border-[2px]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 top-[6px] text-gray-600"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-[4px] cursor-pointer">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="rounded-lg !border-[4px] border-[var(--text-color)] w-[18px] h-[18px] pl-[10px]"
                />
                <span className="text-gray-600">
                  I agree to all the
                  <strong className="text-[#FF8682] inline-block mx-[5px] font-bold">
                    Terms
                  </strong>
                  and
                  <strong className="text-[#FF8682] inline-block mx-[5px] font-bold">
                    Privacy Policies
                  </strong>
                </span>
              </label>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all h-[48px] rounded-[4px] w-full mt-2 disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>

            <p className="text-gray-600 text-sm text-center my-[10px]">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 text-[var(--error-color)] font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>

            <div className="flex items-center my-[10px] ">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-500 text-sm px-[10px] font-[600] ">
                Or Sign up with
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <div className="flex justify-center gap-4">
              <div
                onClick={handleGoogleSignup}
                className="cursor-pointer hover:shadow-md transition-all h-[56px] w-[135px] flex justify-center p-[5px] border-[#515DEF] border-[1px] rounded-[2px] items-center"
              >
                <img
                  src={assets.googleicon}
                  alt="Google"
                  className="h-[28px]"
                />
              </div>
              <div
                onClick={handleFacebookSignup}
                className="cursor-pointer hover:shadow-md transition-all h-[56px] w-[135px] flex justify-center p-[5px] border-[#515DEF] border-[1px] rounded-[2px] items-center"
              >
                <img
                  src={assets.facebookicon}
                  alt="Facebook"
                  className="h-[28px]"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
