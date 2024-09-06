import React, { useState } from "react";
import Modal from "../Layout/Modal"; // Reusable Modal component
import styled from "styled-components";
import Button from "../Layout/Button";

const AddCustomerModal = ({ onClose, onAdd }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleAddCustomer = () => {
    if (firstName && lastName && email && phone) {
      const newCustomer = { firstName, lastName, email, phone };
      onAdd(newCustomer);
      onClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Modal title="Add New Customer" onClose={onClose}>
      <Form>
        <Label>First Name</Label>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Label>Last Name</Label>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>Phone</Label>
        <Input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <ButtonGroup>
          <Button onClick={handleAddCustomer}>Add Customer</Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

// Styled components
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

export default AddCustomerModal;
