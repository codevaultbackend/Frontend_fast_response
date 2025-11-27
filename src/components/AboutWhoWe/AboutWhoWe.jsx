import React from "react";
import asstes from "../../../public/assets/asstes";

function AboutWhoWe() {
  return (
    <div className="about-we-wrapper flex items-center m-auto max-w-[1280px] justify-center py-[40px]  max-[1000px]:px-[20px] ">
      <div className="about-we-wrapper flex items-center  justify-center gap-[55px] max-[1000px]:flex-wrap max-[1000px]:justify-center">
        <div className="image-wrapper">
          <img
            src="https://res.cloudinary.com/athratech/image/upload/v1763971917/fast_response_asstes/y9tk5mdjfo2tzvfiuf4h.png"
            alt="Aboutwe"
          />
        </div>

        <div className="aboutwe-wrapper ">
          <h2 className="text-[39px] text-[#000000] my-[10px] font-bold max-[1000px]:text-[27px]">
            Who we are!
          </h2>

          <ul className="bg-[#FFFFFF] border-2 border-[#E4E4E7] rounded-[4px] p-[17px]">
            <h3 className=" text-[15px] font-semibold gradient-text my-[10px]">
              Skilled services delivering long-lasting, quality results.
            </h3>

            {/* ITEM 1 */}
            <li className="flex gap-1 items-center my-3 ">
              <span className="inline-block h-[50px] w-[4px] bg-[#3B82F6]"></span>
              <div className="wrapper-about-we ml-[20px]">
                <p className="text-[12px] text-[#1F2937] font-semibold">
                  Expert solutions for every repair, installation, and upgrade.
                </p>
                <p className="text-[12px] text-[#4B5563] font-[400]">
                  From fabrication to interior work — our verified technicians ensure durable, high-quality workmanship.
                </p>
              </div>
            </li>

            {/* ITEM 2 */}
            <li className="flex gap-1 items-center my-3 ">
              <span className="inline-block h-[50px] w-[4px] bg-[#22C55E]"></span>
              <div className="wrapper-about-we ml-[20px]">
                <p className="text-[12px] text-[#1F2937] font-semibold">
                  Reliable professionals for home, commercial & industrial needs.
                </p>
                <p className="text-[12px] text-[#4B5563] font-[400]">
                  Whether it’s electrical, carpentry, construction, or mechanical work — our experts deliver trusted results.
                </p>
              </div>
            </li>

            {/* ITEM 3 */}
            <li className="flex gap-1 items-center my-3 ">
              <span className="inline-block h-[50px] w-[4px] bg-[#F97316]"></span>
              <div className="wrapper-about-we ml-[20px]">
                <p className="text-[12px] text-[#1F2937] font-semibold">
                  Fast, professional, and customer-focused service experience.
                </p>
                <p className="text-[12px] text-[#4B5563] font-[400]">
                  With transparent pricing, skilled technicians, and timely delivery — we ensure service you can count on.
                </p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default AboutWhoWe;
