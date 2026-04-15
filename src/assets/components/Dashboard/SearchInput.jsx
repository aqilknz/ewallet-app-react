import React from "react"

const SearchInput = ({ value, onChange }) => {
    return (
        <div className='relative w-full md:w-80'>
            <input
                type='text'
                value={value}
                onChange={onChange}
                placeholder='Enter Number or Full Name'
                className='w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                <img src='/icons/Search.svg' className='w-5 h-5' />
            </div>
        </div>
    )
}

export default SearchInput