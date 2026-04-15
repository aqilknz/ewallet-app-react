import React from 'react'

function Input({name, text, path, type, value, onChange,placeholder}) {
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name} className='font-2xl'>{text}</label>
            <div className='relative flex items-center'>
                <img src={path} alt={text} className='absolute left-4 w-5 h-5 opacity-70' />

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className='border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-2 w-full pl-10 pr-10 bg-transparent autofill:shadow-[inset_0_0_0px_1000px_white]'
                />

            </div>
        </div>
    )
}

export default Input