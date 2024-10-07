import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPasswordPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminReports from "./pages/admin/AdminReports";
import AdminSuppliers from "./pages/admin/AdminSuppliers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminRequest from "./pages/admin/AdminRequest";
import AdminSalesOrder from "./pages/admin/AdminSalesOrder";
import AdminPurchaseOrder from "./pages/admin/AdminPurchaseOrder";
import AdminDelivery from "./pages/admin/AdminDelivery";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminSales from "./pages/admin/AdminSales";
import AdminReturns from "./pages/admin/AdminReturns";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCategoryView from "./pages/admin/AdminCategoryView";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminNotification from "./pages/admin/AdminNotification";

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

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/suppliers" element={<AdminSuppliers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/orders/request" element={<AdminRequest />} />
        <Route path="/admin/orders/sales-order" element={<AdminSalesOrder />} />
        <Route
          path="/admin/orders/purchase-order"
          element={<AdminPurchaseOrder />}
        />
        <Route path="/admin/delivery" element={<AdminDelivery />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/sales" element={<AdminSales />} />
        <Route path="/admin/returns" element={<AdminReturns />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/category-view" element={<AdminCategoryView />} />
        <Route path="/admin/notifications" element={<AdminNotification />} />

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
