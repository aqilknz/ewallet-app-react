import React from 'react'

function CardPartners({partner}) {
  return (
    <div className='w-full h-full flex flex-col gap-10 justify-center items-center bg-red rounded-lg'>
      <img src={partner} alt="Partner Logo" className=' object-contain' />
    </div>
  )
}

export default CardPartners