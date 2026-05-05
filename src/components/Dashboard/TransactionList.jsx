import React from 'react'
import { useSelector } from 'react-redux';

function TransactionList() {
    const { transactions } = useSelector((state) => state.transaction);
    // const dataList = [
    //     { name: "Robert Fox", type: "Transfer", amount: "+Rp50.000", img: "/images/1.svg" },
    //     { name: "Floyd Miles", type: "Send", amount: "-Rp50.000", img: "/images/1-2.svg" },
    //     { name: "Ujang", type: "Send", amount: "-Rp50.000", img: "/images/1-3.svg" },
    //     { name: "Robert Fox", type: "Transfer", amount: "+Rp50.000", img: "/images/1.svg" },
    //     { name: "Floyd Miles", type: "Send", amount: "-Rp50.000", img: "/images/1-2.svg" },
    //     { name: "Ujang", type: "Send", amount: "-Rp50.000", img: "/images/1-3.svg" },
    //     { name: "Robert Fox", type: "Transfer", amount: "+Rp50.000", img: "/images/1.svg" },
    //     { name: "Floyd Miles", type: "Send", amount: "-Rp50.000", img: "/images/1-2.svg" },
    //     { name: "Ujang", type: "Send", amount: "-Rp50.000", img: "/images/1-3.svg" },
    // ];
    return (
        <div className="p-5 bg-white rounded-xl border-secondary shadow-sm w-full px-10">
            <div className="flex justify-between mb-4">
                <h3 className="font-bold text-xl">Transaction History</h3>
                <a href="#" className="text-indigo-600 font-medium">See All</a>
            </div>

            <div className="flex flex-col">
                {transactions.map((t, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-secondary">
                        <img src={t.img} className="w-12 h-12 rounded-lg" />

                        <div className="flex-1">
                            <strong className="block text-sm">{t.name}</strong>
                            <span className="text-gray-500 text-sm">{t.type}</span>
                        </div>

                        <div
                            className={`text-sm font-semibold ${t.amount.includes("+") ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            {t.amount}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default TransactionList;