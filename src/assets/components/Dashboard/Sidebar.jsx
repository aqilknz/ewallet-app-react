import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: '/icons/dashboard/dashboard.svg', path: '/dashboard' },
        { name: 'Transfer', icon: '/icons/dashboard/transfer.svg', path: '/transfer' },
        { name: 'History', icon: '/icons/dashboard/history.svg', path: '/history' },
        { name: 'Top Up', icon: '/icons/dashboard/topup.svg', path: '/topup' },
        { name: 'Profile', icon: '/icons/dashboard/profile.svg', path: '/profile' },
        { name: 'Keluar', icon: '/icons/dashboard/Log Out.svg', path: '/login' },
    ];

    return (
        <aside className="w-64 bg-white h-screen border-r border-gray-200 hidden md:flex flex-col p-6">
            <nav className="space-y-4">
                {menuItems.map((item) => {
                    const isLogout = item.name === 'Keluar';

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            // NavLink memberikan akses ke status 'isActive' secara otomatis
                            className={({ isActive }) => `
                                flex items-center space-x-4 p-3 rounded-xl transition-all
                                ${isActive
                                    ? 'bg-primary text-white shadow-md'
                                    : isLogout
                                        ? 'text-red-500 hover:bg-red-500 hover:text-white'
                                        : 'text-gray-500 hover:bg-blue-500 hover:text-white'}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <img
                                        src={item.icon}
                                        alt={item.name}
                                        className={`w-6 h-6 ${(isActive || (isLogout)) ? 'brightness-0 invert' : ''}`}
                                    />
                                    <span className="font-medium">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;