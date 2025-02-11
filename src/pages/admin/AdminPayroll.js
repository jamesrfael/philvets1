// src/pages/AdminUsers.js

import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import SharedUsersPage from "../../components/Payroll/SharedUsersPage"; // Ensure the path is correct

const AdminUsers = () => {
  return (
    <MainLayout>
      <SharedUsersPage userType="admin" /> {/* Pass userType to differentiate */}
    </MainLayout>
  );
};

export default AdminUsers;
