import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Stores from "./pages/Stores";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";

import Users from "./pages/Users";
import StoreManagement from "./pages/StoreManagement";
import ChangePassword from "./pages/ChangePassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Common */}
        <Route path="/stores" element={<Stores />} />

        {/* Role Based Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />

        {/* Admin Pages */}
        <Route path="/users" element={<Users />} />
        <Route
          path="/store-management"
          element={<StoreManagement />}
        />

        {/* Change Password */}
        <Route
          path="/change-password"
          element={<ChangePassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}
