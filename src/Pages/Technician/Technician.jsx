import React from "react";
import { Outlet } from "react-router-dom";
import TechnicianHeader from "../../components/TechnicianHeader/TechnicianHeader";
import TechnicianFooter from "../../components/TechnicianFooter/TechnicianFooter";

function Technician() {
  const userRole = localStorage.getItem("userRole");

  return (
    userRole === 'technician' && (
      <>
        <div className="Technician h-auto">
          <TechnicianHeader />
          <Outlet />
          <TechnicianFooter />
        </div>
      </>
    )
  );
}

export default Technician;
