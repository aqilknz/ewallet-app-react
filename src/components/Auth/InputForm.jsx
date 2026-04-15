import React, { useState } from 'react'
import '../../Global.css'

function InputForm({ text, type, placeholder, name, path, onChange, value }) {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === "password";

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name} className='font-2xl '>{text}</label>
            <div className='relative flex items-center'>
                <img src={path} alt={text} className='absolute left-4 w-5 h-5 opacity-50' />

                <input
                    id={name}
                    name={name}
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className='border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-2 w-full pl-10 pr-10 bg-transparent autofill:shadow-[inset_0_0_0px_1000px_white]'
                />

                {/* TOMBOL SHOW/HIDE */}
                {isPassword && (
                    <button
                        type="button"
                        className="absolute right-3 opacity-60"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        <img
                            src={showPassword ? "/icons/eye-on.png" : "/icons/hide.png"}
                            className="w-5"
                            alt="toggle password"
                        />
                    </button>
                )}
            </div>
        </div>
    )
}

export default InputForm