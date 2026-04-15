import React from 'react'

/**
 * 
 * @param {object} props 
 * @param {string} props.path
 * @param {string} props.alt
 * @param {string} props.text
 * @returns {JSX.Element}
 */

function ButtonSignIn({ path, alt, text }) {
    return (
        <button
            className="flex justify-center items-center gap-2 w-full 
      bg-white text-black font-monserrat font-bold py-2 px-4 my-2 
      rounded-full border-secondary border cursor-pointer 
      hover:bg-blue-500 hover:text-white"
        >
            <img src={path} alt={alt} />
            <span className="hidden md:block">{text}</span>
        </button>
    )
}

export default ButtonSignIn