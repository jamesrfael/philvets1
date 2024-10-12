import React, { useState } from "react";
import Modal from "../Layout/Modal";
import styled from "styled-components";
import Button from "../Layout/Button";

const AddCustomerModal = ({ onClose, onAdd }) => {
  const [clientName, setClientName] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientProvince, setClientProvince] = useState("");
  const [clientPhoneNum, setClientPhoneNum] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const handleAddCustomer = () => {
    if (
      clientName &&
      clientCity &&
      clientProvince &&
      clientPhoneNum &&
      clientEmail
    ) {
      const newClient = {
        CLIENT_NAME: clientName,
        CLIENT_CITY: clientCity,
        CLIENT_PROVINCE: clientProvince,
        CLIENT_PHONENUM: clientPhoneNum,
        CLIENT_EMAIL: clientEmail,
      };
      onAdd(newClient);
      onClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Modal title="Add New Client" onClose={onClose}>
      <Form>
        <Label>Client Name</Label>
        <Input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <Label>City</Label>
        <Input
          type="text"
          value={clientCity}
          onChange={(e) => setClientCity(e.target.value)}
        />
        <Label>Province</Label>
        <Input
          type="text"
          value={clientProvince}
          onChange={(e) => setClientProvince(e.target.value)}
        />
        <Label>Phone Number</Label>
        <Input
          type="text"
          value={clientPhoneNum}
          onChange={(e) => setClientPhoneNum(e.target.value)}
        />
        <Label>Email</Label>
        <Input
          type="email"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
        />
        <ButtonGroup>
          <Button variant="red" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCustomer}>
            Add Client
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
