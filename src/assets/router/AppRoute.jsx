import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import LandingPage from '../pages/LandingPage.jsx'
import Dashboard from '../pages/DashboardP.jsx'
import Transfer from '../pages/Transfer.jsx'

// import Register from '../pages/Register.jsx'
// import Dashboard from '../pages/Dashboard.jsx'

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/dashboard'element={<Dashboard />}/>
      <Route path='/transfer'element={<Transfer />}/>
    </Routes>
  )
}

export default AppRoute