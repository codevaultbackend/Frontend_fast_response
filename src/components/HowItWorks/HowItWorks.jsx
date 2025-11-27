import React from "react";
import asstes from "../../../public/assets/asstes";

function HowItWorks() {
  return (
    <div className="howitworks min-h-[100vh] max-w-[1000px] m-auto" id="howItWorks">
      <h2 className="text-[36px] text-[#313131] text-center">How it works</h2>
      <p className="text-[12px] text-[#425466] text-center mt-[10px] mb-[40px]">
        Book professional services in just a few easy steps — fast, <br />{" "} transparent, and hassle-free.
        
      </p>
      <div className="flex flex-col max-[1000px]:items-center max-[1000px]:justify-center">
        <div className="howitworks-wrapper flex gap-[40px] justify-between mt-[150px] max-[1000px]:flex-col">
          <div className="left-wrapper relative max-w-[400px] max-[1000px]:max-w-[310px]">
            <div className="first-box">
              <img
                src={asstes.howitworks1}
                alt="howitworks"
                className="absolute right-[-43px] max-[600px]:right-[-15px] top-[-115px]"
              />
              <img
                src={asstes.howitworks2}
                alt="howitworks"
                className="absolute top-[-34px] left-[-34px] max-[600px]:left-[5px] max-[1000px]:left-[-14px]"
              />
            </div>
            <img
              src={asstes.howitworks3}
              alt="howitworks"
              className="abolute"
            />
          </div>
          <div className="right-text max-w-[320px] max-[1000px]:text-center">
            <h2 className="text-[18px] text-[#222831] font-semibold mb-[10px]">
              Create Account
            </h2>
            <p>
              Sign up with your name and contact details to get started. Your dashboard helps you track bookings, payments, and service history — all in one place.
            </p>
          </div>
        </div>
        <div className="howitworks-wrapper flex gap-[40px] justify-between mt-[150px] max-[1000px]:flex-col-reverse">
          <div className="right-text max-w-[320px] max-[1000px]:text-center max-[1000px]:mt-[10px] ">
            <h2 className="text-[18px] text-[#222831] font-semibold mb-[10px]">
              Search for Services
            </h2>
            <p>
              Browse from a wide range of services — from electrical and plumbing to interiors and fabrication. Compare options, check details, and choose what you need.
            </p>
          </div>
          <div className="left-wrapper relative max-w-[400px] max-[1000px]:flex-col max-[1000px]:max-w-[310px]">
            <div className="first-box">
              <img
                src={asstes.howitworks4}
                alt="howitworks"
                className="absolute right-[-43px] max-[600px]:right-[-15px] top-[-115px]"
              />
              <img
                src={asstes.howitworks6}
                alt="howitworks"
                className="absolute top-[-34px] left-[-34px] max-[600px]:left-[5px] max-[1000px]:left-[-14px] "
              />
            </div>
            <img
              src={asstes.howitworks5}
              alt="howitworks"
              className="abolute"
            />
          </div>
        </div>
        <div className="howitworks-wrapper flex gap-[40px] justify-between mt-[150px] mb-[100px] max-[1000px]:flex-col">
          <div className="left-wrapper relative max-w-[400px] max-[1000px]:max-w-[310px]">
            <div className="first-box">
              <img
                src={asstes.howitworks7}
                alt="howitworks"
                className="absolute right-[-43px] max-[600px]:right-[-15px] top-[-115px]"
              />
              <img
                src={asstes.howitworks9}
                alt="howitworks"
                className="absolute top-[-34px] left-[-34px] max-[600px]:left-[5px] max-[1000px]:left-[-14px] "
              />
            </div>
            <img
              src={asstes.howitworks8}
              alt="howitworks"
              className="abolute"
            />
          </div>
          <div className="right-text max-w-[320px] max-[1000px]:text-center">
            <h2 className="text-[18px] text-[#222831] font-semibold mb-[10px]">
              Book & Relax
            </h2>
            <p>
              Pick your preferred time slot and confirm your booking. Our verified professionals will arrive on schedule to complete the job with guaranteed quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
