import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import toast from "react-hot-toast";
import { replace } from "react-router";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isLogin, currentUser } = useAuth();
  const location = useLocation();
  if (!isLogin) {
    return <Navigate to="/auth" replace />;
  }

  if (!currentUser?.pin && location.pathname !== "/auth/enterpin") {
    return <Navigate to="/auth/enterpin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
