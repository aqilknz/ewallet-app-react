import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Dashboard/Header.jsx";
import Sidebar from "../components/Dashboard/Sidebar.jsx";
import HistoryList from "../components/Dashboard/HistoryList.jsx";
import SearchInput from "../components/Dashboard/SearchInput.jsx";

function History() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = (e) => {
    setSearchParams({ search: e.target.value, page: "1" });
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <img src="/icons/history.svg" alt="History" className="h-6 w-6" />
        <h2 className="text-xl font-bold text-gray-800">History Transaction</h2>
      </div>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h3 className="text-lg font-bold text-gray-800">Find Transaction</h3>
          <SearchInput value={search} onChange={handleSearch} />
        </div>

        <div className="mt-4">
          <HistoryList />
        </div>
      </section>
    </div>
  );
}

export default History;
