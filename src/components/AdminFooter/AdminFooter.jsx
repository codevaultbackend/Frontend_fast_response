import React from "react";
import { Link } from "react-router-dom";

function AdminFooter() {
  const currentWorkId = localStorage.getItem("currentWorkId");

  return (
    <div className="TechnicianFooter  mt-[120px] bg-[#fff]">
      <ul className="TechnicianFooter-wrapper flex justify-around fixed bottom-0 shadow-[-12px_-2px_4px_#d6d6d6]  w-full py-[12px] text-[14px] text-white w-full bg-white ">
        <Link to="/adminDashboard/technician" className="bg-[var(--primary-color)]  w-[120px] text-center p-[10px] rounded-[6px] max-[600px]:text-[10px] max-[600px]:px-[2px] max-[600px]:mx-[5px]">
          <li>Technicians</li>
        </Link>
        <Link to="/adminDashboard/client" className="bg-[var(--primary-color)]  w-[120px] text-center p-[10px] rounded-[6px] max-[600px]:text-[10px] max-[600px]:px-[2px] max-[600px]:mx-[5px]">
          <li>Clients</li>
        </Link>
        <Link
          to='/adminDashboard/allWorks'
        className="bg-[var(--primary-color)]  w-[120px] text-center p-[10px] rounded-[6px] max-[600px]:text-[10px] max-[600px]:px-[2px] max-[600px]:mx-[5px]">
          <li>Jobs</li>
        </Link>
        <Link
          to='/adminDashboard/issues'
        className="bg-[var(--primary-color)]  w-[120px] text-center p-[10px] rounded-[6px] max-[600px]:text-[10px] max-[600px]:px-[2px] max-[600px]:mx-[5px]">
          <li className="w-fit mx-auto">Issues</li>
        </Link>
      </ul>
    </div>
  );
}

export default AdminFooter;
