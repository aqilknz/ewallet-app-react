import { useSelector } from "react-redux";

export const useAuth = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const currentUser = useSelector((state) => state.auth.currentUser);

    return { isLogin: isAuthenticated, currentUser };
};