import React from 'react'
import '../../Global.css'

/**
 * 
 * @param {object} props 
 * @param {string} props.label
 * @returns {JSX.Element}
 */

function ButtonSubmit({ label }) {
    return (
        <div className='w-full'>
            <button type="submit" className='flex flex-col justify-center w-full items-center bg-primary text-white font-monserrat font-bold py-2 px-4 my-2 rounded-lg cursor-pointer hover:bg-blue-800'>{label}</button>
        </div>
    )
}

export default ButtonSubmit