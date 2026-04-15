import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

const ProtectedRoute = () => {
    const { isLogin } = useAuth();

    if (!isLogin) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;