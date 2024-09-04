import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import Table from "../Layout/Table";
import { FaTimes } from "react-icons/fa";
import productData from "../../pages/data/ProductData";

const CategoryDetailsModal = ({ category, onClose }) => {
  const productsInCategory = productData.products.filter(
    (product) => product.PROD_CAT_CODE === category.PROD_CAT_CODE
  );

  const headers = ["Product", "Unit", "Brand", "Price"];
  const rows = productsInCategory.map((product) => {
    const productDetail = productData.productDetails.find(
      (detail) => detail.PROD_DETAILS_CODE === product.PROD_DETAILS_CODE
    );

    return [
      product.PROD_NAME,
      productDetail?.PROD_DETAILS_SIZE,
      productDetail?.PROD_DETAILS_BRAND,
      `₱${productDetail?.PROD_DETALS_PRICE}`,
    ];
  });

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{category.PROD_CAT_NAME}</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <Description>{category.PROD_CAT_SUBCATEGORY}</Description>
          <ProductCount>
            <strong>Total Products:</strong> {productsInCategory.length}
          </ProductCount>
          <Table headers={headers} rows={rows} />
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.fail};
`;

const ModalBody = styled.div``;

const Description = styled.p`
  margin-bottom: 15px;
  font-size: 1rem;
`;

const ProductCount = styled.div`
  margin-bottom: 20px;
  font-size: 1rem;
`;

export default CategoryDetailsModal;
