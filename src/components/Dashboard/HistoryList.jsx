import React from 'react'

function HistoryList({search}) {
    const dataHistory = [
        { path: '/images/1.svg', name: 'Ghaluh1', telp: '082116304337', money: 'Rp.50.000', icon: '/icons/Trash.svg', pos: true },
        { path: '/images/1-2.svg', name: 'Cameron Williamson', telp: '082116312317', money: 'Rp.50.000', icon: '/icons/Trash.svg', pos: false },
        { path: '/images/1-3.svg', name: 'Cody Fisher', telp: '0812357163043', money: 'Rp.50.000', icon: '/icons/Trash.svg', pos: true },
        { path: '/images/1.svg', name: 'Ghaluh1', telp: '082116304337', money: 'Rp.50.000', icon: '/icons/Trash.svg', pos: true },
        { path: '/images/1-2.svg', name: 'Cameron Williamson', telp: '082116312317', money: 'Rp.50.000', icon: '/icons/Trash.svg', pos: false },
        { path: '/images/1-3.svg', name: 'Cody Fisher', telp: '0812357163043', money: 'Rp.50.000', icon: '/icons/Trash.svg', pos: true },
        { path: '/images/1.svg', name: 'Ghaluh1', telp: '082116304337', money: 'Rp.50.000', icon: '/icons/Trash.svg', pos: true },
        { path: '/images/1-2.svg', name: 'Cameron Williamson', telp: '082116312317', money: 'Rp.50.000', icon: '/icons/Trash.svg', pos: false },
        { path: '/images/1-3.svg', name: 'Cody Fisher', telp: '0812357163043', money: 'Rp.50.000', icon: '/icons/Trash.svg', pos: true }
    ]
    const safeSearch = (search || '').toLowerCase();
    const filteredData = dataHistory.filter((item) =>
        item.name.toLowerCase().includes(safeSearch.toLowerCase()) ||
        item.telp.includes(safeSearch)
    )
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3">
                <tbody>

                    {filteredData.length > 0 ? (
                        filteredData.map((item,index) => {
                            const isPos = item.pos;

                            return (
                                <tr
                                    key={index}
                                    className="bg-white hover:bg-secondary transition-colors odd:bg-gray-100 cursor-pointer"
                                >
                                    <td className="p-2 w-16">
                                        <img
                                            src={item.path}
                                            alt={item.name}
                                            className="w-10 h-10"
                                        />
                                    </td>

                                    <td className="p-2 text-center font-bold">
                                        {item.name}
                                    </td>

                                    <td className="p-2 text-center">
                                        {item.telp}
                                    </td>

                                    <td className="p-2 text-center">
                                        <span className={`font-bold ${isPos ? 'text-green-500' : 'text-red-500'}`}>
                                            {item.money}
                                        </span>
                                    </td>

                                    <td className="p-2 text-center w-16">
                                        <button>
                                            <img
                                                src='/icons/Trash.svg'
                                                alt="delete"
                                                className="w-5 h-5 cursor-pointer"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-10 text-gray-400">
                                Data tidak ditemukan
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    )
}

export default HistoryList