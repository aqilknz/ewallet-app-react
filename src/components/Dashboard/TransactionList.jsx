import React from "react";
import { useSelector } from "react-redux";

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
    <div className="border-secondary w-full rounded-xl bg-white p-5 px-10 shadow-sm">
      <div className="mb-4 flex justify-between">
        <h3 className="text-xl font-bold">Transaction History</h3>
        <a href="#" className="font-medium text-indigo-600">
          See All
        </a>
      </div>

      <div className="flex flex-col">
        {transactions.map((t, i) => (
          <div
            key={i}
            className="border-secondary flex items-center gap-4 border-b py-3"
          >
            <img src={t.img} className="h-12 w-12 rounded-lg" />

            <div className="flex-1">
              <strong className="block text-sm">{t.name}</strong>
              <span className="text-sm text-gray-500">{t.type}</span>
            </div>

            <div
              className={`text-sm font-semibold ${
                t.amount.includes("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {t.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TransactionList;
