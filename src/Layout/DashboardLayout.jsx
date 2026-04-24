import Header from '../components/Dashboard/Header.jsx'
import Sidebar from '../components/Dashboard/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className='flex flex-col min-h-screen bg-gray-50'>
            <Header />
            <div className='flex overflow-hidden'>
                <Sidebar />
                <main className='flex-1 p-6 md:p-10 overflow-y-auto bg-white'>
                    <div className='max-w-6xl mx-auto'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout