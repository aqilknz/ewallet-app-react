import React from 'react'

function ButtonSignIn({ path, alt, text }) {
    return (
        <div>
            <button className='flex justify-center w-full items-center gap-2 bg-white text-black font-monserrat font-bold py-2 px-4 my-2 rounded-full border-secondary border cursor-pointer hover:bg-blue-500 hover:text-white [&:-webkit-autofill]:bg-white! [&:-webkit-autofill]:text-gray-900!'>
                <img src={path} alt={alt} />
                <span className='hidden md:block'>{text}</span>
            </button>
        </div>
    )
}

export default ButtonSignIn