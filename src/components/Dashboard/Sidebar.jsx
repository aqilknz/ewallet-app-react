import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/authSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/auth", { replace: true });
    };

    const menuItems = [
        { name: 'Dashboard', icon: '/icons/dashboard/dashboard1.svg', path: '/dashboard' },
        { name: 'Transfer', icon: '/icons/dashboard/transfer.svg', path: '/transfer' },
        { name: 'History', icon: '/icons/dashboard/history.svg', path: '/history' },
        { name: 'Top Up', icon: '/icons/dashboard/topup.svg', path: '/topup' },
        { name: 'Profile', icon: '/icons/dashboard/profile.svg', path: '/profile' },
    ];

    return (
        <aside className="w-64 bg-white min-h-full border-r border-gray-200 hidden md:flex flex-col p-6">
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
                    onClick={handleLogout}
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
    );
};

export default Sidebar;