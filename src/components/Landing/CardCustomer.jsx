import React from 'react'

/**
 * 
 * @param {object} props 
 * @param {string} props.path
 * @param {string} props.name
 * @param {string} props.rating
 * @param {string} props.review
 * @returns {JSX.Element}
 */

function CardCustomer({path,name,rating, review}) {
  return (
    <div className='bg-white flex flex-col justify-center items-center'>
        <div className='bg-secondary px-5 py-15 mx-10 w-fit flex flex-col justify-center items-center text-center my-5 gap-5 rounded-xl'>
            <img src={path} alt={name}/>
            <h3 className='font-bold text-2xl'>{name}</h3>
            <img src={rating} className='w-1/2'/>
            <p className='text-5xl font-extrabold'>“</p>
            <p className='w-full text-center text-lg'>{review}</p>
        </div>
    </div>
  )
}

export default CardCustomer