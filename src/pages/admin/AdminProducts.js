import React, { useState } from "react";
import LayoutHS from "../../components/Layout/LayoutHS";
import styled from "styled-components";
import productData from "../data/ProductData";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import Button from "../../components/Layout/Button"; // Import the Button component

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
      <Button key="action" fontSize="14px">
        Details
      </Button>,
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
        <CardTotalProducts />
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
`;

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 1px;
`;

export default AdminProducts;
