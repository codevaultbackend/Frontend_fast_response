import React from "react";
import { Wrench, Clock, BadgeCheck } from "lucide-react";
import asstes from "../../../public/assets/asstes";

export default function WhyChooseUs() {
  return (
    <section className="relative w-full bg-[#fff] py-20 px-6 overflow-hidden min-h-[100vh] h-fit max-[768px]:h-[250vh] max-[600px]:pt-0">
      <div className="max-w-[1280px] mx-auto text-left mb-20 relative z-[99999] max-[600px]:mb-[145px]">
        <h5 className="text-[#5C6BF0] font-semibold uppercase text-sm tracking-widest">
          WHY CHOOSE US FAST RESPONSE
        </h5>
        <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] leading-tight mt-3 mb-4">
          We’re committed to Providing
          <br />
          the best services experience.
        </h2>
        <p className="text-[#777] max-w-2xl text-[15px] leading-relaxed mb-8">
          Yet bed any for travelling assistant dulgence unpleasing. Not thoughts
          all exercise blessing. Indulgence way everything joy.
        </p>
        <button className="bg-[#5C6BF0] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#4757d3] transition-all shadow-md">
          Book Now
        </button>
      </div>

      <div className="relative max-w-6xl mx-auto max-[900px]:h-full max-[900px]:max-w-full">
        <div className="w-6xl h-auto md:h-[250px]"></div>
        <img
          src={asstes.bluebar}
          alt="bluebar"
          className="absolute top-[-238px] left-[79px] w-[900px] rotate-[10deg] max-[1000px]:hidden"
        />

        <div className="absolute  left-[5%] -translate-y-1/2 max-[1000px]:left-[28%] max-[1000px]:bottom-auto max-[1000px]:top-0 bottom-[-35%] text-center  max-[550px]:left-0 max-[550px]:z-40">
          <div className="bg-white border-2 border-[#5C6BF0] rounded-xl p-1 w-[44px] h-[44px] flex justify-center items-center  shadow-sm max-[1000px]:relative max-[1000px]:top-0 max-[1000px]:left-0">
            <Wrench className="text-[#5C6BF0] text-2xl" size={18} />
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-[#1A1A1A] text-left">
              Verified Professionals Technician
            </h3>
            <p className="text-[#777] text-sm max-w-xs text-left">
              Every technician on our team is fully verified, professionally
              trained, and carefully vetted. You can trust us to deliver safe,
              dependable, and expert service for every job.
            </p>
          </div>
          <span className="absolute text-[140px] text-[#EDEDED] font-bold right-[10px] top-[-55px] select-none max-[1280px]:text-[92px] max-[1280px]:right-[108px] max-[1280px]:right-[108px]">
            1
          </span>
        </div>

        {/* Step 2 */}
        <div className="absolute top-[14px] left-[65%] -translate-x-1/2 max-[1000px]:left-[52%] max-[1000px]:top-[18%] max-[550px]:w-full max-[550px]:right-0 max-[550px]:z-40">
          <div className="bg-white border-2 border-[#5C6BF0] rounded-xl p-1 w-[44px] h-[44px] flex justify-center items-center  shadow-sm">
            <Clock className="text-[#5C6BF0]" size={18} />
          </div>
          <div className="mt-5 text-center md:text-left">
            <h3 className="font-semibold text-[#1A1A1A]">Fast Response</h3>
            <p className="text-[#777] text-sm max-w-xs">
              We value your time — that’s why our team responds quickly and
              arrives on schedule. Whether it’s an urgent repair or a routine
              service, we’re there when you need us most.
            </p>
          </div>
          <span className="absolute text-[140px] text-[#EDEDED] font-bold right-[-20px] top-[-65px] select-none max-[1280px]:text-[92px] max-[1280px]:right-[108px] max-[1280px]:right-[108px]">
            2
          </span>
        </div>

        {/* Step 3 */}
        <div className="absolute top-[-71%] right-[-19px] z-10 max-[1000px]:left-[29%] max-[1000px]:top-[38%] max-[1000px]:w-fit text-center max-[550px]:w-full max-[550px]:left-0 max-[550px]:z-[9999999]">
          <div className="bg-white border-2 border-[#5C6BF0] rounded-xl p-1 w-[44px] h-[44px] flex justify-center items-center  shadow-sm">
            <BadgeCheck className="text-[#5C6BF0]" size={18} />
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-[#1A1A1A] text-left">Quality Guaranteed</h3>
            <p className="text-[#777] text-sm max-w-xs text-left">
              We stand by our work with a 100% satisfaction guarantee. If something isn’t right, we’ll make it right — ensuring lasting quality and peace of mind.
            </p>
          </div>
          <span className="absolute text-[140px] text-[#EDEDED] font-bold right-[-20px] top-[-65px] select-none max-[1280px]:text-[92px] max-[1280px]:right-[108px] max-[1280px]:right-[108px]">
            3
          </span>
        </div>
      </div>

      {/* Background Gradient Circles */}
      <img
        src={asstes.leftmoon}
        alt="leftmoon"
        className="w-[157px] absolute left-0 top-[60%] z-30"
      />
      <img
        src={asstes.rightmoon}
        alt="rightmoon"
        className="w-[200px] absolute right-0 top-[23%] z-0 "
      />
    </section>
  );
}
