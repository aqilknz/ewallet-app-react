import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated, token, hasPin } = useSelector((state) => state.auth);

  if (!isAuthenticated || !token) {
    return <Navigate to="/auth" replace />;
  }
  if (!hasPin) {
    return <Navigate to="/auth/enterpin" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;