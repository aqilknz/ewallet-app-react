import React from 'react'
import { useNavigate } from 'react-router';

function TransferList({search}) {
    const navigate = useNavigate();
    const dataTransfer = [
        { path: '/images/1.svg', name: 'Ghaluh1', telp: '082116304337', money: 'Rp.50.000', icon: '/icons/Star.svg' },
        { path: '/images/1-2.svg', name: 'Cameron Williamson', telp: '082116312317', money: 'Rp.50.000', icon: '/icons/Star.svg' },
        { path: '/images/1-3.svg', name: 'Cody Fisher', telp: '0812357163043', money: 'Rp.50.000', icon: '/icons/Star.svg' },
        { path: '/images/1.svg', name: 'Ghaluh1', telp: '082116304337', money: 'Rp.50.000', icon: '/icons/Star.svg' },
        { path: '/images/1-2.svg', name: 'Cameron Williamson', telp: '082116312317', money: 'Rp.50.000', icon: '/icons/Star.svg' },
        { path: '/images/1.svg', name: 'Cody Fisher', telp: '0812357163043', money: 'Rp.50.000', icon: '/icons/Star.svg' },
        { path: '/images/1-2.svg', name: 'Ghaluh1', telp: '082116304337', money: 'Rp.50.000', icon: '/icons/Star.svg' },
        { path: '/images/1-3.svg', name: 'Cameron Williamson', telp: '082116312317', money: 'Rp.50.000', icon: '/icons/Star.svg' },
        { path: '/images/1.svg', name: 'Cody Fisher', telp: '0812357163043', money: 'Rp.50.000', icon: '/icons/Star.svg' }
    ]
    const safeSearch = (search || '').toLowerCase();
    const filteredData = dataTransfer.filter((item) =>
        item.name.toLowerCase().includes(safeSearch.toLowerCase()) ||
        item.telp.includes(safeSearch)
    )
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3">
                <tbody>
                    {filteredData.map((item,index) => {
                        const isPos = item.pos;
                        return (
                            <tr
                                key={index}
                                className="bg-white hover:bg-secondary transition-colors odd:bg-gray-100 cursor-pointer group"
                                onClick={() => navigate('/transfer/detail')}
                            >
                                <td className="p-2 w-16">
                                    <img
                                        src={item.path}
                                        alt={`${item.name} icon`}
                                        className="w-10 h-10"
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
    )
}

export default TransferList