import { useSelector } from "react-redux";

export const useAuth = () => {
    // Sesuaikan nama properti dengan yang ada di authSlice.js
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const currentUser = useSelector((state) => state.auth.currentUser);

    // Kita tetap kembalikan isLogin agar tidak perlu mengubah ProtectedRoute
    return { isLogin: isAuthenticated, currentUser };
};