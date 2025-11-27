import React from "react";
import assets from "../../../public/assets/asstes";

function ChooseCategory() {
  const categoriesData = [
    { icon: assets.ACrepair, title: "AC Installation & Repairs", jobs: "58 Jobs Available" },
    { icon: assets.plumbing, title: "Plumbing Services", jobs: "42 Jobs Available" },
    { icon: assets.Electrical, title: "Electrical Services", jobs: "35 Jobs Available" },
    { icon: assets.Housepainting, title: "House Painting", jobs: "27 Jobs Available" },
    { icon: assets.CCTV, title: "CCTV Installation", jobs: "19 Jobs Available" },
    { icon: assets.Shadeinstalltion, title: "Shade Installation", jobs: "24 Jobs Available" },
    { icon: assets.Modular, title: "Modular Kitchen Setup", jobs: "31 Jobs Available" },
    { icon: assets.furniture, title: "Furniture Work", jobs: "18 Jobs Available" },
  ];

  return (
    <div className="ChooseCategory px-4">
      <div className="category-header max-w-[1280px] m-auto mt-[25px]">
        <h4 className="text-[19px] text-[#F2994A] my-2 font-bold">
         <h4 className="text-[19px] text-[#F2994A] my-2 font-bold">
          What are you searching for?
        </h4>
        </h4>
        <div className="category-header-wrap flex justify-between items-center flex-wrap gap-2">
          <h3 className="text-[28px] md:text-[34px] font-semibold">
            Choose Categories
          </h3>
          <button className="text-[16px] text-[#333333] font-[400] hover:text-[#F2994A] transition">
            See More
          </button>
        </div>
      </div>


      <div className="category-wrapper grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-[1280px] m-auto mt-[40px] mb-[20px]">
        {categoriesData.map((cateItem, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 shadow-[0px_4px_21px_0_#DEE1FEE5] rounded-[20px] hover:shadow-lg transition-all ${
              index === 1 ? "bg-[#5463FF] text-white" : "bg-white"
            }`}
          >
            <img
              src={cateItem.icon}
              alt="category icon"
              className="object-cover h-[40px] max-[768px]:h-[28px]"
            />
            <div>
              <h4 className={`max-[768px]:text-[14px] text-[16px] font-bold ${index === 1 ? "text-white" : "text-[#333]"}`}>
                {cateItem.title}
              </h4>
              <p className={`max-[768px]:text-[12px] text-[14px] mt-[6px] ${index === 1 ? "text-white" : "text-[#666]"}`}>
                {cateItem.jobs}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseCategory;
