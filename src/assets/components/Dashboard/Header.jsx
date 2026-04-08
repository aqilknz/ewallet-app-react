import React, {  useState } from 'react';
import {Link, useNavigate} from 'react-router'

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    function handleLogout() {
    localStorage.removeItem("currentUser");

    navigate("/auth", { replace: true });
}

    return (
        <header className='bg-white min-w-screen border-b-2 border-secondary sticky top-0 z-50'>
            <div className='flex w-full px-6 md:px-10 justify-between items-center h-20'>

                <div className='flex justify-center items-center gap-2'>
                    <img src='/icons/logo.svg' className='w-10 h-10' alt="Logo" />
                    <span className='font-nunito font-bold text-lg text-primary'>E-Wallet</span>
                </div>

                <div className='relative flex items-center py-5'>
                    <div
                        className='flex items-center cursor-pointer gap-2 hover:bg-gray-50 p-2 rounded-xl transition-all'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span>Ghaluh Wizard</span>
                        <img src='/images/Ghaluh icon.svg' className='w-10 h-10 rounded-full object-cover' alt="User" />
                        <img
                            src='/icons/down.svg'
                            className={`w-6 h-6 md:hidden transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            alt="Arrow"
                        />
                    </div>

                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 z-10 md:hidden">
                            <div className="px-2 space-y-1">
                                <Link to="/ewallet/v1/dashboard"
                                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white rounded-lg transition">
                                    Dashboard
                                </Link>

                                <Link to="/ewallet/v1/transfer"
                                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white rounded-lg transition">
                                    Transfer
                                </Link>

                                <Link to="/ewallet/v1/history"
                                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white rounded-lg transition">
                                    History
                                </Link>

                                <Link to="/ewallet/v1/topup"
                                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white rounded-lg transition">
                                    Top Up
                                </Link>

                                <Link to="/ewallet/v1/profile"
                                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white rounded-lg transition">
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-semibold"
                                >
                                    Keluar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;