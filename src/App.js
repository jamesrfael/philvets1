import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStaffs from "./pages/admin/AdminStaffs";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminReports from "./pages/admin/AdminReports";
import AdminSuppliers from "./pages/admin/AdminSuppliers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminDelivery from "./pages/admin/AdminDelivery";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminSales from "./pages/admin/AdminSales";
import AdminReturns from "./pages/admin/AdminReturns";
import AdminLogs from "./pages/admin/AdminLogs";

import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffProfile from "./pages/staff/StaffProfile";
import NotFoundPage from "./pages/NotFoundPage"; // Add a NotFoundPage component

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content">
          <Routes>
            {/* Default Landing Page */}
            <Route path="/" element={<LoginPage />} />

            {/* Admin Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/staffs" element={<AdminStaffs />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/suppliers" element={<AdminSuppliers />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/delivery" element={<AdminDelivery />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/sales" element={<AdminSales />} />
            <Route path="/admin/returns" element={<AdminReturns />} />
            <Route path="/admin/logs" element={<AdminLogs />} />

            {/* Staff Routes */}
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/profile" element={<StaffProfile />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
