import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminFooter from '../../components/AdminFooter/AdminFooter';

function SuperAdminDashboard() {
    const navigate = useNavigate()
    const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
     <AdminHeader />
      <Outlet />
      <AdminFooter />
    </div>
  )
}

export default SuperAdminDashboard
