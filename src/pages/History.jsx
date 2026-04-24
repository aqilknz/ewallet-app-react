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
        setSearchParams({ search: e.target.value, page: '1' })
    }

    return (
        <div>
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
            </section>
        </div>

    )
}

export default History