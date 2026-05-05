import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slice/authSlice';
import { Modal } from './Modal';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        toast('Sampai Jumpa Kembali! 👋',{
            duration: 1000
        })
        setTimeout(() => {
                dispatch(logoutUser());
                navigate("/auth", { replace: true });
            }, 1000
        )

    };

    const menuItems = [
        { name: 'Dashboard', icon: '/icons/dashboard/dashboard1.svg', path: '/dashboard' },
        { name: 'Transfer', icon: '/icons/dashboard/transfer.svg', path: '/transfer' },
        { name: 'History', icon: '/icons/dashboard/history.svg', path: '/history' },
        { name: 'Top Up', icon: '/icons/dashboard/topup.svg', path: '/topup' },
        { name: 'Profile', icon: '/icons/dashboard/profile.svg', path: '/profile' },
    ];

    return (
        <>

            <aside className="w-64 bg-white min-h-full border-r border-gray-200 hidden md:flex flex-col p-6 z-50">
                <nav className="space-y-4">

                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center space-x-4 p-3 rounded-xl transition-all
                            ${isActive
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-500 hover:bg-blue-500 hover:text-white'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <img
                                        src={item.icon}
                                        alt={item.name}
                                        className={`w-6 h-6 transition-all
                                        ${isActive
                                                ? 'brightness-0 invert'
                                                : 'group-hover:brightness-0 group-hover:invert'}`}
                                    />
                                    <span className="font-medium">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}

                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="group flex items-center space-x-4 p-3 rounded-xl transition-all text-red-500 hover:bg-red-500 hover:text-white w-full mt-6"
                    >
                        <img
                            src="/icons/dashboard/Log Out.svg"
                            alt="Logout"
                            className="w-6 h-6 group-hover:brightness-0 group-hover:invert"
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
                <div className="p-8 text-center bg-white rounded-2xl shadow-xl">
                    {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">Konfirmasi Keluar</h2> */}
                    <p className="text-gray-500 mb-8 px-4">
                        Apakah anda yakin ingin keluar dari akun ini?
                    </p>

                    <div className="flex gap-3 text-sm">
                        <button
                            onClick={handleLogout}
                            className="w-full py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-100 cursor-pointer"
                        >
                            Ya, Keluar Sekarang
                        </button>
                        <button
                            onClick={() => setIsLogoutModalOpen(false)}
                            className="w-full py-4 border-2 border-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition cursor-pointer"
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