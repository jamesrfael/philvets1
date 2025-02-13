import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import SharedRecordsPage from "../../components/Records/SharedRecordsPage"; // Ensure the path is correct

const AdminRecords = () => {
  return (
    <MainLayout>
      <SharedRecordsPage />
    </MainLayout>
  );
};

export default AdminRecords;
