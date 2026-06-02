import React from "react";
import { useLocation } from "react-router-dom";
import TransferStep from "../components/Dashboard/TransferStep";
import DetailTransfer from "../components/Dashboard/DetailTransfer";

function TransferDetail() {
  const location = useLocation();
  const selectedUser = location.state?.selectedUser;

  if (!selectedUser) {
    return (
      <div className="py-20 text-center text-gray-500">
        User tidak ditemukan. Silakan kembali ke halaman Transfer dan pilih penerima.
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-8 flex items-center gap-4">
        <img src="/icons/Send-b.svg" alt="Transfer" className="h-6 w-6" />
        <h2 className="text-xl font-bold text-gray-800">Transfer Money</h2>
      </div>
      <div className="w-full py-4">
        <TransferStep currentStep={2} />
      </div>
      <section>
        <DetailTransfer user={selectedUser} />
      </section>
    </div>
  );
}

export default TransferDetail;