import React from "react";
import { useSearchParams } from "react-router";
import Header from "../components/Dashboard/Header.jsx";
import Sidebar from "../components/Dashboard/Sidebar.jsx";
import TransferList from "../components/Dashboard/TransferList.jsx";
import TransferStep from "../components/Dashboard/TransferStep.jsx";
import SearchInput from "../components/Dashboard/SearchInput.jsx";

function Transfer() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const handleSearch = (e) => {
    setSearchParams({
      search: e.target.value,
      page: 1,
    });
  };
  return (
    <>
      <div>
        <div className="mb-8 flex items-center gap-4">
          <img src="/icons/Send-b.svg" alt="Transfer" className="h-6 w-6" />
          <h2 className="text-xl font-bold text-gray-800">Transfer Money</h2>
        </div>
        <div className="w-full py-4">
          <TransferStep currentStep={1} />
        </div>

        <section className="border-secondary rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <h3 className="text-lg font-bold text-gray-800">
              Find Transaction
            </h3>

            <SearchInput value={search} onChange={handleSearch} />
          </div>
          <div className="mt-4">
            <TransferList />
          </div>
          <div>
            {search && (
              <div className="mt-6 text-sm text-gray-500">
                <p>
                  Showing results for:{" "}
                  <span className="text-primary font-bold italic">
                    "{search}"
                  </span>
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Transfer;
