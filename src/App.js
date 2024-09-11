import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"; // Import the ForgotPasswordPage component
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
import AdminCategories from "./pages/admin/AdminCategories";
import CategoryProducts from "./pages/admin/CategoryProducts";
import AdminProfile from "./pages/admin/AdminProfile";

import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffProfile from "./pages/staff/StaffProfile";
import StaffOrders from "./pages/staff/StaffOrders";
import StaffDelivery from "./pages/staff/StaffDelivery";
import StaffProducts from "./pages/staff/StaffProducts";
import StaffInventory from "./pages/staff/StaffInventory";
import NotFoundPage from "./pages/NotFoundPage"; // Add a NotFoundPage component

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content">
          <Routes>
            {/* Default Landing Page */}
            <Route path="/" element={<LoginPage />} />

            {/* Login Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Forgot Password Route */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* New Forgot Password route */}

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
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
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/categories/:categoryId" element={<CategoryProducts />} />
            
            {/* Staff Routes */}
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/profile" element={<StaffProfile />} />
            <Route path="/staff/orders" element={<StaffOrders />} />
            <Route path="/staff/delivery" element={<StaffDelivery />} />
            <Route path="/staff/products" element={<StaffProducts />} />
            <Route path="/staff/inventory" element={<StaffInventory />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
