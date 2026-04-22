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
        // Reset ke page 1 setiap kali ada pencarian baru
        setSearchParams({ search: e.target.value, page: '1' })
    }

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

                        <section className='bg-white rounded-2xl shadow-sm p-6 md:p-10 border border-gray-100'>
                            <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8'>
                                <h3 className='text-lg font-bold text-gray-800'>Find Transaction</h3>
                                <SearchInput value={search} onChange={handleSearch} />
                            </div>

                            <div className='mt-4'>
                                <HistoryList />
                            </div>

                            {/* <div className='flex justify-between mt-6 text-sm text-gray-500'>
                                <p>Showing results for: <b>{search || 'All'}</b></p>
                            </div> */}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default History