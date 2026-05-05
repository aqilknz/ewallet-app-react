import React from 'react'
import { useSearchParams } from 'react-router'
import Header from '../components/Dashboard/Header'
import Sidebar from '../components/Dashboard/Sidebar'
import TransferStep from '../components/Dashboard/TransferStep'
import DetailTransfer from '../components/Dashboard/DetailTransfer'
import { DataTransfer } from '../components/Dashboard/data/DataTransfer'

function TransferDetail() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const selectedUser = DataTransfer.find(u => u.id === parseInt(id))
  console.log("ID dari URL:", id);
  console.log("User yang ditemukan:", selectedUser);

  if (!selectedUser) {
    return <div>Memuat data atau User tidak ditemukan...</div>;
  }

  return (
    <div className='relative'>
      <div className='flex items-center gap-4 mb-8'>
        <img src='/icons/Send-b.svg' alt="Transfer" className='w-6 h-6' />
        <h2 className='font-bold text-xl text-gray-800'>Transfer Money</h2>
      </div>
      <div className="w-full py-4">
        <TransferStep currentStep={2} />
      </div>
      <section>
        <DetailTransfer user={selectedUser} />
      </section>
    </div>
  )
}

export default TransferDetail