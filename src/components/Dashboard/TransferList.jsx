import React from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

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

function TransferList() {
  const { transferTargets = [], transferMeta } = useSelector(
    (state) => state.dashboard
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const users = Array.isArray(transferTargets) ? transferTargets : [];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (transferMeta?.total_page || 1)) {
      const currentSearch = searchParams.get("search") || "";
      setSearchParams({ search: currentSearch, page: newPage.toString() });
    }
  };

  if (users.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        No receiver found.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100">
        {users.map((user, index) => (
          <Link
            key={user.id}
            to={`/transfer/detail?id=${user.id}`}
            state={{ selectedUser: user }}
            className={`flex items-center px-6 py-4 transition-colors hover:bg-blue-50 ${index % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"
              }`}
          >
            <div className="flex flex-1 items-center">
              <img
                src={getProfileImage(user.photo || user.avatar)}
                alt="avatar"
                className="h-12 w-12 rounded-lg bg-gray-200 object-cover"
                onError={(e) => {
                  e.target.src = "/icons/Profile/User.svg";
                }}
              />
            </div>

            <div className="flex-2 text-center">
              <strong className="text-base text-gray-700">
                {user.full_name || user.name || "Unknown User"}
              </strong>
            </div>

            <div className="flex-2 text-center">
              <span className="text-sm text-gray-500">
                {user.phone || "-"}
              </span>
            </div>

            <div className="flex-1 text-right">
              <button
                onClick={(e) => e.preventDefault()}
                className="cursor-pointer p-1 text-gray-400 transition-colors hover:opacity-100"
              >
                <img
                  src="/icons/Star.svg"
                  alt="star"
                  className="h-6 w-6 opacity-60"
                />
              </button>
            </div>
          </Link>
        ))}
      </div>

      {transferMeta && transferMeta.total_page > 1 && (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-gray-500 md:flex-row">
          <div>
            Showing {users.length} of {transferMeta.total_records} Results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(transferMeta.current_page - 1)}
              disabled={transferMeta.current_page === 1}
              className="px-3 py-1 font-medium transition-colors hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-500"
            >
              Prev
            </button>

            {Array.from({ length: transferMeta.total_page }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`rounded-md px-3 py-1 font-medium transition-colors ${transferMeta.current_page === pageNum
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  {pageNum}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(transferMeta.current_page + 1)}
              disabled={transferMeta.current_page === transferMeta.total_page}
              className="px-3 py-1 font-medium transition-colors hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransferList;