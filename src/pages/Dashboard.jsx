import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Dashboard/Header.jsx'
import Sidebar from '../components/Dashboard/Sidebar.jsx'
import Card from '../components/Dashboard/Card.jsx'
import IncomeChart from '../components/Dashboard/IncomeChart.jsx'
import TransactionList from '../components/Dashboard/TransactionList.jsx'

function Dashboard() {
    const { currentUser } = useSelector((state) => state.auth);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value || 0).replace('IDR', 'Rp.');
    };
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className='flex'>
                <Sidebar />

                <main className='flex-1 p-6 md:p-10 bg-white'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
                            <div className='xl:col-span-2 space-y-8'>
                    
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                                    <Card
                                        icon='/icons/carddashboard/balance-icon.svg'
                                        text='Balance'
                                        money={formatCurrency(currentUser?.balance)}
                                        persen='+2%'
                                        updown='/icons/carddashboard/rise-icons.svg'
                                        opt='3 days ago'
                                        color='text-green-500'
                                    />
                                    <Card
                                        icon='/icons/carddashboard/income-icon.svg'
                                        text='Income'
                                        money={formatCurrency(currentUser?.income)}
                                        persen='+2%'
                                        updown='/icons/carddashboard/rise-icons.svg'
                                        color='text-green-500'
                                    />
                                    <Card
                                        icon='/icons/carddashboard/expense-icon.svg'
                                        text='Expense'
                                        money={formatCurrency(currentUser?.expense)}
                                        persen='+2%'
                                        updown='/icons/carddashboard/set-icon.svg'
                                        color='text-red-500'
                                    />
                                </div>

                                <article className='border-secondary border-2 rounded-2xl bg-white shadow-sm overflow-y-auto'>
                                    <div className='flex flex-col px-8 py-6 gap-4'>
                                        <h3 className='font-bold text-xl text-gray-800'>Fast Service</h3>
                                        <div className='flex flex-wrap gap-4'>
                                            <button className='bg-primary hover:bg-blue-700 transition-colors flex text-white items-center gap-2 px-6 py-3 rounded-xl font-medium shadow-md cursor-pointer'>
                                                <img src='/icons/topupw.svg' alt='topup-icon' className='w-5 h-5'/>
                                                <span>Top Up</span>
                                            </button>
                                            <button className='bg-primary hover:bg-blue-700 transition-colors flex text-white items-center gap-2 px-6 py-3 rounded-xl font-medium shadow-md cursor-pointer'>
                                                <img src='/icons/Send.svg' alt='transfer--icon' className='w-5 h-5 brightness-0 invert'/>
                                                <span>Transfer</span>
                                            </button>
                                        </div>
                                    </div>
                                </article>

                                <div className='bg-white rounded-2xl border-2 border-secondary shadow-sm'>
                                    <IncomeChart />
                                </div>
                            </div>

                            <div className='xl:col-span-1 w-full'>
                                <div className='bg-white rounded-2xl border-2 border-secondary shadow-sm h-full'>
                                    <TransactionList />
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}                               

export default Dashboard