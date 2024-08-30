import React, { useState } from "react";
import LayoutHS from "../../components/Layout/LayoutHS";
import styled from "styled-components";
import { colors } from "../../colors";
import productData from "../data/ProductData";
import SearchBar from "../../components/Layout/SearchBar"; // Import the SearchBar component
import Table from "../../components/Layout/Table"; // Import the new Table component
import CardTotalProducts from "../../components/CardsData/CardTotalProducts"; // Import CardTotalProducts

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = productData.products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const productDetail = productData.productDetails.find(
      (detail) => detail.PROD_DETAILS_CODE === product.PROD_DETAILS_CODE
    );
    const category = productData.productCategories.find(
      (cat) => cat.PROD_CAT_CODE === product.PROD_CAT_CODE
    )?.PROD_CAT_NAME;

    return (
      product.PROD_NAME.toLowerCase().includes(lowerCaseSearchTerm) ||
      category?.toLowerCase().includes(lowerCaseSearchTerm) ||
      productDetail?.PROD_DETAILS_SIZE?.toLowerCase().includes(
        lowerCaseSearchTerm
      ) ||
      productDetail?.PROD_DETAILS_BRAND?.toLowerCase().includes(
        lowerCaseSearchTerm
      ) ||
      productDetail?.PROD_DETALS_PRICE?.toString()
        .toLowerCase()
        .includes(lowerCaseSearchTerm)
    );
  });

  const headers = ["Product", "Category", "Unit", "Brand", "Price", "Action"];
  const rows = filteredProducts.map((product) => {
    const productDetail = productData.productDetails.find(
      (detail) => detail.PROD_DETAILS_CODE === product.PROD_DETAILS_CODE
    );
    const category = productData.productCategories.find(
      (cat) => cat.PROD_CAT_CODE === product.PROD_CAT_CODE
    )?.PROD_CAT_NAME;

    return [
      product.PROD_NAME,
      category,
      productDetail?.PROD_DETAILS_SIZE,
      productDetail?.PROD_DETAILS_BRAND,
      `₱${productDetail?.PROD_DETALS_PRICE}`,
      <ActionButton key="action">View</ActionButton>,
    ];
  });

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup>
          <Button>Add Category</Button>
          <Button>Add Product</Button>
        </ButtonGroup>
      </Controls>
      <AnalyticsContainer>
        <CardTotalProducts /> {/* Display Total Products */}
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
    </LayoutHS>
  );
};

// Styled components

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px 19px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

const ActionButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 1px;
`;

export default AdminProducts;
