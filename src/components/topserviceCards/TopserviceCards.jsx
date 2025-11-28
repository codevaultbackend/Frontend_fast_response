import React from "react";
import asstes from "../../../public/assets/asstes";

function TopserviceCards() {
  const topserviceCardsData = [
    { title: "Painting", img: asstes.painting },
    { title: "Plumbing", img: asstes.plumbingi },
    { title: "Electrician", img: asstes.electrician },
    { title: "Carpentry", img: asstes.carpentry },
    { title: "Civil", img: asstes.civil },
    { title: "Others", img: asstes.others },
  ];

  return (
    <div className="topserviceCards py-14 relative min-h-[100vh] !p-[20px] max-[780px]:min-h-auto ">
      <div className=" cards-wrapper grid grid-cols-1 sm:grid-cols-2  left-[22.5%] lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto absolute top-[-30%] max-[800px]:relative max-[1000px]:left-0 max-[1000px]:top-[20%] max-[1000px]:flex max-[1000px]:flex-wrap ">
        {topserviceCardsData.map((service, index) => (
          <div
            key={index}
            className="topcards bg-white rounded-2xl 
            shadow-[0_0_4px_2px_#cecece] transition-all duration-300 flex flex-col items-center justify-center h-[300px] w-[200px]  max-[800px]:w-[100px] max-[800px]:!h-[100px] mx-auto border relative border-transparent  hover:bg-[#F4F7FA]"
          >
            <img
              src={service.img}
              alt={service.title}
              className="object-contain w-[70px] h-[70px] mb-6 max-[780px]:h-[70px] max-[780px]:w-[70px]"
            />
            <h2 className="text-xl font-semibold text-[13px] text-gray-800 absolute top-[20px] left-[20px] max-[780px]:w-[13px] max-[1000px]:text-[10px] max-[1000px]:top-[83%] max-[1000px]:left-[26%]">
              {service.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopserviceCards;
