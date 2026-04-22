import React, { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router';
import { DataTransfer } from './data/DataTransfer.jsx';

function TransferList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const search = (searchParams.get('search') || '').toLowerCase();
    const currentPage = parseInt(searchParams.get('page') || '1');
    const itemsPerPage = 5;
    const filteredData = useMemo(() => {
        const safeSearch = search.toLowerCase();
        return DataTransfer.filter((item) =>
            item.name.toLowerCase().includes(safeSearch) ||
            item.telp.includes(safeSearch)
        );
    }, [search]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage);
        navigate(`/transfer?${params.toString()}`);
    };
    return (
        <div className='w-full'>

            <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-3">
                    <tbody>
                        {currentItems.map((item) => {
                            const isPos = item.pos;
                            return (
                                <tr
                                    key={item.id}
                                    className="bg-white hover:bg-secondary transition-colors odd:bg-gray-100 cursor-pointer group"
                                    onClick={() => navigate(`/transfer/detail?id=${item.id}`)}
                                >
                                    <td className="p-2 w-16">
                                        <img
                                            src={item.path}
                                            alt={`${item.name} icon`}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>

                                    <td className="p-2 ">
                                        <div className="font-bold text-black text-center">
                                            {item.name}
                                        </div>
                                    </td>
                                    {/* <NavLink to="/transfer/detail" className="p-2 text-center font-medium text-black">
                                    {item.name}
                                </NavLink> */}

                                    <td className="p-2 ">
                                        <div className='text-center'>
                                            {item.telp}
                                        </div>
                                    </td>

                                    <td className="p-2 text-center w-16">
                                        <img
                                            src={item.icon}
                                            alt="delete"
                                            className="w-5 h-5 cursor-pointer "
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
                    <p className="text-sm text-gray-500">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-all cursor-pointer"
                        >
                            Prev
                        </button>
                        <div className="flex gap-1">
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all cursor-pointer ${currentPage === pageNum
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-all cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>

    )
}

export default TransferList