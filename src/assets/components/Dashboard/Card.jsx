import React from 'react'

/**
 * 
 * @param {Object} props
 * @param {string} props.icon 
 * @param {string} props.text
 * @param {string} props.money 
 * @param {string} props.persen
 * @param {string} props.updown
 * @param {string} props.opt
 * @param {string} props.color
 * @returns {JSX.element}
 */

function Card({icon, text, money, persen, updown, opt, color}) {
  return (
    <article className='border-secondary border-2 rounded-xl bg-white'>
        <div className='flex flex-col px-10 py-5 gap-2'>
            <div className='flex gap-2'>
                <img src={icon} alt={text}/>
                <span>{text}</span>
            </div>
            <h3 className='text-2xl font-bold'>{money}</h3>
            <div className='flex gap-2'>
                <span className={color}>{persen}</span>
                <img src={updown} alt='updown'/>
                <span className='text-gray-400'>{opt}</span>
            </div>
        </div>
    </article>
  )
}

export default Card