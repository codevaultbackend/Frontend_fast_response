import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, type = "login" }) {
  if (type === "signup") {
    const signupEmail = localStorage.getItem("signupEmail");
    if (!signupEmail) return <Navigate to="/signup" replace />;
  } else {
    const token = localStorage.getItem("authToken");
    if (!token) return <Navigate to="/login" replace />;
  }

  return children;
}
