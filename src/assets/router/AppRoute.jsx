import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import LandingPage from '../pages/LandingPage.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Transfer from '../pages/Transfer.jsx'
import History from '../pages/History.jsx'
import TopUpPage from '../pages/TopUpPage.jsx'

// import Register from '../pages/Register.jsx'
// import Dashboard from '../pages/Dashboard.jsx'

function AppRoute() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='auth'>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='transfer' element={<Transfer />} />
      <Route path='history' element={<History />} />
      <Route path='topup' element={<TopUpPage/>} />
    </Routes>
  )
}

export default AppRoute