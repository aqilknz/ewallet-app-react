import React from 'react'

/**
 * 
 * @param {object} props 
 * @param {string} props.sosmed
 * @param {string} props.alt
 * @returns {JSX.Element}
 */

function SocialMedia({ sosmed, alt }) {
    return (
        <button className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer'>
            <img src={sosmed} alt={alt} className='object-contain' />
        </button>
    )
}

export default SocialMedia