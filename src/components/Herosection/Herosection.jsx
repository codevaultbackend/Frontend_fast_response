import React from "react";
import asstes from "../../../public/assets/asstes";
import SerchBar from "../SerchBar/SerchBar";
import { Link } from "react-router-dom";

function Herosection() {
  return (
    <div className="herosection">
      <div className="herosection-wrapper flex justify-between max-w-[1280px] mx-auto">
        <div className="hero-left-content w-fit pt-[90px] pl-[10px] max-[1280px]:pl-[50px] max-w-fit max-[1080px]:m-auto max-[1080px]:justify-center max-[1080px]:pl-0 max-[1080px]:pt-[30px] max-[1080px]:w-[90%] min-[1190px]:w-[55%] ">
          <div className="w-fit m-auto ">
            <SerchBar />
          </div>

          <h3 className="text-3xl text-black leading-2 font-medium m-0 max-[1080px]:text-center max-[1000px]:text-lg ">
            Your Trusted Buddy
          </h3>
          <h2 className=" text-5xl leading-[50px] font-bold mt-[20px] max-[1080px]:text-center max-[1000px]:text-2xl max-[1000px]:leading-[30px]">
            {" "}
            <span className="text-[#5463FF] ">
              Quick , Reliable , Experts
            </span>{" "}
            <br />
            At Your Doorstep
          </h2>
          <p className="text-[#828282] max-[1080px]:text-center text-[15px] leading-[22px] mt-[22px] mb-[10px] w-[65%] max-[1080px]:mx-auto">
            From fabrication and construction to electrical, plumbing, and safety services — we deliver reliable, professional, and cost-effective solutions for homes, offices, and industries, all under one roof.
          </p>
          <div className="hero-Cta flex w-fit max-[1100px]:m-auto">
            <Link to='/service'>
            <button className="book-now-services h-[50px] bg-[var(--primary-color)] px-[15px] text-white font-semibold shadow-[3px_-1px_14px_0px_#00000040] rounded-[52px] mt-[20px]">
              Book Now Services
            </button>
            </Link>
            
            <a href="#howItWorks">
            <button className="howitworks h-[50px] bg-white px-[15px] text-[var(--primary-color)] font-semibold shadow-[3px_-1px_14px_0px_#00000040] rounded-[52px] border-2 border-[var(--primary-color)] mx-[10px] mt-[20px]">
              How It Works
            </button></a>
          </div>
        </div>
        <div className="hero-right-content pt-[70px] w-[45%] relative pr-[10px] max-[1280px]:pr-[10px]  max-[1080px]:hidden">
          <img
            src="https://res.cloudinary.com/athratech/image/upload/v1763971917/fast_response_asstes/r2kzpuay7n6lgwk8b5jx.png"
            alt="hero-overlay"
            className="hero-banner-overlay absolute  !top-0 z-0 w-auto left-0  object-cover pr-[100px] "
          />
          <img
            src="https://res.cloudinary.com/athratech/image/upload/v1763971918/fast_response_asstes/vp3qmuhztr3mh3cpfegs.png"
            alt="hero-banner"
            className="max-h-[500px] h-full w-auto object-cover relative z-10"
          />
        </div>
      </div>
    </div>
  );
}

export default Herosection;
