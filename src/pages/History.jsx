import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Dashboard/Header.jsx'
import Sidebar from '../components/Dashboard/Sidebar.jsx'
import HistoryList from "../components/Dashboard/HistoryList.jsx"
import SearchInput from '../components/Dashboard/SearchInput.jsx'

function History() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search') || ''

    const handleSearch = (e) => {
        setSearchParams({ search: e.target.value })
    }
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className='flex flex-col min-h-screen bg-gray-50'>
            <Header />
            <div className='flex flex-1 overflow-hidden'>
                <Sidebar />
                <main className='flex-1 p-6 md:p-10 overflow-y-auto bg-white'>
                    <div className='max-w-6xl mx-auto'>

                        <div className='flex items-center gap-4 mb-8'>
                            <img src='/icons/history.svg' alt="History" className='w-6 h-6' />
                            <h2 className='font-bold text-xl text-gray-800'>History Transaction</h2>
                        </div>

                        <section className='bg-white rounded-2xl shadow-sm p-6 md:p-10'>

                            <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8'>
                                <h3 className='text-lg font-bold text-gray-800'>
                                    Find Transaction
                                </h3>

                                <SearchInput value={search} onChange={handleSearch} />
                            </div>

                            {/* LIST */}
                            <div className='mt-4'>
                                <HistoryList search={search} />
                            </div>

                            {/* INFO */}
                            <div className='flex justify-between mt-6 text-sm text-gray-500'>
                                <p>
                                    Showing results for: <b>{search || 'All'}</b>
                                </p>
                            </div>

                        </section>
                        <div className='flex gap-2 w-full text mt-2 flex-wrap items-center'>

                            {/* INFO */}
                            <p className='flex flex-1 text-sm text-gray-500'>
                                Show 5 History of 100 History
                            </p>

                            {/* PAGINATION */}
                            <div className='flex gap-2 overflow-auto'>

                                <span className='cursor-pointer'>Prev</span>

                                {pages.map((page) => (
                                    <span
                                        key={page}
                                        className={`cursor-pointer px-2 py-1 rounded 
                                            ${page === 1 ? 'text-primary font-bold' : ''}
                                            `}
                                    >
                                        {page}
                                    </span>
                                ))}

                                <span className='cursor-pointer'>Next</span>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default History