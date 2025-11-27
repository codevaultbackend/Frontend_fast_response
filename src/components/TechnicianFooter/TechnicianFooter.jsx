import React from "react";
import { Link } from "react-router-dom";

function TechnicianFooter() {
  const currentWorkId = localStorage.getItem("currentWorkId");

  return (
    <div className="TechnicianFooter  mt-[120px] bg-[#fff]">
      <ul className="TechnicianFooter-wrapper flex justify-around fixed bottom-0 shadow-[-12px_-2px_4px_#d6d6d6]  w-full py-[12px] text-[14px] text-white w-full bg-white ">
        <Link to="/TechnicianView/techOrders" className="bg-[var(--primary-color)]  w-[120px] text-center p-[10px] rounded-[6px]">
          <li>Orders</li>
        </Link>
        <Link to="/TechnicianView/Notification" className="bg-[var(--primary-color)]  w-[120px] text-center p-[10px] rounded-[6px]">
          <li>Notification</li>
        </Link>
        <Link
          to={
            currentWorkId
              ? `/TechnicianView/techOrders/current-work/${currentWorkId}`
              : "/TechnicianView/techOrders"
          }
        className="bg-[var(--primary-color)]  w-[120px] text-center p-[10px] rounded-[6px]">
          <li>Current</li>
        </Link>
      </ul>
    </div>
  );
}

export default TechnicianFooter;
