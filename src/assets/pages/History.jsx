import React from 'react'
import Header from '../components/Dashboard/Header.jsx'
import Sidebar from '../components/Dashboard/Sidebar.jsx'
import HistoryList from "../components/Dashboard/HistoryList.jsx"

function History() {
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

                        <section className='bg-white rounded-2xl shadow-sm border-secondary p-6 md:p-10'>
                            <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8'>
                                <h3 className='text-lg font-bold text-gray-800'>Find Transaction</h3>

                                <div className='relative w-full md:w-80'>
                                    <input
                                        type='text'
                                        placeholder='Enter Number or Full Name'
                                        className='w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500'
                                    />
                                    <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                                        <img src='/icons/Search.svg' alt="Search" className='w-5 h-5' />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <HistoryList />
                            </div>
                            <div className='flex gap-2 w-full text mt-2 flex-wrap'>
                                <p className='flex flex-1'>Show 5 History of 100 History</p>
                                <div className='flex gap-4 cursor-pointer overflow-auto'>
                                    <span>Prev</span>
                                    <span className='text-primary'>1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span>4</span>
                                    <span>5</span>
                                    <span>6</span>
                                    <span>7</span>
                                    <span>8</span>
                                    <span>9</span>
                                    <span>Next</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default History