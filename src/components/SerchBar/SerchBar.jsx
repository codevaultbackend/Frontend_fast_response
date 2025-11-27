import React, { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

function SerchBar() {
  const { setSearchQuery } = useContext(MyContext);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    setSearchQuery(inputValue.trim());
    navigate("/service#ExploreServices"); 
  };

  return (
    <div className="SerchBar flex py-[5px] max-w-fit px-[5px] rounded-[50px] shadow-[0px_0px_4px_0px_var(--primary-color)] max-[900px]:shadow-[0] max-[900px]:h-fit h-[50px] items-center mb-[40px] max-[900px]:auto max-[900px]:flex-col max-[900px]:gap-1 max-[900]:flex-wrap">
      <div className="input-box w-fit relative outline-0 flex max-[800px]:gap-1.5 max-[900px]:flex-wrap max-[900px]:justify-center">
        
        <div className="input-loca text-[var(--primary-color)] max-[900px]:shadow-[0px_0px_4px_0px_var(--primary-color)] max-[900px]:h-[45px] max-[900px]:rounded-[50px] max-[900px]:my-[10px] max-[900px]:w-full max-[900px]:text-center">
          <i className="fa-solid fa-magnifying-glass ml-[5px]"></i>
          <input
            type="text"
            placeholder="Search for Services"
            className="text-center h-full outline-0 px-[5px] max-w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <span className="mx-[5px] text-[var(--primary-color)] max-[900px]:hidden">|</span>

       
        <div className="input-loca text-[var(--primary-color)] max-[900px]:shadow-[0px_0px_4px_0px_var(--primary-color)] max-[900px]:h-[45px] max-[900px]:rounded-[50px] max-[900px]:my-[10px] max-[900px]:w-full max-[900px]:text-center">
          <i className="fa-solid fa-location-dot ml-[5px]"></i>
          <input
            type="text"
            placeholder="Bandung, Indonesia"
            className="text-center h-full outline-0 px-[5px]"
          />
        </div>
      </div>

   
      <button
        className="search w-[120px] bg-[var(--primary-color)] h-[35px] text-[#fff] font-semibold rounded-[50px] text-[12px]"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SerchBar;
