import React from "react";
import asstes from "../../../public/assets/asstes";

function ServiceTopBanner() {
  return (
    <div className="ServiceTopBanner h-[100vh] max-[1000px]:h-[50vh] ">
      <div className="ServiceTopBanner-wrapper">
        <div className="banner-overlay absolute w-full h-full top-[250px] max-[1000px]:top-[100px] ">
          <p className="text-[#F4F7FA] text-[14px] tracking-[1.63px] text-center font-semibold ">Minimal Interior <br /> Design</p>
          <h2 className="font-bold text-[#FFFFFF] px-[10px] text-[34px] max-w-[400px] mx-auto text-center mt-[30px] max-[600px]:text-[22px] max-[600px]:max-w-[350px]">We minimize your waste in every step of the process.</h2>
        </div>
        <div className="banner-img w-full h-full ">
          <img
            src={asstes.Hero}
            alt="herobanner"
            className=" w-full h-[100vh] max-[1000px]:h-[50vh] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceTopBanner;
