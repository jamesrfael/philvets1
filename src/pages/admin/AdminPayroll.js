// src/pages/AdminUsers.js

import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import SharedPayrollPage from "../../components/Payroll/SharedPayrollPage"; 

const AdminPayroll = () => {
  return (
    <MainLayout>
      <SharedPayrollPage userType="admin" /> {/* Pass userType to differentiate */}
    </MainLayout>
  );
};

export default AdminPayroll;
