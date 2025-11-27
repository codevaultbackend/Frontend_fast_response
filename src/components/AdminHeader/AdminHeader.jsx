import React, { useState } from "react";
import asstes from "../../../public/assets/asstes";
import { Link, useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const [toggleSideBarT, setToggleSideBarT] = useState(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div className="top-header-wra shadow-[3px_3px_4px_0px_#0000001A] bg-[#FDFFFE]">
      <div className="TechnicianHeader flex justify-between max-w-[1200px] mx-auto py-[12px] px-[10px]">
        <div className=" flex  flex-col justify-center">
          <h3 className="text-[#585858] text-[15px] font-semibold font-[var(--font-family)]">
            Today’s Jobs
          </h3>
          <p className="text-[12px] font-[500] font-[var(--font-family)] text-[#000000] mt-[2px]">
            <i class="fa-regular fa-calendar text-[var(--primary-color)]"></i>
            {formattedDate}
          </p>
        </div>

        <ul className="header-content flex items-center">
          <li
            className=" p-[8px] rounded-[60%] text-[18px] cursor-pointer shadow-[0_10px_36px_0_#E9D5FF,_0_0_0_1px_#E9D5FF]
"
          >
            <i
              class="fa-solid fa-user"
              onClick={() => setToggleSideBarT(!toggleSideBarT)}
            ></i>
          </li>
        </ul>
        {toggleSideBarT && (
          <>
            <div className="side-bar absolute right-0 top-0 w-[300px] h-[100vh] bg-white z-30 flex flex-col gap-2.5">
              <i
                class="fa-solid fa-xmark my-[20px] mx-[10px] "
                onClick={() => setToggleSideBarT(!toggleSideBarT)}
              ></i>
              <button
                className="h-[45px] bg-[var(--primary-color)] text-[#fff] font-semibold px-[20px] py-[5px] my-[20px]"
                onClick={handleLogout}
              >
                LogOut
              </button>
              <Link to='/adminDashboard/adminRegister'>Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminHeader;
