import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import SharedPurchaseOrderPage from "../../components/Orders/Purchase Order/SharedPurchaseOrderPage";

const AdminPurchaseOrder = () => {
  return (
    <MainLayout>
      <SharedPurchaseOrderPage />
    </MainLayout>
  );
};

export default AdminPurchaseOrder;
