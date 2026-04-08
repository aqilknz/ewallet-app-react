import React from 'react'
import Header from '../components/Dashboard/Header.jsx'
import Sidebar from '../components/Dashboard/Sidebar.jsx'
import TransferList from '../components/Dashboard/TransferList.jsx'
import TransferStep from '../components/Dashboard/TransferStep.jsx'

function Transfer() {
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
                <div>

                </div>
                <div className='mt-4'>
                  <TransferList />
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