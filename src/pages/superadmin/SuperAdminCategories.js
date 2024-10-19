// src/components/Products/SuperAdminCategories.js
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import productData from "../../data/ProductData";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import CardTotalCategories from "../../components/CardsData/CardTotalCategories";
import Button from "../../components/Layout/Button";
import AddProductModal from "../../components/Products/AddProductModal";
import AddCategoryModal from "../../components/Products/Category/AddCategoryModal";
import ProductDetailsModal from "../../components/Products/ProductDetailsModal";
import { FaPlus } from "react-icons/fa";
import { colors } from "../../colors";
import MainLayout from "../../components/Layout/MainLayout"; // Import MainLayout

const SuperAdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] = useState(false);

  const navigate = useNavigate(); // Get the navigate function
  const location = useLocation(); // Get the current location (URL)

  // Filter products based on search term
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
      productDetail?.PROD_DETAILS_BRAND?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const headers = [
    "Image",
    "Product",
    "Category",
    "Unit",
    "Brand",
    "Price",
    "Action",
  ];

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
        style={{ width: "50px", height: "auto" }}
      />,
      product.PROD_NAME,
      category,
      productDetail?.PROD_DETAILS_SIZE,
      productDetail?.PROD_DETAILS_BRAND,
      `₱${productDetail?.PROD_DETALS_PRICE}`,
      <ActionButton
        key="action"
        fontSize="14px"
        onClick={() => openProductDetailsModal(product.PROD_ID)}
      >
        Details
      </ActionButton>,
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
    closeAddProductModal();
  };

  const handleSaveCategory = (category) => {
    console.log("New category:", category);
    closeAddCategoryModal();
  };

  const handleCardClick = () => {
    // Check the current path to determine the role
    let path;
    if (location.pathname.includes("/superadmin")) {
      path = "/superadmin/categories";
    } else if (location.pathname.includes("/admin")) {
      path = "/admin/categories";
    } else if (location.pathname.includes("/staff")) {
      path = "/staff/categories";
    } else {
      alert("Access denied");
      return;
    }

    // Navigate to the determined path
    navigate(path);
  };

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup>
          <StyledButton onClick={openAddProductModal}>
            <FaPlus className="icon" /> Product
          </StyledButton>
          <StyledButton onClick={openAddCategoryModal}>
            <FaPlus className="icon" /> Category
          </StyledButton>
        </ButtonGroup>
      </Controls>
      <AnalyticsContainer>
        <CardTotalProducts />
        <ClickableCard onClick={handleCardClick}>
          <CardTotalCategories />
        </ClickableCard>
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
    </MainLayout>
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
  gap: 16px;
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

const ClickableCard = styled.div`
  cursor: pointer;
`;

const ActionButton = styled(Button)`
  background-color: ${colors.primary};
  &:hover {
    background-color: ${colors.primaryHover};
  }

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

export default SuperAdminCategories;
