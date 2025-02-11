import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import SharedInventoryPage from "../../components/Records/SharedInventoryPage"; // Ensure the path is correct

const AdminInventory = () => {
  return (
    <MainLayout>
      <SharedInventoryPage />
    </MainLayout>
  );
};

export default AdminInventory;
