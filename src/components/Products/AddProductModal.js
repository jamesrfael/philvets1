import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import { IoCloseCircle } from "react-icons/io5";
import Button from "../Layout/Button";

const AddProductModal = ({ onClose, onSave }) => {
  const [productName, setProductName] = useState("");
  const [detailsCode, setDetailsCode] = useState("");
  const [roLevel, setRoLevel] = useState("");
  const [roQty, setRoQty] = useState("");
  const [qoh, setQoh] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [measurement, setMeasurement] = useState("");
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleSave = () => {
    const newProduct = {
      PROD_ID: `P00${Math.floor(Math.random() * 1000)}`, // Example ID, should be unique
      PROD_NAME: productName,
      PROD_DETAILS_CODE: detailsCode,
      PROD_RO_LEVEL: parseInt(roLevel),
      PROD_RO_QTY: parseInt(roQty),
      PROD_QOH: parseInt(qoh),
      PROD_IMG: "", // You might want to handle image upload separately
      PROD_DATECREATED: new Date().toISOString().split("T")[0],
      PROD_DATEUPDATED: new Date().toISOString().split("T")[0],
      PROD_CAT_CODE: categoryCode,
    };

    const newProductDetails = {
      PROD_DETAILS_CODE: detailsCode,
      PROD_DETAILS_DESCRIPTION: description,
      PROD_DETALS_PRICE: parseFloat(price),
      PROD_DETAILS_BRAND: brand,
      PROD_DETAILS_SIZE: size,
      PROD_DETAILS_MEASUREMENT: measurement,
      PROD_CAT_CODE: categoryCode,
    };

    onSave(newProduct, newProductDetails);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <ModalHeader>
          <h2>Add Product</h2>
          <CloseButton onClick={onClose}>
            <IoCloseCircle />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <Field>
            <Label>Product Name</Label>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
            />
          </Field>
          <Field>
            <Label>Details Code</Label>
            <Input
              value={detailsCode}
              onChange={(e) => setDetailsCode(e.target.value)}
              placeholder="Enter details code"
            />
          </Field>
          <Field>
            <Label>RO Level</Label>
            <Input
              type="number"
              value={roLevel}
              onChange={(e) => setRoLevel(e.target.value)}
              placeholder="Enter RO level"
            />
          </Field>
          <Field>
            <Label>RO Qty</Label>
            <Input
              type="number"
              value={roQty}
              onChange={(e) => setRoQty(e.target.value)}
              placeholder="Enter RO quantity"
            />
          </Field>
          <Field>
            <Label>Quantity on Hand (QOH)</Label>
            <Input
              type="number"
              value={qoh}
              onChange={(e) => setQoh(e.target.value)}
              placeholder="Enter quantity on hand"
            />
          </Field>
          <Field>
            <Label>Category Code</Label>
            <Input
              value={categoryCode}
              onChange={(e) => setCategoryCode(e.target.value)}
              placeholder="Enter category code"
            />
          </Field>
          <Field>
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </Field>
          <Field>
            <Label>Price</Label>
            <Input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </Field>
          <Field>
            <Label>Brand</Label>
            <Input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter brand"
            />
          </Field>
          <Field>
            <Label>Size</Label>
            <Input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Enter size"
            />
          </Field>
          <Field>
            <Label>Measurement</Label>
            <Input
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
              placeholder="Enter measurement"
            />
          </Field>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button variant="red" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Add Category
            </Button>
          </ButtonGroup>
        </ModalFooter>
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
  overflow: auto;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
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
  color: ${colors.red};
`;

const ModalBody = styled.div``;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export default AddProductModal;
