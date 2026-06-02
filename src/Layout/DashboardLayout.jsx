import Header from "../components/Dashboard/Header.jsx";
import Sidebar from "../components/Dashboard/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { getProfile } from "../redux/slice/loginUserSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { token, currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !currentUser) {
      dispatch(getProfile())
    }
  }, [dispatch, token, currentUser])
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-hidden bg-white p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
