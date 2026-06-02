import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData, fetchTransactionHistory } from "../redux/slice/transactionUserSlice.js";
// import Header from '../components/Dashboard/Header.jsx'
// import Sidebar from '../components/Dashboard/Sidebar.jsx'
import Card from "../components/Dashboard/Card.jsx";
// import IncomeChart from "../components/Dashboard/IncomeChart.jsx";
import TransactionChart from "../components/Dashboard/TransactionChart.jsx";
import TransactionList from "../components/Dashboard/TransactionList.jsx";

function Dashboard() {
  const dispatch = useDispatch()
  // const { currentUser } = useSelector((state) => state.auth);
  const { data, isLoading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchDashboardData());
      dispatch(fetchTransactionHistory({ limit: 5, page: 1 }))
    }
  }, [dispatch, token]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(value || 0)
      .replace("IDR", "Rp.");
  };
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
      <div className="space-y-8 xl:col-span-2">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            icon="/icons/carddashboard/balance-icon.svg"
            text="Balance"
            money={isLoading ? "Loading..." : formatCurrency(data?.balance)}
            persen="+2%"
            updown="/icons/carddashboard/rise-icons.svg"
            opt="3 days ago"
            color="text-green-500"
          />
          <Card
            icon="/icons/carddashboard/income-icon.svg"
            text="Income"
            money={isLoading ? "Loading..." : formatCurrency(data?.income)}
            persen="+2%"
            updown="/icons/carddashboard/rise-icons.svg"
            color="text-green-500"
          />
          <Card
            icon="/icons/carddashboard/expense-icon.svg"
            text="Expense"
            money={isLoading ? "Loading..." : formatCurrency(data?.expense)}
            persen="+2%"
            updown="/icons/carddashboard/set-icon.svg"
            color="text-red-500"
          />
        </div>

        <article className="border-secondary overflow-y-auto rounded-2xl border-2 bg-white shadow-sm">
          <div className="flex flex-col justify-center items-center md:flex-row md:justify-between gap-4 px-8 py-6">
            <h3 className="text-xl font-bold text-gray-800">Fast Service</h3>
            <div className="flex flex-wrap gap-4">
              <Link to="/topup">
                <button className="bg-primary flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-blue-700">
                  <img
                    src="/icons/topupw.svg"
                    alt="topup-icon"
                    className="h-5 w-5"
                  />
                  <span>Top Up</span>
                </button>
              </Link>
              <Link to="/transfer">
                <button className="bg-primary flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-blue-700">
                  <img
                    src="/icons/Send.svg"
                    alt="transfer--icon"
                    className="h-5 w-5 brightness-0 invert"
                  />
                  <span>Transfer</span>
                </button>
              </Link>
            </div>
          </div>
        </article>

        <div className="border-secondary rounded-2xl border-2 bg-white shadow-sm">
          <TransactionChart />
        </div>
      </div>

      <div className="w-full xl:col-span-1">
        <div className="border-secondary h-full rounded-2xl border-2 bg-white shadow-sm">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
