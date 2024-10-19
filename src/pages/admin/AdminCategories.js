// src/pages/AdminCategories.js
import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import { colors } from "../../colors";
import productData from "../../data/ProductData";
import AddCategoryModal from "../../components/Products/Category/AddCategoryModal";
import CategoryDetailsModal from "../../components/Products/Category/CategoryDetailsModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalCategories from "../../components/CardsData/CardTotalCategories";
import Button from "../../components/Layout/Button";
import { FaPlus } from "react-icons/fa";

const AdminCategories = () => {
  const [categories, setCategories] = useState(productData.productCategories);
  const [products] = useState(productData.products); // Access product data
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Count products for each category
  const countProductsByCategory = (categoryCode) => {
    return products.filter((product) => product.PROD_CAT_CODE === categoryCode)
      .length;
  };

  const filteredCategories = categories.filter((category) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return category.PROD_CAT_NAME.toLowerCase().includes(lowerCaseSearchTerm);
  });

  const handleAddCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const headers = ["Category Name", "Products", "Actions"];

  const rows = filteredCategories.map((category) => [
    category.PROD_CAT_NAME,
    countProductsByCategory(category.PROD_CAT_CODE), // Count products by category
    <Button
      backgroundColor={colors.primary}
      hoverColor={colors.primaryHover}
      onClick={() => {
        setIsDetailsModalOpen(true);
        setSelectedCategory(category); // Set the selected category for viewing details
      }}
    >
      Details
    </Button>,
  ]);

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup>
          <StyledButton
            backgroundColor={colors.primary}
            hoverColor={colors.primaryHover}
            onClick={() => setIsAddModalOpen(true)}
          >
            <FaPlus className="icon" /> Category
          </StyledButton>
        </ButtonGroup>
      </Controls>
      <AnalyticsContainer>
        <CardTotalCategories /> {/* Display Total Categories */}
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {isAddModalOpen && (
        <AddCategoryModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddCategory}
        />
      )}
      {isDetailsModalOpen && (
        <CategoryDetailsModal
          category={selectedCategory} // Pass the selected category to the modal
          products={products} // Pass the product list for the category
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
    </MainLayout>
  );
};

// Styled Components

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 1px;
`;

export default AdminCategories;
