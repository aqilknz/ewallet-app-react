import React, { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
// import { DataHistory } from './data/DataHistory';
import { deleteTransaction } from "../../redux/slice/transactionSlice";

function HistoryList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = (searchParams.get("search") || "").toLowerCase();
  const { transactions } = useSelector((state) => state.transaction);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = 5;
  const filteredData = useMemo(() => {
    return transactions.filter(
      (item) =>
        item.name?.toLowerCase().includes(search) ||
        item.telp?.toLowerCase().includes(search),
    );
  }, [search, transactions]);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setSearchParams({ search, page: newPage.toString() });
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteTransaction(id));
  };
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => {
                const isPos = item.pos;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-secondary cursor-pointer bg-white transition-colors odd:bg-gray-100"
                    // onClick={() => navigate(`/transfer/detail?id=${item.id}`)}
                  >
                    <td className="w-16 p-2">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-10 w-10"
                      />
                    </td>

                    <td className="p-2 text-center font-bold">{item.name}</td>

                    <td className="p-2 text-center">{item.type}</td>

                    <td className="p-2 text-center">
                      <span
                        className={`font-bold ${item.type.includes("Top Up") ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.amount}
                      </span>
                    </td>

                    <td className="w-16 p-2 text-center">
                      <button onClick={(e) => handleDelete(e, item.id)}>
                        <img
                          src="/icons/Trash.svg"
                          alt="delete"
                          className="h-5 w-5 cursor-pointer"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400">
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredData.length)} of{" "}
            {filteredData.length} entries
          </p>

          <div className="flex items-center gap-2">
            {/* Tombol Prev */}
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-30"
            >
              Prev
            </button>

            {/* Nomor Halaman */}
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-10 w-10 cursor-pointer rounded-lg text-sm font-semibold transition-all ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white shadow-md"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Tombol Next */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-30"
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
