import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransferTargets } from "../redux/slice/transactionUserSlice";
import TransferList from "../components/Dashboard/TransferList.jsx";
import TransferStep from "../components/Dashboard/TransferStep.jsx";
import SearchInput from "../components/Dashboard/SearchInput.jsx";

function Transfer() {
  const dispatch = useDispatch();
  const { transferMeta } = useSelector((state) => state.dashboard);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    dispatch(fetchTransferTargets({ search, page, limit: 5 }));
  }, [dispatch, search, page]);

  const handleSearch = (e) => {
    setSearchParams({
      search: e.target.value,
      page: "1",
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

        <section className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Find People</h3>
              {search && transferMeta && (
                <p className="mt-1 text-sm text-gray-500">
                  {transferMeta.total_records} Result Found For <span className="capitalize">{search}</span>
                </p>
              )}
            </div>
            <SearchInput value={search} onChange={handleSearch} />
          </div>
          
          <div className="mt-4">
            <TransferList />
          </div>
        </section>
      </div>
    </>
  );
}

export default Transfer;