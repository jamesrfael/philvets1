import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import productData from "../data/ProductData";
import Table from "../../components/Layout/Table";
import Button from "../../components/Layout/Button";

const AdminCategoryView = () => {
  const { categoryId } = useParams();
  console.log("Category ID from URL:", categoryId);  // Add this to check


  const filteredProducts = productData.products.filter(
    (product) => product.PROD_CAT_CODE === categoryId
  );

  const headers = ["Product", "Unit", "Brand", "Price", "Action"];
  const rows = filteredProducts.map((product) => {
    const productDetail = productData.productDetails.find(
      (detail) => detail.PROD_DETAILS_CODE === product.PROD_DETAILS_CODE
    );

    return [
      product.PROD_NAME,
      productDetail?.PROD_DETAILS_SIZE,
      productDetail?.PROD_DETAILS_BRAND,
      `₱${productDetail?.PROD_DETALS_PRICE}`,
      <Button key="action" fontSize="14px">
        Edit
      </Button>,
    ];
  });

  return (
    <MainLayout>
      <Controls>
        <Button onClick={() => console.log("Add product")}>Add Product</Button>
      </Controls>
      <Table headers={headers} rows={rows} />
    </MainLayout>
  );
};

// Styled Components
const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export default AdminCategoryView;
