import React from 'react'

/**
 * 
 * @param {object} props 
 * @param {string} props.image
 * @param {string} props.name
 * @param {string} prop.description
 * @returns {JSX.Element}
 */

function AboutApp({ image, name, description }) {
    return (
        <div className='bg-primary flex flex-col items-center gap-5 px-6 py-10 rounded-2xl text-white w-full h-auto shadow-lg'>
            <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center p-3 shrink-0'>
                <img src={image} alt={name} className='w-full h-full object-contain' />
            </div>
            <div className='flex flex-col gap-3'>
                <h3 className='text-lg md:text-2xl font-bold text-center'>{name}</h3>
                <p className='text-base md:text-lg text-center opacity-90 leading-relaxed'>{description}</p>
            </div>
        </div>
    )
}

export default AboutApp