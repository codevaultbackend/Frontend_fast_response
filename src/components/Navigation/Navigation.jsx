import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import asstes from "../../../public/assets/asstes";

function Navigation({ mobileSideView, setMobileSideView, role }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [phoneSideView, setPhoneSideView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };


  if (role == "technician" || role == "admin") return null;

  return (
    <div className="Navigation relative">
      
      {phoneSideView && (
        <div className="side-menu flex-col absolute bg-white w-[40%] right-0 min-h-[100vh] items-center pt-[120px] pl-[50px] z-50 shadow-lg">
          <i
            className="fa-solid fa-xmark cursor-pointer text-xl mb-4"
            onClick={() => setPhoneSideView(false)}
          ></i>
          <button
            className="login h-[45px] w-[110px] bg-[var(--primary-color)] my-[10px] text-[14px] font-[600] text-white rounded-[4px] cursor-pointer"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      )}

  
      <div className="navigation-wrapper flex justify-around max-[1000px]:justify-between max-[1000px]:px-[10px] items-center h-[80px] shadow-md">
     
        <div className="logo-container">
          <img
            src={asstes.MainLogo}
            alt="SiteLogo"
            className="h-[70px] w-[120px] object-cover"
          />
        </div>

        {/* Desktop Navigation Links */}
        <ul className="nav-links flex gap-[50px] pt-[20px] text-[17px] font-[600] max-[1000px]:hidden">
          <Link to="/"><li className="nav-links-items cursor-pointer">Home</li></Link>
          <Link to="/service"><li className="nav-links-items cursor-pointer">Service</li></Link>
          <Link to="/TrackBooking"><li className="nav-links-items cursor-pointer">Booking</li></Link>
          <a href="#Offer"><li className="nav-links-items cursor-pointer">Offers</li></a>
          <Link to="/about"><li className="nav-links-items cursor-pointer">About</li></Link>
        </ul>

        {/* Desktop CTA Buttons */}
        <div className="CTA-container max-[1000px]:hidden flex items-center gap-2">
          {token ? (
            <i
              className="fa-regular fa-user text-xl cursor-pointer"
              onClick={() => setPhoneSideView((prev) => !prev)}
              aria-label="User Menu"
            ></i>
          ) : (
            <Link to="/login">
              <button className="login h-[45px] w-[110px] bg-[var(--primary-color)] text-[14px] font-[600] text-white rounded-[4px] cursor-pointer">
                Login
              </button>
            </Link>
          )}
          <a href="tel:7303835369">
            <button className="Enquiry h-[45px] w-[110px] bg-orange-600 text-[14px] font-[600] text-white rounded-[4px] cursor-pointer">
              Enquiry
            </button>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="hamburgure flex items-center min-[1000px]:hidden">
          <i
            className="fa-solid fa-bars text-[27px] cursor-pointer"
            onClick={() => setMobileSideView(true)}
            aria-label="Open Menu"
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
