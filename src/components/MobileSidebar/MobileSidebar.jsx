import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MobileSidebar({  setMobileSideView,mobileSideView, isOpen }) {

    const Navigate = useNavigate()
   
  if (!mobileSideView) return null;
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    Navigate('/login')
  }
  const closeSidebar = () => {
    setMobileSideView(false);
  };
   const token = localStorage.getItem('authToken')

  return (
    <div className="fixed inset-0 z-50 flex">
     
      <div
        className="fixed inset-0 bg-black bg-opacity-40"
        onClick={closeSidebar}
      ></div>

     
      <div className="relative bg-white w-3/4 max-w-xs h-full p-6 flex flex-col">
        <button
          className="absolute top-4 right-4 text-2xl font-bold"
          onClick={closeSidebar}
        >
          &times;
        </button>
        <div className="user-icon">
            <i class="fa-solid fa-user"></i>
        </div>
      <hr className="w-[100%] mx-auto my-[15px] " />
        <nav className="flex flex-col gap-4 mt-10">
           
          <Link to="/" onClick={closeSidebar}>Home</Link>
          <Link to="/service" onClick={closeSidebar}>Service</Link>
          <Link to="/TrackBooking" onClick={closeSidebar}>Booking</Link>
          <a href="#Offer" onClick={closeSidebar}>Offers</a>
          <Link to="/about" onClick={closeSidebar}>About</Link>
        </nav>

  
        <div className="mt-auto flex flex-col gap-3">
          {token ? (
            <button
              className="bg-red-600 text-white py-2 rounded"
              onClick={() => {
                handleLogout();
                closeSidebar();
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={closeSidebar}>
              <button className="bg-[var(--primary-color)] w-full text-white py-2 rounded">
                Login
              </button>
            </Link>
          )}
          <button className="bg-orange-600 text-white py-2 rounded">
            Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
