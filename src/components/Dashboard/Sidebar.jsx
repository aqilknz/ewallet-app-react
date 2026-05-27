import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
// import { logoutUser } from "../../redux/slice/authSlice";
import { Modal } from "./Modal";
import toast from "react-hot-toast";
import { logoutUserSlice } from "../../redux/slice/loginUserSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    // toast("Sampai Jumpa Kembali! 👋", {
    //   duration: 1000,
    // });
    // setTimeout(() => {
    //   dispatch(logoutUser());
    //   navigate("/auth", { replace: true });
    // }, 1000);
    dispatch(logoutUserSlice())
      .unwrap()
      .then(() => {
        toast.success("Sampai Jumpa Kembali! 👋", { duration: 2000 });
        setIsLogoutModalOpen(false);
        navigate("/auth", { replace: true });
      })
      .catch((err) => {
        toast.error(err || "Sesi diakhiri");
        setIsLogoutModalOpen(false);
        navigate("/auth", { replace: true });
      });
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "/icons/dashboard/dashboard1.svg",
      path: "/dashboard",
    },
    {
      name: "Transfer",
      icon: "/icons/dashboard/transfer.svg",
      path: "/transfer",
    },
    { name: "History", icon: "/icons/dashboard/history.svg", path: "/history" },
    { name: "Top Up", icon: "/icons/dashboard/topup.svg", path: "/topup" },
    { name: "Profile", icon: "/icons/dashboard/profile.svg", path: "/profile" },
  ];

  return (
    <>
      <aside className="z-50 hidden w-64 flex-col overflow-y-auto border-r border-gray-200 bg-white p-6 md:flex">
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center space-x-4 rounded-xl p-3 transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-500 hover:bg-blue-500 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`h-6 w-6 transition-all ${
                      isActive
                        ? "brightness-0 invert"
                        : "group-hover:brightness-0 group-hover:invert"
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="group mt-6 flex w-full items-center space-x-4 rounded-xl p-3 text-red-500 transition-all hover:bg-red-500 hover:text-white"
          >
            <img
              src="/icons/dashboard/Log Out.svg"
              alt="Logout"
              className="h-6 w-6 group-hover:brightness-0 group-hover:invert"
            />
            <span className="font-medium">Keluar</span>
          </button>
        </nav>
      </aside>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        inner="max-w-sm w-full"
      >
        <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
          {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">Konfirmasi Keluar</h2> */}
          <p className="mb-8 px-4 text-gray-500">
            Apakah anda yakin ingin keluar dari akun ini?
          </p>

          <div className="flex gap-3 text-sm">
            <button
              onClick={handleLogout}
              className="w-full cursor-pointer rounded-xl bg-red-500 py-4 font-bold text-white shadow-lg shadow-red-100 transition hover:bg-red-600"
            >
              Ya, Keluar Sekarang
            </button>
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="w-full cursor-pointer rounded-xl border-2 border-gray-100 py-4 font-bold text-gray-500 transition hover:bg-gray-200"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
