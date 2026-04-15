import React from 'react'
import Header from '../components/Dashboard/Header'
import Sidebar from '../components/Dashboard/Sidebar'
import TransferStep from '../components/Dashboard/TransferStep'
import DetailTransfer from '../components/Dashboard/DetailTransfer'


function TransferDetail() {
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
                <TransferStep currentStep={2} />
              </div>
              <section>
                <DetailTransfer/>
              </section>
            </div>
          </main>

        </div>
      </div>
    </>
  )
}

export default TransferDetail