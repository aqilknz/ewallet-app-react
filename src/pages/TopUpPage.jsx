import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { processTopUp, fetchDashboardData } from "../redux/slice/transactionUserSlice";
import toast from "react-hot-toast";
import BankOption from "../components/Dashboard/BankOption";
import { bankOpt } from "../components/Dashboard/constant/BankOpt.jsx";

const TopUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.dashboard);

  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState("");
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
  }

  const nominal = Number(amount) || 0;
  const tax = nominal > 0 ? 4000 : 0;
  const total = nominal + tax;

  const handleTopUpSubmit = () => {
    if (nominal < 10000) return toast.error("Minimal Top Up Rp 10.000");
    if (!selectedBank) return toast.error("Pilih metode pembayaran terlebih dahulu");

    const payload = {
      amount: nominal,
      payment_method_id: selectedBank,
    };

    const loadingToast = toast.loading("Memproses Top Up...");

    dispatch(processTopUp(payload))
      .unwrap()
      .then(() => {
        toast.success("Top Up Berhasil!", { id: loadingToast, duration: 2000 });
        dispatch(fetchDashboardData());
        setAmount("");
        setSelectedBank(null);
        setTimeout(() => navigate("/dashboard"), 1000);
      })
      .catch((err) => {
        toast.error(err || "Gagal memproses Top Up", { id: loadingToast });
      });
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <img src="/icons/Upload-b.svg" alt="topup icon" className="w-6" />
        <h2 className="text-xl font-bold text-gray-900">Top Up Account</h2>
      </div>
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <section className="flex w-full flex-col gap-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <div>
            <h3 className="mb-3 block text-lg font-semibold text-gray-900">
              Account Information
            </h3>
            <div className="flex items-center gap-5 rounded-xl bg-gray-50 p-4">
              <img
                src={getProfileImage(currentUser?.photo || currentUser?.avatar)}
                alt="profile"
                className="h-14 w-14 rounded-lg object-cover"
                onError={(e) => { e.target.src = "/icons/Profile/User.svg" }}
              />
              <div className="flex flex-col gap-1">
                <strong className="text-lg text-gray-800">
                  {currentUser?.fullName || currentUser?.full_name || "User"}
                </strong>
                <span className="text-sm text-gray-500">
                  {currentUser?.phone || "-"}
                </span>
                <span className="inline-flex w-fit items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-[12px] text-white">
                  <img
                    src="/icons/verified.svg"
                    alt="verified"
                    className="h-4 w-4"
                  />
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-lg font-semibold text-gray-900">
              Amount
            </label>
            <p className="mb-3 text-sm text-gray-400">
              Type the amount you want to transfer
            </p>
            <div className="relative">
              <img
                src="/icons/money.svg"
                className="absolute top-3.5 left-4 w-5 opacity-60"
              />
              <input
                type="text"
                placeholder="Enter Nominal Transfer"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-gray-300 py-3.5 pr-4 pl-12 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-lg font-semibold text-gray-900">
              Payment Method
            </label>
            <p className="mb-4 text-sm text-gray-400">
              Choose your payment method
            </p>
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

        <section className="sticky top-8 w-full flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:w-[320px] xl:w-[350px]">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">Payment Summary</h3>
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order</span>
              <strong className="text-gray-800">
                Idr. {nominal.toLocaleString("id-ID")}
              </strong>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery</span>
              <strong className="text-gray-800">Idr. 0</strong>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax</span>
              <strong className="text-gray-800">
                Idr. {tax.toLocaleString("id-ID")}
              </strong>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between text-base font-bold text-gray-900">
              <span>Sub Total</span>
              <span>Idr. {total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <button
            onClick={handleTopUpSubmit}
            disabled={isLoading}
            className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>

          <p className="mt-4 text-xs leading-relaxed text-gray-400 italic text-center">
            *Get Discount if you pay with Bank Central Asia
          </p>
        </section>
      </div>
    </div>
  );
};

export default TopUpPage;