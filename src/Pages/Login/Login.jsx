import React, { useState, useEffect } from "react";
import assets from "../../../public/assets/asstes";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (res.data?.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("technicianId", res.data.technicianId);
        localStorage.setItem("userRole", res.data.user?.role || "client");
        console.log("User role from API:", res.data.user?.role);
        console.log(
          "Role stored in localStorage:",
          localStorage.getItem("userRole")
        );

        const role = localStorage.getItem("userRole");

        if (role === "technician") {
          navigate("/TechnicianView");
        } else if (role === "client") {
          navigate("/");
        } else if (role === "admin") {
          navigate("/adminDashboard");
        } else {
          console.error("Unknown role:", role);
        }
      } else {
        setError(res.data?.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google?role=client`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${API_URL}/auth/facebook?role=client`;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("authToken");

    console.log(token);

    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", "client");

      window.location.href = "/";
    }
  }, [location, navigate]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("authToken");

    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", "client");
      window.location.href = "/";
    }
  }, [location, navigate]);

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
    <div className="min-h-screen flex flex-col bg-white">
      <div className="w-full py-[10px] pl-[20px] flex">
        <img
          src={assets.MainLogo}
          alt="siteLogo"
          className="h-[70px] object-contain"
        />
      </div>

      <div className="flex lg:flex-row max-w-full w-full mx-auto py-[20px] gap-[15px] px-[8px] justify-center gap-[70px] px-[50px] max-[500px]:px-[10px] mt-[20px]">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 flex flex-col max-w-[460px]"
        >
          <h2 className="text-3xl font-[600] text-[#313131] text-[30px]">
            Login
          </h2>
          <p className="text-gray-500">
            Login to access your TravelWise account
          </p>

          <div className="max-w-[full] flex flex-col gap-[10px] h-50px relative">
            <label className="flex flex-col gap-1 text-gray-600 font-medium !mt-[30px] relative">
              <span className="absolute top-[-25%] left-[17px] !px-[3px] bg-white text-[13px] font-[500]">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="max-w-[full] rounded-[4px] border border-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-unset h-[45px] pl-[10px] border-[2px]"
              />
            </label>

            <label className="flex flex-col gap-1 text-gray-600 font-medium relative mt-[20px] mb-[15px]">
              <span className="absolute top-[-25%] left-[13px] !px-[3px] z-10 bg-white text-[13px] font-[500]">
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
                  className="max-w-[full] w-full rounded-[4px] border border-gray-500 focus:outline-none focus:border-indigo-500 h-[45px] pl-[10px] pr-[35px] border-[2px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-[10px] text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {/* Remember Me + Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-[4px] cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-300 h-[20px] w-[20px]"
                />
                <span className="text-gray-600">Remember Me</span>
              </label>

              <Link
                to="/ForgetPassword"
                className="text-[#FF8682] font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all h-[48px] rounded-[4px] mt-3 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-gray-600 text-sm text-center my-[10px]">
              Don’t have an account?
              <Link
                to="/signup"
                className="ml-1 text-[#FF8682] font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>

            <div className="flex items-center my-[20px]">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-500 text-sm px-[10px] font-[600]">
                or login with
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Social logins */}
            <div className="flex justify-center gap-4">
              <div
                onClick={handleGoogleLogin}
                className="border rounded-lg cursor-pointer hover:shadow-md transition-all h-[56px] w-[135px] flex justify-center p-[5px] border-[#515DEF] border-[1px] rounded-[2px] items-center"
              >
                <img
                  src={assets.googleicon}
                  alt="google"
                  className="h-[28px]"
                />
              </div>

              <div
                onClick={handleFacebookLogin}
                className="border rounded-lg cursor-pointer hover:shadow-md transition-all h-[56px] w-[135px] flex justify-center p-[5px] border-[#515DEF] border-[1px] rounded-[2px] items-center"
              >
                <img
                  src={assets.facebookicon}
                  alt="facebook"
                  className="h-[28px]"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="max-w-[500px] w-full lg:w-1/2 flex justify-center p-[10px] max-[1000px]:hidden">
          <div className="w-full rounded-xl overflow-hidden login-slider-wrap">
            <Slider {...settings}>
              {LoginBanner.map((item, index) => (
                <div key={index} className="w-full">
                  <img
                    src={item.loginBannerImg}
                    alt="login-banner"
                    className="max-h-[516px] h-full max-w-full w-full object-fill rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
