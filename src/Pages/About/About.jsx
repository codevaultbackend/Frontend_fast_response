import React from "react";
import asstes from "../../../public/assets/asstes";
import AboutFastResponse from "../../components/AboutFastResponse/AboutFastResponse";
import Missionvission from "../../components/missionvission/missionvission";
import AboutWhoWe from "../../components/AboutWhoWe/AboutWhoWe";
import CommunityCrousel from "../../components/CommunityCrousel/CommunityCrousel";

function About() {
  return (
    <div
      className="about-wrapper
    "
    >
      <AboutFastResponse />
       <div className="mission bg-[#E8F2FF] min-h-[500px]">
        <Missionvission />
      </div>
      <div className="about-wh-we flex min-h-[500px] bg-[#FEF5F5]">
        <AboutWhoWe />
      </div>
      <div className="testimonials bg-[#E8F2FF] min-h-[500px]">
        <CommunityCrousel />
      </div>
    </div>
  );
}

export default About;
