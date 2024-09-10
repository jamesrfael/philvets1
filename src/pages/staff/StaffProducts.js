import React, { useState } from "react";
import StaffLayoutHS from "../../components/Layout/StaffLayoutHS";
import styled from "styled-components";
import productData from "../data/ProductData";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import CardTotalCategories from "../../components/CardsData/CardTotalCategories";
import Button from "../../components/Layout/Button";
import AddProductModal from "../../components/Products/AddProductModal";
import AddCategoryModal from "../../components/Products/AddCategoryModal";
import ProductDetailsModal from "../../components/Products/ProductDetailsModal"; // Import the ProductDetailsModal component

const StaffProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] =
    useState(false);

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

  const headers = ["Image", "Product", "Category", "Unit", "Brand", "Price", "Action"];
  const rows = filteredProducts.map((product) => {
    const productDetail = productData.productDetails.find(
      (detail) => detail.PROD_DETAILS_CODE === product.PROD_DETAILS_CODE
    );
    const category = productData.productCategories.find(
      (cat) => cat.PROD_CAT_CODE === product.PROD_CAT_CODE
    )?.PROD_CAT_NAME;

    return [
      <img
        src={product.PROD_IMAGE} // Use PROD_IMAGE here
        alt={product.PROD_NAME}
        style={{ width: '50px', height: 'auto' }}
      />,
      product.PROD_NAME,
      category,
      productDetail?.PROD_DETAILS_SIZE,
      productDetail?.PROD_DETAILS_BRAND,
      `₱${productDetail?.PROD_DETALS_PRICE}`,
      <Button
        key="action"
        fontSize="14px"
        onClick={() => openProductDetailsModal(product.PROD_ID)}
      >
        Details
      </Button>,
    ];
  });

  // Handle modal open/close
  const openAddProductModal = () => setIsAddProductModalOpen(true);
  const closeAddProductModal = () => setIsAddProductModalOpen(false);
  const openAddCategoryModal = () => setIsAddCategoryModalOpen(true);
  const closeAddCategoryModal = () => setIsAddCategoryModalOpen(false);
  const openProductDetailsModal = (productId) => {
    setSelectedProductId(productId);
    setIsProductDetailsModalOpen(true);
  };
  const closeProductDetailsModal = () => {
    setSelectedProductId(null);
    setIsProductDetailsModalOpen(false);
  };

  // Handle save actions in modals
  const handleSaveProduct = (product, productDetails) => {
    console.log("New product:", product);
    console.log("New product details:", productDetails);
    // Implement save logic here
    closeAddProductModal();
  };

  const handleSaveCategory = (category) => {
    console.log("New category:", category);
    // Implement save logic here
    closeAddCategoryModal();
  };

  return (
    <StaffLayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search / Filter product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup>
          <Button onClick={openAddProductModal}>Add Product</Button>
          <Button onClick={openAddCategoryModal}>Add Category</Button>
        </ButtonGroup>
      </Controls>
      <AnalyticsContainer>
        <CardTotalProducts />
        <CardTotalCategories />
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {isAddProductModalOpen && (
        <AddProductModal
          onClose={closeAddProductModal}
          onSave={handleSaveProduct}
        />
      )}
      {isAddCategoryModalOpen && (
        <AddCategoryModal
          onClose={closeAddCategoryModal}
          onSave={handleSaveCategory}
        />
      )}
      {isProductDetailsModalOpen && selectedProductId && (
        <ProductDetailsModal
          productId={selectedProductId}
          onClose={closeProductDetailsModal}
        />
      )}
    </StaffLayoutHS>
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

export default StaffProducts;
