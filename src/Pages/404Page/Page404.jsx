import React from "react";
import asstes from "../../../public/assets/asstes";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="404Page flex gap-[10px] min-h-[100vh] items-center max-w-[1280px] mx-auto max-[900px]:flex-column max-[900px]:py-[10px]">
      <div className="404Page-wrapper flex gap-[10px] min-h-[100vh] items-center mx-auto gap-[40px] max-[900px]:flex-col-reverse max-[900px]:py-[30px]">
        <div className="right-content">
          <h2 className="text-[40px] font-bold ">Oops!</h2>
          <h4 className="text-[26px] font-semibold">Something went wrong.</h4>
          <p className="text-[16px] font-[500]">
            Sorry, We can’t find the page you’re looking for.
          </p>
          <Link to="/">
            <button className="bg-[var(--primary-color)] h-[47px] rounded-[4px] my-[10px] px-[10px] text-[12px] text-[#fff] my-[10px]">
              Back to home
            </button>
          </Link>
        </div>
        <div className="right-content">
          <img
            src={asstes.banner404}
            className="max-h-[400px] object-cover "
            alt="404page"
          />
        </div>
      </div>
    </div>
  );
}

export default Page404;
