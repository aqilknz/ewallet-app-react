import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { bankOpt } from "./constant/BankOpt.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/ewallet";
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
    .replace("IDR", "Rp.");
};

function HistoryList() {
  const { recentTransactions = [], historyMeta } = useSelector(
    (state) => state.dashboard
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (historyMeta?.total_page || 1)) {
      const currentSearch = searchParams.get("search") || "";
      setSearchParams({ search: currentSearch, page: newPage.toString() });
    }
  };

  const handleDeleteClick = () => {
    toast.error("Riwayat transaksi tidak dapat dihapus.");
  };

  if (recentTransactions.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        No transaction history found.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100">
        {recentTransactions.map((t, index) => {
          const isIncome = t.flow_type === "income" || t.flow_type === "topup";
          const colorClass = isIncome ? "text-green-500" : "text-red-500";
          const sign = isIncome ? "+" : "-";

          let title = t.description;
          let iconSrc = getProfileImage(t.photo);

          if (t.transaction_type === "transfer_in") {
            title = t.description.replace("Transfer masuk dari ", "");
          } else if (t.transaction_type === "transfer_out") {
            title = t.description.replace("Transfer keluar ke ", "");
          } else if (t.transaction_type === "topup") {
            const matchedBank = bankOpt.find((b) =>
              t.description.toLowerCase().includes(b.name.toLowerCase())
            );
            if (matchedBank) {
              title = matchedBank.name;
              iconSrc = matchedBank.icon;
            } else {
              title = "Topup Saldo";
              iconSrc = "/icons/topup-blue.svg";
            }
          }

          return (
            <div
              key={t.id}
              className={`flex items-center px-6 py-4 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"
                }`}
            >
              <div className="flex flex-1 items-center gap-4">
                <img
                  src={iconSrc}
                  className="h-12 w-12 shrink-0 rounded-lg bg-gray-200 object-cover"
                  alt="icon"
                  onError={(e) => {
                    e.target.src = "/icons/Profile/User.svg";
                  }}
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <strong className="block truncate text-base font-medium text-gray-600">
                  {title || "Unknown User"}
                </strong>
              </div>

              <div className="hidden flex-1 text-center text-sm text-gray-500 sm:block">
                {t.transaction_type === "topup" ? "-" : (t.phone || "-")}
              </div>

              <div
                className={`flex-1 whitespace-nowrap text-center text-base font-medium ${colorClass}`}
              >
                {sign}{formatCurrency(t.amount)}
              </div>

              <div className="ml-6 shrink-0">
                <button
                  onClick={handleDeleteClick}
                  className="cursor-pointer p-1 transition-opacity hover:opacity-70"
                >
                  <img src="/icons/Trash.svg" alt="delete" className="h-6 w-6" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {historyMeta && (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
          <div>
            Show {recentTransactions.length} History of {historyMeta.total_records} History
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handlePageChange(historyMeta.current_page - 1)}
              disabled={historyMeta.current_page === 1}
              className="font-medium transition-colors hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-500"
            >
              Prev
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: historyMeta.total_page }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`font-medium transition-colors ${historyMeta.current_page === pageNum
                      ? "font-bold text-blue-600"
                      : "hover:text-blue-600"
                      }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(historyMeta.current_page + 1)}
              disabled={historyMeta.current_page === historyMeta.total_page}
              className="font-medium transition-colors hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryList;