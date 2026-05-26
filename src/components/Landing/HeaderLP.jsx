import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Pastikan import dari 'react-router-dom'
import "../../Global.css";

function HeaderLP() {
  const [isOpen, setIsOpen] = useState(false);

  const desktopBtnStyle =
    "px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-primary transition-all cursor-pointer inline-block";
  const desktopPrimaryBtnStyle =
    "px-6 py-2 bg-white text-primary rounded-lg hover:bg-opacity-90 transition-all cursor-pointer inline-block";

  const mobileBtnStyle =
    "w-5/6 px-6 py-2 border border-white rounded-lg cursor-pointer text-center";
  const mobilePrimaryBtnStyle =
    "w-5/6 px-6 py-2 bg-white text-primary rounded-lg font-bold cursor-pointer text-center";

  return (
    <header className="bg-primary relative text-white">
      <div className="flex items-center justify-between px-10 py-5 text-lg font-medium">
        <div className="flex items-center justify-center gap-2">
          <img src="/icons/logo.svg" alt="Logo" />
          <span>E-Wallet</span>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <NavLink to="auth" className={desktopBtnStyle}>
            Sign In
          </NavLink>
          <NavLink to="auth/register" className={desktopPrimaryBtnStyle}>
            Sign Up
          </NavLink>
        </div>

        <button
          className="cursor-pointer md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="/icons/humberger.png"
            alt="Menu"
            className="h-8 w-8 brightness-0 invert"
          />
        </button>
      </div>

      {isOpen && (
        <div className="bg-primary absolute z-50 flex w-full flex-col items-center gap-4 border-t border-blue-400 py-5 shadow-xl md:hidden">
          <NavLink
            to="/auth"
            className={mobileBtnStyle}
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </NavLink>
          <NavLink
            to="auth/register"
            className={mobilePrimaryBtnStyle}
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default HeaderLP;
