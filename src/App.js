import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminPayroll from "./pages/admin/AdminPayroll";
import AdminRecords from "./pages/admin/AdminRecords";
import Admin13thMonthPay from "./pages/admin/Admin13thMonthPay";
import AdminSettings from "./pages/admin/AdminSettings"

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/admin/payroll" element={<AdminPayroll />} />
          <Route path="/admin/records" element={<AdminRecords />} />
          <Route path="/admin/13thmonthpay" element={<Admin13thMonthPay />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
