import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { useScrollToTop } from "../hooks/useScrollToTop.jsx";
// import { store, persistor } from "../redux/store.js";
// import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../components/Auth/ProtectedRoute.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import DashboardLayout from "../Layout/DashboardLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Transfer from "../pages/Transfer.jsx";
import History from "../pages/History.jsx";
import TopUpPage from "../pages/TopUpPage.jsx";
import Profile from "../pages/Profile.jsx";
import ChangePassword from "../pages/ChangePassword.jsx";
import ChangePin from "../pages/ChangePin.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import EnterPin from "../pages/EnterPin.jsx";
import TransferDetail from "../pages/TransferDetail.jsx";

// import Register from '../pages/Register.jsx'
// import Dashboard from '../pages/Dashboard.jsx'

function AppRoute() {
  useScrollToTop();
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="auth">
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="enterpin" element={<EnterPin />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transfer">
              <Route index element={<Transfer />} />
              <Route path="detail" element={<TransferDetail />} />
            </Route>
            <Route path="history" element={<History />} />
            <Route path="topup" element={<TopUpPage />} />
            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="changepin" element={<ChangePin />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default AppRoute;
