import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import SharedCategoryPage from "../../components/Products/Category/SharedCategoryPage"; // Make sure the path is correct

const AdminCategories = () => {
  return (
    <MainLayout>
      <SharedCategoryPage />
    </MainLayout>
  );
};

export default AdminCategories;
