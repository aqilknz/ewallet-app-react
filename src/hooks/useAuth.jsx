import { useSelector } from "react-redux";

export const useAuth = () => {
    const isLogin = useSelector((state) => state.user.isLogin);
    const currentUser = useSelector((state) => state.user.currentUser);

    return { isLogin, currentUser };
};