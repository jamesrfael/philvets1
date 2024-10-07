import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import productData from "../data/ProductData";
import Card from "../../components/Layout/Card";
import Button from "../../components/Layout/Button";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import { colors } from "../../colors";
import { FaBox, FaGift, FaFlask, FaThermometerHalf, FaMedkit, FaArrowLeft } from "react-icons/fa";
import AddCategoryModal from "../../components/Products/AddCategoryModal";

const AdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const categoryIcons = {
    C001: <FaBox />,
    C002: <FaGift />,
    C003: <FaFlask />,
    C004: <FaThermometerHalf />,
    C005: <FaMedkit />,
  };

  const getAdminCategoryViewCount = (categoryCode) => {
    return productData.products.filter(
      (product) => product.PROD_CAT_CODE === categoryCode
    ).length;
  };

  const filteredCategories = productData.productCategories.filter((category) =>
    category.PROD_CAT_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = productData.products.filter(
    (product) => product.PROD_CAT_CODE === selectedCategoryId
  );

  const productHeaders = ["Product", "Unit", "Brand", "Price", "Action"];
  const productRows = filteredProducts.map((product) => {
    const productDetail = productData.productDetails.find(
      (detail) => detail.PROD_DETAILS_CODE === product.PROD_DETAILS_CODE
    );

    return [
      product.PROD_NAME,
      productDetail?.PROD_DETAILS_SIZE,
      productDetail?.PROD_DETAILS_BRAND,
      `₱${productDetail?.PROD_DETAILS_PRICE}`, // Fix the typo here
      <Button key="action" fontSize="14px">
        Edit
      </Button>,
    ];
  });

  const selectedCategory = filteredCategories.find(c => c.PROD_CAT_CODE === selectedCategoryId);

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
            value={`${getAdminCategoryViewCount(category.PROD_CAT_CODE)}`}
            bgColor={selectedCategoryId === category.PROD_CAT_CODE ? colors.selected : colors.primary} // Highlight selected card
            icon={categoryIcons[category.PROD_CAT_CODE]}
            onClick={() => setSelectedCategoryId(category.PROD_CAT_CODE)} // Set selected category
          />
        ))}
      </CategoryContainer>

      {selectedCategoryId && (
        <>
          <h2>Products in {selectedCategory?.PROD_CAT_NAME || "Selected Category"}</h2>
          {filteredProducts.length > 0 ? (
            <Table headers={productHeaders} rows={productRows} />
          ) : (
            <p>No products available in this category.</p>
          )}
        </>
      )}

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

export default AdminCategories;
