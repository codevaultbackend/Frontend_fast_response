import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import VerifySignup from "./Pages/VerifySignup/VerifySignup";
import ForgetPasswordVarify from "./Pages/ForgetPasswordVarify/ForgetPasswordVarify";
import SuccessPage from "./Pages/SuccessPage/SuccessPage";
import Home from "./Pages/Home/Home";
import ForgetPassword from "./Pages/VerifyCode/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import OnboardingPage from "./Pages/OnboardingPage/OnboardingPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import About from "./Pages/About/About";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Service from "./Pages/Service/Service";
import BookingTracking from "./components/BookingTracking/BookingTracking";
import Technician from "./Pages/Technician/Technician";
import TrackOrderRecords from "./Pages/TrackOrderRecords/TrackOrderRecords";
import TechnicianOrder from "./Pages/TechnicianOrder/TechnicianOrder";
import TechnicianNotification from "./Pages/TechnicianNotification/TechnicianNotification";
import TechCurrentOrder from "./Pages/TechCurrentOrder/TechCurrentOrder";
import Page404 from "./Pages/404Page/Page404";
import MobileSidebar from "./components/MobileSidebar/MobileSidebar";
import ContactPage from "./Pages/ContactPage/ContactPage";
import SuperAdminDashboard from "./Pages/SuperAdminDashboard/SuperAdminDashboard";
import RegisterTechnician from "./Pages/TechRegister/RegisterTechnician.jsx";
import FetchAllTechnicians from "./Pages/FetchAllTechnicians/FetchAllTechnicians.jsx";
import FetchAllClients from "./Pages/FetchAllClients/FetchAllClients.jsx";
import AllWorkAdmin from "./Pages/AllWorkAdmin/AllWorkAdmin.jsx";
import BookingPopup from "./Pages/BookingPopup/BookingPopup.jsx";
import IssuesPage from "./Pages/IssuesPage/IssuesPage.jsx";
import ExploreIssue from "./Pages/ExploreIssue/ExploreIssue.jsx";
import AllWorkDescrip from "./Pages/AllWorkDescrip/AllWorkDescrip.jsx";
import HomeCrm from "./components/HomeCrm/HomeCrm.jsx";

function AppContent() {
  const location = useLocation();
  const role = localStorage.getItem("userRole");
  const [mobileSideView, setMobileSideView] = useState(false);

    useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) => console.log("SW registered:", reg))
          .catch((err) => console.log("SW registration failed:", err));
      });
    }
  }, []); 

  const hideOnRoutes = [
    "/login",
    "/signup",
    "/TechnicianView",
    "/TechnicianView/techOrders",
    "/TechnicianView/Notification",
    "/TechnicianView/current",
    "/ForgetPassword",
    "/client",
    "/verifySignup",
  ];

  const shouldHide = hideOnRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {role === "client" && (
        <>
          <HomeCrm />
        </>
      )}
      <MobileSidebar
        mobileSideView={mobileSideView}
        setMobileSideView={setMobileSideView}
      />
      <BookingPopup />

      {!shouldHide && (
        <Navigation
          mobileSideView={mobileSideView}
          setMobileSideView={setMobileSideView}
          role={role}
        />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/"
          element={
            role === "technician" ? (
              <Navigate to="/TechnicianView" replace />
            ) : role === "admin" ? (
              <Navigate to="/adminDashboard" replace />
            ) : (
              <Home />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/TrackBooking" element={<BookingTracking />} />
        <Route path="/TrackOrderRecords/:id" element={<TrackOrderRecords />} />
        <Route path="/Not-Found" element={<Page404 />} />

        
        {role === "technician" && (
          <Route path="/TechnicianView" element={<Technician />}>
            <Route index element={<TechnicianOrder />} />
            <Route path="techOrders" element={<TechnicianOrder />} />
            <Route
              path="techOrders/current-work/:workId"
              element={<TechCurrentOrder />}
            />
            <Route path="Notification" element={<TechnicianNotification />} />
          </Route>
        )}

        {role === "admin" && (
          <Route path="/adminDashboard" element={<SuperAdminDashboard />}>
            <Route path="adminRegister" element={<RegisterTechnician />} />
            <Route index element={<FetchAllTechnicians />} />
            <Route path="technician" element={<FetchAllTechnicians />} />
            <Route path="allWorks" element={<AllWorkAdmin />} />
            <Route path="client" element={<FetchAllClients />} />
            <Route path="issues" element={<IssuesPage />} />
            <Route path="issues/:workId" element={<ExploreIssue />} />
            <Route path="AllWorkDescrip/:workId" element={<AllWorkDescrip />} />
          </Route>
        )}

        <Route
          path="/verifyOtp"
          element={
            <ProtectedRoute type="verifyOtp">
              <ForgetPasswordVarify />
            </ProtectedRoute>
          }
        />
        <Route
          path="/successPage"
          element={
            <ProtectedRoute type="SuccessPage">
              <SuccessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verifySignup"
          element={
            <ProtectedRoute type="signup">
              <VerifySignup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoute type="login">
              <OnboardingPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Page404 />} />
      </Routes>

      {!shouldHide && <Footer role={role} />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
