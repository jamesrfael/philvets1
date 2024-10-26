import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Layout/Modal"; // Import the reusable Modal component
import productData from "../../data/ProductData";
import Button from "../Layout/Button";

const ProductDetailsModal = ({ productId, onClose }) => {
  const product = productData.products.find((p) => p.PROD_ID === productId);
  const productDetail = productData.PRODUCT_DETAILS.find(
    (d) => d.PROD_DETAILS_CODE === product.PROD_DETAILS_CODE
  );
  const category = productData.PRODUCT_CATEGORY.find(
    (c) => c.PROD_CAT_CODE === product.PROD_CAT_CODE
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [editedProductDetail, setEditedProductDetail] = useState(productDetail);
  const [selectedImage, setSelectedImage] = useState(product.PROD_IMAGE);

  if (!product || !productDetail || !category) {
    return null; // Or show a loading spinner/error message
  }

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const confirmSave = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (confirmSave) {
      // Implement save logic here
      alert("Product details saved");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to discard the changes?"
    );
    if (confirmCancel) {
      setIsEditing(false);
      setEditedProduct(product);
      setEditedProductDetail(productDetail);
      setSelectedImage(product.PROD_IMAGE);
    }
  };

  const handleRemove = () => {
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this product?"
    );
    if (confirmRemoval) {
      // Implement remove logic here
      alert(`Product ${product.PROD_NAME} removed`);
      onClose(); // Close the modal after removal
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      title={
        isEditing ? `Edit ${product.PROD_NAME}` : `${product.PROD_NAME} Details`
      }
      onClose={onClose}
    >
      {isEditing ? (
        <>
          <Details>
            <DetailItem>
              <strong>Image:</strong>
              <ImagePreview src={selectedImage} alt="Preview" />
              <ImageInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>Name:</strong>
              <Input
                type="text"
                value={editedProduct.PROD_NAME}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    PROD_NAME: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Category:</strong>
              <Input
                type="text"
                value={category.PROD_CAT_NAME}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Size:</strong>
              <Input
                type="text"
                value={editedProductDetail.PROD_DETAILS_SIZE}
                onChange={(e) =>
                  setEditedProductDetail({
                    ...editedProductDetail,
                    PROD_DETAILS_SIZE: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Brand:</strong>
              <Input
                type="text"
                value={editedProductDetail.PROD_DETAILS_BRAND}
                onChange={(e) =>
                  setEditedProductDetail({
                    ...editedProductDetail,
                    PROD_DETAILS_BRAND: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Price:</strong>
              <Input
                type="number"
                value={editedProductDetail.PROD_DETALS_PRICE}
                onChange={(e) =>
                  setEditedProductDetail({
                    ...editedProductDetail,
                    PROD_DETALS_PRICE: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Description:</strong>
              <Textarea
                value={editedProductDetail.PROD_DETAILS_DESCRIPTION}
                onChange={(e) =>
                  setEditedProductDetail({
                    ...editedProductDetail,
                    PROD_DETAILS_DESCRIPTION: e.target.value,
                  })
                }
                rows="4"
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Reorder Level:</strong>
              <Input
                type="number"
                value={editedProduct.PROD_RO_LEVEL}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    PROD_RO_LEVEL: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Reorder Quantity:</strong>
              <Input
                type="number"
                value={editedProduct.PROD_RO_QTY}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    PROD_RO_QTY: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Quantity on Hand:</strong>
              <Input
                type="number"
                value={editedProduct.PROD_QOH}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    PROD_QOH: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
          </Details>
          <ButtonGroup>
            <Button variant="red" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Section>
            <Image src={product.PROD_IMAGE} alt={product.PROD_NAME} />
            <Detail>
              <DetailLabel>Name:</DetailLabel> {product.PROD_NAME}
            </Detail>
            <Detail>
              <DetailLabel>Category:</DetailLabel> {category.PROD_CAT_NAME}
            </Detail>
            <Detail>
              <DetailLabel>Size:</DetailLabel> {productDetail.PROD_DETAILS_SIZE}
            </Detail>
            <Detail>
              <DetailLabel>Brand:</DetailLabel>{" "}
              {productDetail.PROD_DETAILS_BRAND}
            </Detail>
            <Detail>
              <DetailLabel>Price:</DetailLabel> ₱
              {productDetail.PROD_DETALS_PRICE}
            </Detail>
            <Detail>
              <DetailLabel>Description:</DetailLabel>{" "}
              {productDetail.PROD_DETAILS_DESCRIPTION}
            </Detail>
            <Detail>
              <DetailLabel>Reorder Level:</DetailLabel> {product.PROD_RO_LEVEL}
            </Detail>
            <Detail>
              <DetailLabel>Reorder Quantity:</DetailLabel> {product.PROD_RO_QTY}
            </Detail>
            <Detail>
              <DetailLabel>Quantity on Hand:</DetailLabel> {product.PROD_QOH}
            </Detail>
            <Detail>
              <DetailLabel>Date Created:</DetailLabel>{" "}
              {product.PROD_DATECREATED}
            </Detail>
            <Detail>
              <DetailLabel>Date Updated:</DetailLabel>{" "}
              {product.PROD_DATEUPDATED}
            </Detail>
          </Section>

          <ButtonGroup>
            <Button variant="red" onClick={handleRemove}>
              Remove
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Edit Details
            </Button>
          </ButtonGroup>
        </>
      )}
    </Modal>
  );
};

// Styled Components

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align to the left */
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const ImageInput = styled.input`
  margin-top: 10px;
`;

const Details = styled.div`
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align to the left */
`;

const Detail = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Input = styled.input`
  border: ${(props) => (props.border ? "1px solid #ddd" : "none")};
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
