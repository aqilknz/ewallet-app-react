import React from 'react'

/**
 * 
 * @param {object} props 
 * @param {string} props.partner
 * @returns {JSX.Element}
 */

function CardPartners({partner}) {
  return (
    <div className='w-full h-full flex flex-col gap-10 justify-center items-center bg-red rounded-lg'>
      <img src={partner} alt="Partner Logo" className=' object-contain' />
    </div>
  )
}

export default CardPartners