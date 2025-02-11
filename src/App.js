// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminPayroll from "./pages/admin/AdminPayroll";
import AdminRecords from "./pages/admin/AdminRecords";
import Admin13thMonthPay from "./pages/admin/Admin13thMonthPay";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/members" element={<AdminMembers />} />
        <Route path="/admin/payroll" element={<AdminPayroll />} />
        <Route path="/admin/records" element={<AdminRecords />} />
        <Route path="/admin/13monthpay" element={<Admin13thMonthPay />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
}

export default App;