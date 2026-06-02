import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bankOpt } from "./constant/BankOpt.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const getProfileImage = (photoPath) => {
  if (!photoPath) return "/icons/Profile/User.svg";
  if (photoPath.startsWith("http")) return photoPath;

  let fileName = photoPath;
  if (fileName.includes("/")) {
    const parts = fileName.split("/");
    fileName = parts[parts.length - 1];
  }

  return `${API_BASE_URL}/img/profiles/${fileName}`;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(value || 0)
    .replace("IDR", "Rp");
};
function TransactionList() {
  const { recentTransactions = [] } = useSelector((state) => state.dashboard);

  return (
    <div className="border-secondary w-full rounded-xl bg-white p-5 px-10 shadow-sm">
      <div className="mb-4 flex justify-between">
        <h3 className="text-xl font-bold">Transaction History</h3>
        <Link to="/history" className="font-medium text-blue-600 hover:underline">
          See All
        </Link>
      </div>

      <div className="flex flex-col">
        {recentTransactions.length === 0 ? (
          <div className="py-6 text-center text-sm text-gray-400">
            No transaction found.
          </div>
        ) : (
          recentTransactions.map((t) => {
            const isIncome = t.flow_type === "income" || t.flow_type === "topup";
            const colorClass = isIncome ? "text-green-500" : "text-red-500";
            const sign = isIncome ? "+" : "-";

            let title = t.description;
            let subtitle = "Topup";
            let iconSrc = "/icons/topup-blue.svg";

            if (t.transaction_type === "transfer_in") {
              title = t.description.replace("Transfer masuk dari ", "");
              subtitle = "Transfer";
              iconSrc = getProfileImage(t.photo);
            } else if (t.transaction_type === "transfer_out") {
              title = t.description.replace("Transfer keluar ke ", "");
              subtitle = "Send";
              iconSrc = getProfileImage(t.photo);
            } else if (t.transaction_type === "topup") {
              const matchedBank = bankOpt.find((b) =>
                t.description.toLowerCase().includes(b.name.toLowerCase())
              );

              if (matchedBank) {
                title = matchedBank.name;
                iconSrc = matchedBank.icon;
              } else {
                title = "Topup Saldo";
              }
            }

            return (
              <div
                key={t.id}
                className="border-secondary flex items-center gap-4 border-b py-4 last:border-0"
              >
                <img
                  src={iconSrc}
                  className="h-12 w-12 rounded-lg object-cover bg-gray-100"
                  alt="icon"
                  onError={(e) => {
                    e.target.src = "/icons/Profile/User.svg";
                  }}
                />

                <div className="flex-1 overflow-hidden">
                  <strong className="block truncate text-base font-semibold text-gray-800">
                    {title}
                  </strong>
                  <span className="text-sm text-gray-500">{subtitle}</span>
                </div>

                <div className={`text-base font-bold whitespace-nowrap ${colorClass}`}>
                  {sign}{formatCurrency(t.amount)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default TransactionList;