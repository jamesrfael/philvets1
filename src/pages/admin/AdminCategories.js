import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import productData from "../data/ProductData";
import Card from "../../components/Layout/Card";
import Button from "../../components/Layout/Button";
import SearchBar from "../../components/Layout/SearchBar";
import { colors } from "../../colors"; // Ensure colors are correctly imported
import {
  FaBox,
  FaGift,
  FaFlask,
  FaThermometerHalf,
  FaMedkit,
  FaArrowLeft,
} from "react-icons/fa"; // Import your icons
import AddCategoryModal from "../../components/Products/AddCategoryModal"; // Adjust the path if needed

const UserCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const categoryIcons = {
    C001: <FaBox />,
    C002: <FaGift />,
    C003: <FaFlask />,
    C004: <FaThermometerHalf />,
    C005: <FaMedkit />,
  };

  const getCategoryProductCount = (categoryCode) => {
    return productData.products.filter(
      (product) => product.PROD_CAT_CODE === categoryCode
    ).length;
  };

  const filteredCategories = productData.productCategories.filter((category) =>
    category.PROD_CAT_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <Controls>
        <LeftControls>
          <BackButton onClick={() => window.history.back()}>
            <FaArrowLeft />
          </BackButton>
          <SearchBar
            placeholder="Search / Filter category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </LeftControls>
        <Button onClick={() => setIsModalOpen(true)}>Add Category</Button>
      </Controls>
      <CategoryContainer>
        {filteredCategories.map((category) => (
          <Card
            key={category.PROD_CAT_CODE}
            label={category.PROD_CAT_NAME}
            value={`${getCategoryProductCount(category.PROD_CAT_CODE)}`}
            bgColor={colors.primary} // Use the specified primary color
            icon={categoryIcons[category.PROD_CAT_CODE]} // Add icon here
            onClick={() => {}}
          />
        ))}
      </CategoryContainer>
      {isModalOpen && (
        <AddCategoryModal onClose={() => setIsModalOpen(false)} />
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
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // Add gap between Back button and Search bar
`;

const BackButton = styled.button`
  background: none; // Remove default button background
  border: none; // Remove default button border
  color: black; // Black color for the icon
  font-size: 20px; // Size of the icon
  cursor: pointer; // Pointer cursor on hover
  transition: color 0.3s ease; // Smooth color transition

  &:hover {
    color: ${colors.primaryHover}; // Change color on hover
  }
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

export default UserCategories;
