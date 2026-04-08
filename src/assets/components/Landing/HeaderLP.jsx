import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'; // Pastikan import dari 'react-router-dom'
import '../../../Global.css'

function HeaderLP() {
  const [isOpen, setIsOpen] = useState(false);

  const desktopBtnStyle = 'px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-primary transition-all cursor-pointer inline-block';
  const desktopPrimaryBtnStyle = 'px-6 py-2 bg-white text-primary rounded-lg hover:bg-opacity-90 transition-all cursor-pointer inline-block';

  const mobileBtnStyle = 'w-1/2 px-6 py-2 border border-white rounded-lg cursor-pointer text-center';
  const mobilePrimaryBtnStyle = 'w-1/2 px-6 py-2 bg-white text-primary rounded-lg font-bold cursor-pointer text-center';

  return (
    <header className='bg-primary text-white relative'>
      <div className='flex items-center justify-between px-10 py-5 font-medium text-lg'>
        <div className='flex justify-center items-center gap-2'>
          <img src="/icons/logo.svg" alt="Logo" />
          <span>E-Wallet</span>
        </div>

        <div className='hidden md:flex items-center gap-4'>
          <NavLink to="auth" className={desktopBtnStyle}>
            Sign In
          </NavLink>
          <NavLink to="auth/register" className={desktopPrimaryBtnStyle}>
            Sign Up
          </NavLink>
        </div>

        <button
          className='md:hidden cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src="/icons/humberger.png" alt="Menu" className='w-8 h-8 invert brightness-0' />
        </button>
      </div>

      {isOpen && (
        <div className='md:hidden absolute w-full bg-primary border-t border-blue-400 flex flex-col items-center gap-4 py-5 z-50 shadow-xl'>
          <NavLink
            to="/login"
            className={mobileBtnStyle}
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </NavLink>
          <NavLink
            to="/register"
            className={mobilePrimaryBtnStyle}
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  )
}

export default HeaderLP