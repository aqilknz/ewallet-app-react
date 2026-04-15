import React from 'react'
import { useSearchParams } from 'react-router'
import Header from '../components/Dashboard/Header.jsx'
import Sidebar from '../components/Dashboard/Sidebar.jsx'
import TransferList from '../components/Dashboard/TransferList.jsx'
import TransferStep from '../components/Dashboard/TransferStep.jsx'
import SearchInput from '../components/Dashboard/SearchInput.jsx'

function Transfer() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''

  const handleSearch = (e) => {
    setSearchParams({ search: e.target.value })
  }
  return (
    <>

      <div className='flex flex-col min-h-screen bg-gray-50'>
        <Header />
        <div className='flex flex-1 overflow-hidden'>
          <Sidebar />
          <main className='flex-1 p-6 md:p-10 overflow-y-auto bg-white'>
            <div className='max-w-6xl mx-auto'>

              <div className='flex items-center gap-4 mb-8'>
                <img src='/icons/Send-b.svg' alt="Transfer" className='w-6 h-6' />
                <h2 className='font-bold text-xl text-gray-800'>Transfer Money</h2>
              </div>
              <div className="w-full py-4">
                <TransferStep currentStep={1} />
              </div>

              <section className='bg-white rounded-2xl shadow-sm border-secondary p-6 md:p-10'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8'>
                  <h3 className='text-lg font-bold text-gray-800'>Find Transaction</h3>

                  <SearchInput value={search} onChange={handleSearch} />
                </div>
                <div className='mt-4'>
                  <TransferList search={search} />
                </div>
                <div className='flex justify-between mt-6 text-sm text-gray-500'>
                  <p>
                    Showing results for: <b>{search || 'All'}</b>
                  </p>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Transfer