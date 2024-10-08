import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPasswordPage";

import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SuperAdminUsers from "./pages/superadmin/SuperAdminUsers";
import SuperAdminCustomers from "./pages/superadmin/SuperAdminCustomers";
import SuperAdminInventory from "./pages/superadmin/SuperAdminInventory";
import SuperAdminReports from "./pages/superadmin/SuperAdminReports";
import SuperAdminSuppliers from "./pages/superadmin/SuperAdminSuppliers";
import SuperAdminOrders from "./pages/superadmin/SuperAdminOrders";
import SuperAdminRequest from "./pages/superadmin/SuperAdminRequest";
import SuperAdminCustomerOrder from "./pages/superadmin/SuperAdminCustomerOrder";
import SuperAdminPurchaseOrder from "./pages/superadmin/SuperAdminPurchaseOrder";
import SuperAdminDelivery from "./pages/superadmin/SuperAdminDelivery";
import SuperAdminProducts from "./pages/superadmin/SuperAdminProducts";
import SuperAdminSales from "./pages/superadmin/SuperAdminSales";
import SuperAdminReturns from "./pages/superadmin/SuperAdminReturns";
import SuperAdminLogs from "./pages/superadmin/SuperAdminLogs";
import SuperAdminCategories from "./pages/superadmin/SuperAdminCategories";
import SuperAdminCategoryView from "./pages/superadmin/SuperAdminCategoryView";
import SuperAdminProfile from "./pages/superadmin/SuperAdminProfile";
import SuperAdminNotification from "./pages/superadmin/SuperAdminNotification";

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
        <Route path="/superadmin/profile" element={<SuperAdminProfile />} />
        <Route path="/superadmin/users" element={<SuperAdminUsers />} />
        <Route path="/superadmin/customers" element={<SuperAdminCustomers />} />
        <Route path="/superadmin/inventory" element={<SuperAdminInventory />} />
        <Route path="/superadmin/reports" element={<SuperAdminReports />} />
        <Route path="/superadmin/suppliers" element={<SuperAdminSuppliers />} />
        <Route path="/superadmin/orders" element={<SuperAdminOrders />} />
        <Route path="/superadmin/orders/request" element={<SuperAdminRequest />} />
        <Route path="/superadmin/orders/customer-order" element={<SuperAdminCustomerOrder />} />
        <Route path="/superadmin/orders/purchase-order" element={<SuperAdminPurchaseOrder />} />
        <Route path="/superadmin/delivery" element={<SuperAdminDelivery />} />
        <Route path="/superadmin/products" element={<SuperAdminProducts />} />
        <Route path="/superadmin/sales" element={<SuperAdminSales />} />
        <Route path="/superadmin/returns" element={<SuperAdminReturns />} />
        <Route path="/superadmin/logs" element={<SuperAdminLogs />} />
        <Route path="/superadmin/categories" element={<SuperAdminCategories />} />
        <Route path="/superadmin/categories/:categoryId" element={<SuperAdminCategoryView />} />
        <Route path="/superadmin/notifications" element={<SuperAdminNotification />} />

        {/* Staff Routes */}
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/profile" element={<StaffProfile />} />
        <Route path="/staff/orders" element={<StaffOrders />} />
        <Route path="/staff/orders/request" element={<SuperAdminRequest />} />
        <Route path="/staff/orders/customer-order" element={<SuperAdminCustomerOrder />} />
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
