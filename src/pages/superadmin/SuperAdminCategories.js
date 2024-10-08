import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import productData from "../data/ProductData";
import Card from "../../components/Layout/Card";
import Button from "../../components/Layout/Button";
import SearchBar from "../../components/Layout/SearchBar";
import { colors } from "../../colors";
import { FaBox, FaGift, FaFlask, FaThermometerHalf, FaMedkit, FaArrowLeft } from "react-icons/fa";
import AddCategoryModal from "../../components/Products/AddCategoryModal";

const SuperAdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const categoryIcons = {
    C001: <FaBox />,
    C002: <FaGift />,
    C003: <FaFlask />,
    C004: <FaThermometerHalf />,
    C005: <FaMedkit />,
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
            value={`${productData.products.filter((product) => product.PROD_CAT_CODE === category.PROD_CAT_CODE).length}`}
            bgColor={colors.primary}
            icon={categoryIcons[category.PROD_CAT_CODE]}
            onClick={() => navigate(`/admin/categories/${category.PROD_CAT_CODE}`)} 
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
  gap: 10px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primaryHover};
  }
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

export default SuperAdminCategories;
