import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { logoutUser } from "../../redux/slice/authSlice";
import { logoutUser } from "../../redux/slice/authUserSlice";
import { useDispatch } from "react-redux";
import { Modal } from "./Modal";
import toast from "react-hot-toast";

function Header() {
  const { currentUser, isLoading } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/ewallet";

  const getProfileImage = (photoPath) => {
    if (!photoPath) return "/icons/Profile/User.svg";
    if (photoPath.startsWith("http")) return photoPath;

    let fileName = photoPath;
    if (fileName.includes("/")) {
      const parts = fileName.split("/");
      fileName = parts[parts.length - 1];
    }

    return `${API_BASE_URL}/img/profiles/${fileName}`;
  }
  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success("Sampai Jumpa Kembali! 👋", { duration: 2000 });
        setIsLogoutModalOpen(false);
        navigate("/auth", { replace: true });
      })
      .catch(() => {
        // toast.error(err || "Sesi berakhir");
        toast.success("Sampai Jumpa Kembali! 👋", { duration: 2000 });
        setIsLogoutModalOpen(false);
        navigate("/auth", { replace: true });
      });
  };

  return (
    <header className="border-secondary min-w-full border-b-2 bg-white">
      <div className="flex h-20 w-full items-center justify-between px-6 md:px-10">
        <div className="flex items-center justify-center gap-2">
          <img src="/icons/logo.svg" className="h-10 w-10" alt="Logo" />
          <span className="font-nunito text-primary text-lg font-bold">
            E-Wallet
          </span>
        </div>

        <div className="relative flex items-center py-5">
          <div
            className="flex cursor-pointer items-center gap-2 rounded-xl p-2 transition-all hover:bg-gray-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="hidden font-bold md:block">
              {currentUser?.full_name || "User"}
            </span>
            <img
              src={getProfileImage(currentUser?.photo || currentUser?.avatar)}
              className="h-10 w-10 rounded-full object-cover"
              alt="User"
            />
            <img
              src="/icons/down.svg"
              className={`h-6 w-6 transition-transform duration-300 md:hidden ${isOpen ? "rotate-180" : ""}`}
              alt="Arrow"
            />
          </div>

          {isOpen && (
            <div className="absolute top-full right-0 z-10 mt-2 w-56 rounded-2xl border border-gray-100 bg-white py-3 shadow-xl md:hidden">
              <div className="space-y-1 px-2">
                <span className="block py-2 text-center text-sm font-bold text-gray-700">
                  {currentUser?.full_name || "User"}
                </span>
                <Link
                  to="/dashboard"
                  className="hover:bg-primary block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:text-white"
                >
                  Dashboard
                </Link>

                <Link
                  to="/transfer"
                  className="hover:bg-primary block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:text-white"
                >
                  Transfer
                </Link>

                <Link
                  to="/history"
                  className="hover:bg-primary block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:text-white"
                >
                  History
                </Link>

                <Link
                  to="/topup"
                  className="hover:bg-primary block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:text-white"
                >
                  Top Up
                </Link>

                <Link
                  to="/profile"
                  className="hover:bg-primary block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:text-white"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      // inner="max-w-sm w-full"
      >
        <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
          {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">Konfirmasi Keluar</h2> */}
          <p className="mb-8 px-4 text-gray-500">
            Apakah anda yakin ingin keluar dari akun ini?
          </p>

          <div className="flex gap-3 text-sm">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full cursor-pointer rounded-xl bg-red-500 py-4 font-bold text-white shadow-lg shadow-red-100 transition hover:bg-red-600"
            >
              {isLoading ? "Memproses..." : "Ya, Keluar Sekarang"}
            </button>
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              disabled={isLoading}
              className="w-full cursor-pointer rounded-xl border-2 border-gray-100 py-4 font-bold text-gray-500 transition hover:bg-gray-200"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
}

export default Header;
