import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Layout/Modal"; // Import the reusable Modal component
import productData from "../../pages/data/ProductData";
import Button from "../Layout/Button";

const ProductDetailsModal = ({ productId, onClose }) => {
  const product = productData.products.find(p => p.PROD_ID === productId);
  const productDetail = productData.productDetails.find(d => d.PROD_DETAILS_CODE === product.PROD_DETAILS_CODE);
  const category = productData.productCategories.find(c => c.PROD_CAT_CODE === product.PROD_CAT_CODE);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [editedProductDetail, setEditedProductDetail] = useState(productDetail);

  if (!product || !productDetail || !category) {
    return null; // Or show a loading spinner/error message
  }

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const confirmSave = window.confirm("Are you sure you want to save the changes?");
    if (confirmSave) {
      // Implement save logic here
      alert("Product details saved");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to discard the changes?");
    if (confirmCancel) {
      setIsEditing(false);
      // Optionally, reset the state to the original values
      setEditedProduct(product);
      setEditedProductDetail(productDetail);
    }
  };

  const handleRemove = () => {
    const confirmRemoval = window.confirm("Are you sure you want to remove this product?");
    if (confirmRemoval) {
      // Implement remove logic here
      alert(`Product ${product.PROD_NAME} removed`);
      onClose(); // Close the modal after removal
    }
  };

  return (
    <Modal title={isEditing ? `Edit ${product.PROD_NAME} details` : `${product.PROD_NAME} details`} onClose={onClose}>
      {isEditing ? (
        <>
          <Details>
            <DetailItem>
              <strong>Category:</strong>
              <Input
                type="text"
                value={category.PROD_CAT_NAME}
                onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Size:</strong>
              <Input
                type="text"
                value={editedProductDetail.PROD_DETAILS_SIZE}
                onChange={(e) => setEditedProductDetail({ ...editedProductDetail, PROD_DETAILS_SIZE: e.target.value })}
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Brand:</strong>
              <Input
                type="text"
                value={editedProductDetail.PROD_DETAILS_BRAND}
                onChange={(e) => setEditedProductDetail({ ...editedProductDetail, PROD_DETAILS_BRAND: e.target.value })}
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Price:</strong>
              <Input
                type="number"
                value={editedProductDetail.PROD_DETALS_PRICE}
                onChange={(e) => setEditedProductDetail({ ...editedProductDetail, PROD_DETALS_PRICE: e.target.value })}
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Description:</strong>
              <Textarea
                value={editedProductDetail.PROD_DETAILS_DESCRIPTION}
                onChange={(e) => setEditedProductDetail({ ...editedProductDetail, PROD_DETAILS_DESCRIPTION: e.target.value })}
                rows="4"
                border
              />
            </DetailItem>
          </Details>
          <ButtonGroup>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel} variant="secondary">Cancel</Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Details>
            <DetailItem>
              <strong>Category:</strong> {category.PROD_CAT_NAME}
            </DetailItem>
            <DetailItem>
              <strong>Size:</strong> {productDetail.PROD_DETAILS_SIZE}
            </DetailItem>
            <DetailItem>
              <strong>Brand:</strong> {productDetail.PROD_DETAILS_BRAND}
            </DetailItem>
            <DetailItem>
              <strong>Price:</strong> ₱{productDetail.PROD_DETALS_PRICE}
            </DetailItem>
            <DetailItem>
              <strong>Description:</strong> {productDetail.PROD_DETAILS_DESCRIPTION}
            </DetailItem>
          </Details>
          <ButtonGroup>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleRemove} variant="danger">Remove</Button>
          </ButtonGroup>
        </>
      )}
    </Modal>
  );
};

// Styled Components

const Details = styled.div`
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Input = styled.input`
  border: ${(props) => (props.border ? '1px solid #ddd' : 'none')};
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export default ProductDetailsModal;
