import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPendingTransaction, addTransaction } from '../redux/slice/transactionSlice';
import { updateUserBalance } from '../redux/slice/registerSlice';
import { loginSuccess } from '../redux/slice/authSlice';
import toast from 'react-hot-toast';
import BankOption from '../components/Dashboard/BankOption';
import Header from '../components/Dashboard/Header';
import Sidebar from '../components/Dashboard/Sidebar';

const TopUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.auth);

    const [selectedBank, setSelectedBank] = useState('');
    const [amount, setAmount] = useState('');

    const nominal = Number(amount) || 0;
    const tax = nominal > 0 ? 4000 : 0;
    const total = nominal + tax;

    const bankOpt = [
        { id: 'bri', name: 'Bank Rakyat Indonesia', icon: '/icons/bank/bri.svg' },
        { id: 'dana', name: 'Dana', icon: '/icons/bank/dana.svg' },
        { id: 'bca', name: 'Bank Central Asia', icon: '/icons/bank/bca.svg' },
        { id: 'gopay', name: 'Gopay', icon: '/icons/bank/gopay.svg' },
        { id: 'ovo', name: 'OVO', icon: '/icons/bank/ovo.svg' },
    ];

    const handleTopUpSubmit = () => {
        if (nominal < 10000) return toast.error("Minimal Top Up Rp 10.000");
        if (!selectedBank) return toast.error("Pilih metode pembayaran terlebih dahulu");
        const bankDetail = bankOpt.find(b => b.id === selectedBank);

        dispatch(updateUserBalance({
            username: currentUser.email,
            amount: nominal,
            type: 'topup'
        }));
        dispatch(loginSuccess({
            ...currentUser,
            balance: (currentUser.balance || 0) + nominal,
            income: (currentUser.income || 0) + nominal
        }));
        dispatch(setPendingTransaction({
            type: 'topup',
            amount: nominal,
            total: total,
            bank: selectedBank
        }));
        const formattedAmount = new Intl.NumberFormat('id-ID').format(nominal);
        dispatch(addTransaction({
            name: `Top Up ${bankDetail?.name}`, 
            type: "Top Up",
            amount: `+Rp${formattedAmount}`,
            img: bankDetail?.icon || "/icons/topupw.svg"
        }));

        // toast.loading("Menuju verifikasi PIN...", { duration: 1000 });
        toast.success("Top Up successfully!", { duration: 1000 });
        // dispatch(clearPendingTransaction({

        // }))
        setAmount('')
        setSelectedBank('')

        setTimeout(() => navigate('/dashboard'), 1000);
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <img src="/icons/Upload-b.svg" alt="topup icon" className="w-6" />
                <h2 className="text-xl font-bold text-gray-900">Top Up Account</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <section className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-8 md:p-10">

                    <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-3 block">Account Information</h3>
                        <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-5">
                            <img src={currentUser?.avatar || "/icons/Profile/User.svg"} alt="profile" className="w-14 h-14 rounded-lg object-cover" />
                            <div className="flex flex-col gap-1">
                                <strong className="text-lg text-gray-800">{currentUser?.fullName}</strong>
                                <span className="text-sm text-gray-500">{currentUser?.phone}</span>
                                <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-[12px] inline-flex items-center gap-1 w-fit">
                                    <img src="/icons/verified.svg" alt="verified" className="w-4 h-4" /> Verified
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold text-lg text-gray-900 mb-1 block">Amount</label>
                        <p className="text-sm text-gray-400 mb-3">Type the amount you want to transfer</p>
                        <div className="relative">
                            <img src="/icons/money.svg" className="absolute left-4 top-3.5 w-5 opacity-60" />
                            <input
                                type="text"
                                placeholder="Enter Nominal Transfer"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold text-lg text-gray-900 mb-1 block">Payment Method</label>
                        <p className="text-sm text-gray-400 mb-4">Choose your payment method</p>
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

                <section className="w-full lg:w-[320px] xl:w-[350px] bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex-shrink-0 sticky top-8">
                    <h3 className="font-semibold text-lg text-gray-900 mb-6">Payment</h3>
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Order</span>
                            <strong className="text-gray-800">Idr. {nominal.toLocaleString()}</strong>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Delivery</span>
                            <strong className="text-gray-800">Idr. 0</strong>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Tax</span>
                            <strong className="text-gray-800">Idr. {tax.toLocaleString()}</strong>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between text-base font-bold text-gray-900">
                            <span>Sub Total</span>
                            <span>Idr. {total.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleTopUpSubmit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition"
                    >
                        Submit
                    </button>

                    <p className="text-xs text-gray-400 mt-4 italic leading-relaxed">
                        *Get Discount if you pay with Bank Central Asia
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TopUpPage;