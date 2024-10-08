import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPasswordPage";

import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import AdminUsers from "./pages/superadmin/AdminUsers";
import AdminCustomers from "./pages/superadmin/AdminCustomers";
import AdminInventory from "./pages/superadmin/AdminInventory";
import AdminReports from "./pages/superadmin/AdminReports";
import AdminSuppliers from "./pages/superadmin/AdminSuppliers";
import AdminOrders from "./pages/superadmin/AdminOrders";
import AdminRequest from "./pages/superadmin/AdminRequest";
import AdminSalesOrder from "./pages/superadmin/AdminSalesOrder";
import AdminPurchaseOrder from "./pages/superadmin/AdminPurchaseOrder";
import AdminDelivery from "./pages/superadmin/AdminDelivery";
import AdminProducts from "./pages/superadmin/AdminProducts";
import AdminSales from "./pages/superadmin/AdminSales";
import AdminReturns from "./pages/superadmin/AdminReturns";
import AdminLogs from "./pages/superadmin/AdminLogs";
import AdminCategories from "./pages/superadmin/SuperAdminCategories";
import AdminCategoryView from "./pages/superadmin/AdminCategoryView";
import AdminProfile from "./pages/superadmin/AdminProfile";
import AdminNotification from "./pages/superadmin/AdminNotification";

import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffProfile from "./pages/staff/StaffProfile";
import StaffOrders from "./pages/staff/StaffOrders";
import StaffRequest from "./pages/staff/StaffRequest";
import StaffSalesOrder from "./pages/staff/StaffSalesOrder";
import StaffDelivery from "./pages/staff/StaffDelivery";
import StaffProducts from "./pages/staff/StaffProducts";
import StaffInventory from "./pages/staff/StaffInventory";
import StaffCustomers from "./pages/staff/StaffCustomers";
import StaffReturns from "./pages/staff/StaffReturns";
import StaffReports from "./pages/staff/StaffReports";
import StaffNotification from "./pages/staff/StaffNotification";
import StaffCategories from "./pages/staff/StaffCategories";
import StaffCategoryView from "./pages/staff/StaffCategoryView";

import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Landing Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Forgot Password Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Super Admin Routes */}
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/superadmin/profile" element={<AdminProfile />} />
        <Route path="/superadmin/users" element={<AdminUsers />} />
        <Route path="/superadmin/customers" element={<AdminCustomers />} />
        <Route path="/superadmin/inventory" element={<AdminInventory />} />
        <Route path="/superadmin/reports" element={<AdminReports />} />
        <Route path="/superadmin/suppliers" element={<AdminSuppliers />} />
        <Route path="/superadmin/orders" element={<AdminOrders />} />
        <Route path="/superadmin/orders/request" element={<AdminRequest />} />
        <Route path="/superadmin/orders/customer-order" element={<AdminSalesOrder />} />
        <Route path="/superadmin/orders/purchase-order" element={<AdminPurchaseOrder />} />
        <Route path="/superadmin/delivery" element={<AdminDelivery />} />
        <Route path="/superadmin/products" element={<AdminProducts />} />
        <Route path="/superadmin/sales" element={<AdminSales />} />
        <Route path="/superadmin/returns" element={<AdminReturns />} />
        <Route path="/superadmin/logs" element={<AdminLogs />} />
        <Route path="/superadmin/categories" element={<AdminCategories />} />
        <Route path="/superadmin/categories/:categoryId" element={<AdminCategoryView />} />
        <Route path="/superadmin/notifications" element={<AdminNotification />} />

        {/* Staff Routes */}
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/profile" element={<StaffProfile />} />
        <Route path="/staff/orders" element={<StaffOrders />} />
        <Route path="/staff/orders/request" element={<AdminRequest />} />
        <Route path="/staff/orders/sales-order" element={<AdminSalesOrder />} />
        <Route path="/staff/delivery" element={<StaffDelivery />} />
        <Route path="/staff/products" element={<StaffProducts />} />
        <Route path="/staff/inventory" element={<StaffInventory />} />
        <Route path="/staff/customers" element={<StaffCustomers />} />
        <Route path="/staff/returns" element={<StaffReturns />} />
        <Route path="/staff/reports" element={<StaffReports />} />
        <Route path="/staff/categories" element={<StaffCategories />} />
        <Route path="/staff/categories/:categoryId" element={<StaffCategoryView />} />
        <Route path="/staff/notifications" element={<StaffNotification />} />
        <Route path="/staff/orders/request" element={<StaffRequest />} />
        <Route path="/staff/orders/sales-order" element={<StaffSalesOrder />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
