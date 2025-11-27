import React from "react";
import asstes from "../../../public/assets/asstes";

function AboutFastResponse() {
  return (
    <div className="max-w-[1280px] m-auto flex justify-between items-center max-[1000px]:flex-col-reverse">
      <div className="imge-wrapper ">
        <img
          src="https://res.cloudinary.com/athratech/image/upload/v1763971918/fast_response_asstes/ryoishczjibbubuj2jvl.png"
          alt="fast-respose"
        />
      </div>
      <div className="fast-response-con px-[14px]">
        <span className="text-[var(--primary-color)] text-[12px] font-semibold max-[1000px]:text-[8px]">
          ABOUT US
        </span>
        <h2 className="text-[45px] text-[#000] font-bold max-[1000px]:text-[27px]">
          About Fast Response
        </h2>
        <p className="text-[#757095] text-[16px] max-[1000px]:text-[12px]">
          A trusted one-stop solution for fabrication, installation, maintenance, and building improvement services for homes, offices, and industries.
        </p>
        <ul className="mt-[20px]">
          <li className="flex gap-1 mt-3.5 text-[#505887]">
            <img src={asstes.yellowdone} alt="done" />
            Handpicked experts with real industry experience.
          </li>
          <li className="flex gap-1 mt-3.5 text-[#505887]">
            <img src={asstes.yellowdone} alt="done" />
            We handle everything in one platform — you just book and relax.
          </li>
          <li className="flex gap-1 mt-3.5 text-[#505887]">
            <img src={asstes.yellowdone} alt="done" />
            Fair pricing with no hidden surprises.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutFastResponse;
