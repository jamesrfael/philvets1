import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // For navigation
import SearchBar from "../../Layout/SearchBar";
import Card from "../../Layout/Card"; // Ensure this component is properly styled and handles onClick
import Button from "../../Layout/Button";
import AddCategoryModal from "./AddCategoryModal"; // Ensure this modal exists
import productData from "../../../data/ProductData"; // Adjust the import based on your file structure
import { colors } from "../../../colors"; // Colors

const SharedCategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(productData.productCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const navigate = useNavigate(); // For navigation to category view

  // Get product count for each category
  const getCategoryProductCount = (categoryCode) => {
    return productData.products.filter(
      (product) => product.PROD_CAT_CODE === categoryCode
    ).length;
  };

  // Filter categories based on search term
  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = productData.productCategories.filter((category) => {
      if (!value) return true;
      return category.PROD_CAT_NAME.toLowerCase().includes(value);
    });
    setFilteredCategories(filtered);
  };

  const openAddCategoryModal = () => {
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <Controls>
        <SearchBar
          placeholder="Search / Filter categories..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <StyledButton onClick={openAddCategoryModal}>
          Add Category
        </StyledButton>
      </Controls>
      <CategoryContainer>
        {filteredCategories.map((category) => (
          <Card
            key={category.PROD_CAT_CODE}
            label={category.PROD_CAT_NAME}
            value={`${getCategoryProductCount(category.PROD_CAT_CODE)} Products`}
            bgColor={colors.primary}
            onClick={() => navigate(`/shared-category/${category.PROD_CAT_CODE}`)} // Navigate on click
            style={{ cursor: 'pointer' }} // Add pointer cursor style for better UX
          />
        ))}
      </CategoryContainer>
      {showAddModal && (
        <AddCategoryModal onClose={closeModal} />
      )}
    </>
  );
};

// Styled components
const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

export default SharedCategoryPage;
