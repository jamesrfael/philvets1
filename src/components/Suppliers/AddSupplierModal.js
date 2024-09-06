import React, { useState } from "react";
import Modal from "../Layout/Modal"; // Assuming you already have a reusable Modal component
import styled from "styled-components";
import Button from "../Layout/Button";

const AddSupplierModal = ({ onClose, onAdd }) => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierNumber, setSupplierNumber] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonNumber, setContactPersonNumber] = useState("");

  const handleAddSupplier = () => {
    // Validate input before adding supplier
    if (supplierName && supplierNumber && contactPersonName && contactPersonNumber) {
      const newSupplier = {
        supplierName,
        supplierNumber,
        contactPersonName,
        contactPersonNumber,
      };
      onAdd(newSupplier); // Pass the new supplier data to parent
      onClose(); // Close the modal after adding supplier
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <Modal title="Add New Supplier" onClose={onClose}>
      <Form>
        <Label>Supplier Name</Label>
        <Input
          type="text"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          placeholder="Enter supplier name"
        />
        <Label>Supplier Number</Label>
        <Input
          type="text"
          value={supplierNumber}
          onChange={(e) => setSupplierNumber(e.target.value)}
          placeholder="Enter supplier number"
        />
        <Label>Contact Person Name</Label>
        <Input
          type="text"
          value={contactPersonName}
          onChange={(e) => setContactPersonName(e.target.value)}
          placeholder="Enter contact person name"
        />
        <Label>Contact Person Number</Label>
        <Input
          type="text"
          value={contactPersonNumber}
          onChange={(e) => setContactPersonNumber(e.target.value)}
          placeholder="Enter contact person number"
        />
        <ButtonGroup>
          <Button onClick={handleAddSupplier}>Add Supplier</Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

// Styled Components
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export default AddSupplierModal;
