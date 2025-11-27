import React from "react";
import asstes from "../../../public/assets/asstes";

function Missionvission() {
  return (
    <div
      className="vission-wrapper flex flex-wrap max-w-[1000px] m-auto px-[15px]
    justify-between min-h-[500px] p-y-[30px] !h-auto items-center max-[780px]:gap-[30px] max-[780px]:justify-center"
    >
      <div className="mission-card relative ">
        <img
          src={asstes.bluesqure}
          alt="squre"
          className="absolute top-[15%] left-[-30px] z-[9] max-[780px]:left-[-5%] max-[780px]:top-[25%]"
        />
        <div className="internal-wrapper max-w-[400px] rounded-t-[40px] rounded-bl-[40px] shadow-[0px_4px_7px_3px_#0000002E] h-fit p-[20px] relative z-[999] bg-[#F9F9F9] max-[780px]:max-w-[310px]">
          <div className="top-wrapper flex gap-[10px] justify-center">
            <img
              src={asstes.shoote}
              alt="shoot"
              className="bg-[#3B82F6] h-[75px] w-[75px] rounded-[5px] object-cover p-[15px] max-[780px]:h-[55px] max-[780px]:w-[55px]"
            />
            <h2 className="text-[40px] text-[#1F2937] font-bold max-[780px]:text-[30px]">
              Our mission
            </h2>
          </div>

          <hr className="h-[2px] text-[#EAEAEA] bg-[#EAEAEA] my-[10px]" />
          <p className="text-[11px] text-[#515151] mt-[10px] text-center  my-[10px] leading-4.5">
            To deliver reliable, affordable, and high-quality service solutions that improve homes, workplaces, and industries. We aim to build lasting relationships through trust, safety, and sustainable practices in every project we undertake.
          </p>
        </div>
      </div>

      <div className="vission-card relative">
        <img
          src={asstes.greenqure}
          alt="squre"
          className="absolute top-[15%] left-[-30px] z-[9] max-[780px]:left-[-5%] max-[780px]:top-[25%]"
        />
        <div className="internal-wrapper max-w-[400px] rounded-t-[40px] rounded-bl-[40px] shadow-[0px_4px_7px_3px_#0000002E] h-fit p-[20px] relative z-[999] bg-[#F9F9F9] max-[780px]:max-w-[310px]">
          <div className="top-wrapper flex gap-[10px] justify-center">
            <img
              src={asstes.eyemark}
              alt="eye"
              className="bg-[#22C55E]  h-[75px] w-[75px] rounded-[5px] object-cover p-[15px] max-[780px]:h-[55px] max-[780px]:w-[55px]"
            />
            <h2 className="text-[40px] text-[#1F2937] font-bold max-[780px]:text-[30px]">Our vision</h2>
          </div>
          <hr className="h-[2px] text-[#EAEAEA] bg-[#EAEAEA] my-[10px]" />
          <p className="text-[11px] text-[#515151] mt-[10px] text-center  my-[10px] leading-4.5">
          To be recognized as India’s most trusted multi-service partner, revolutionizing how people and organizations build, repair, and maintain spaces through skilled expertise, innovation, and transparency.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Missionvission;
