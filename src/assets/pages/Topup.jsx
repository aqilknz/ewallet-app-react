import React, { useState } from 'react';
import BankOption from '../components/Dashboard/BankOption';
import Header from '../components/Dashboard/Header'
import Sidebar from '../components/Dashboard/Sidebar';

const TopUpPage = () => {
    const [selectedBank, setSelectedBank] = useState('bri');
    const [amount, setAmount] = useState('');

    const bankOpt = [
        { id: 'bri', name: 'Bank Rakyat Indonesia', icon: '/icons/bank/bri.svg' },
        { id: 'dana', name: 'Dana', icon: '/icons/bank/dana.svg' },
        { id: 'bca', name: 'Bank Central Asia', icon: '/icons/bank/bca.svg' },
        { id: 'gopay', name: 'Gopay', icon: '/icons/bank/gopay.svg' },
        { id: 'ovo', name: 'OVO', icon: '/icons/bank/ovo.svg' },
    ];

    return (
        <>
            <div className='flex flex-col min-h-screen bg-gray-50'>
                <Header />
                <div className='flex flex-1 overflow-hidden'>
                    <Sidebar />
                    <main className="flex-grow bg-white p-4 md:p-8 min-h-screen">
                        <div className="flex items-center gap-4 mb-6">
                            <img src="/icons/Upload-b.svg" alt="topup icon" className="w-6" />
                            <h2 className="text-xl font-bold text-gray-800">Top Up Account</h2>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 items-start">
                            <section className="flex-[2] w-full border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">

                                <div className="flex flex-col">
                                    <label className="font-bold text-base mb-4 text-gray-800">Account Information</label>
                                    <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-5">
                                        <img src="/images/Profile.svg" alt="profile" className="w-13 h-13 rounded-lg object-cover" />
                                        <div className="flex flex-col gap-1">
                                            <strong className="text-sm">Ghaluh Wizard</strong>
                                            <span className="text-xs text-gray-500">(239) 555-0108</span>
                                            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-[10px] inline-flex items-center gap-1 w-fit">
                                                <img src="/icons/verified.svg" alt="verified" className="w-4 h-4" />
                                                Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Amount Input */}
                                <div className="flex flex-col">
                                    <label className="font-bold text-base text-gray-800 mb-1">Amount</label>
                                    <p className="text-sm text-gray-400 mb-3">Type the amount you want to transfer to your e-wallet account</p>
                                    <div className="relative flex items-center">
                                        <img src="/icons/money.svg" alt="nominal" className="absolute left-4 w-5 opacity-50" />
                                        <input
                                            type="number"
                                            placeholder="Enter Nominal Transfer"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="flex flex-col">
                                    <label className="font-bold text-base text-gray-800 mb-1">Payment Method</label>
                                    <p className="text-sm text-gray-400 mb-4">Choose your payment method for top up account</p>
                                    <div className="flex flex-col gap-3">
                                        {bankOpt.map((bank) => (
                                            <BankOption
                                                key={bank.id}
                                                {...bank}
                                                isChecked={selectedBank === bank.id}
                                                onChange={setSelectedBank}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Section Kanan: Summary */}
                            <section className="flex-1 w-full border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-8">
                                <h3 className="font-bold text-base mb-6 text-gray-800">Payment</h3>
                                <div className="flex flex-col gap-4 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Order</span>
                                        <strong className="text-gray-800">Idr. 40.000</strong>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Delivery</span>
                                        <strong className="text-gray-800">Idr. 0</strong>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <strong className="text-gray-800">Idr. 4.000</strong>
                                    </div>
                                    <hr className="border-gray-100 my-2" />
                                    <div className="flex justify-between text-base font-bold text-gray-900">
                                        <span>Sub Total</span>
                                        <span>Idr. 44.000</span>
                                    </div>
                                </div>

                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors mb-4">
                                    Submit
                                </button>

                                <p className="text-xs text-gray-400 leading-relaxed italic">
                                    *Get Discount if you pay with Bank Central Asia
                                </p>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default TopUpPage;