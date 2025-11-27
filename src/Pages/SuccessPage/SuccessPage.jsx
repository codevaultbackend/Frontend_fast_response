import React from "react";
import assets from "../../../public/assets/asstes";
import asstes from "../../../public/assets/asstes";
import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div className="ForgetPasswordVarify">
      <div className="w-full py-[10px] pl-[20px] flex">
        <img
          src={assets.MainLogo}
          alt="siteLogo"
          className="h-[70px] object-contain"
        />
      </div>
      <div className="main-wrapper flex justify-center  h-[100%] !items-center">
        <div className="max-w-[550px] w-[100%] bg-[#B7F0BD] !rounded-[var(--border-radius)]  !p-[25px] text-center mt-[30px] ">
          <img
            src={asstes.succesIcon}
            alt="sucess image"
            className="h-[120px] object-cover m-auto"
          />
          <h3 className="text-[#089819] text-[18px] font-semibold my-[10px]">
            Successfull !
          </h3>
          <p className="text-[#089819] text-[12px] font-semibold max-w-[60%] my-[20px] mx-auto">
            Congratulations you have been successfully authenticated
          </p>
          <Link to="/login">
            <button className="h-[50px] bg-[var(--error-color)] text-[#fff] p-[10px] rounded-[5px] cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
