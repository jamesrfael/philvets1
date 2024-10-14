import React, { useState } from "react";
import Modal from "../Layout/Modal";
import styled from "styled-components";
import Button from "../Layout/Button";

const AddCustomerModal = ({ onClose, onAdd }) => {
  const [clientName, setClientName] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientProvince, setClientProvince] = useState("");
  const [clientPhoneNum, setClientPhoneNum] = useState("");

  const handleAddCustomer = () => {
    if (clientName && clientCity && clientProvince && clientPhoneNum) {
      const newClient = {
        CLIENT_NAME: clientName,
        CLIENT_CITY: clientCity,
        CLIENT_PROVINCE: clientProvince,
        CLIENT_PHONENUM: clientPhoneNum,
      };
      onAdd(newClient);
      onClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Modal title="Add New Customer" onClose={onClose}>
      <Form>
        <Label>Customer Name</Label>
        <Input
          type="text"
          placeholder="Enter Customer Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <Label>Location</Label>
        <LocationContainer>
          <CityInput
            type="text"
            placeholder="City"
            value={clientCity}
            onChange={(e) => setClientCity(e.target.value)}
          />
          <ProvinceInput
            type="text"
            placeholder="Province"
            value={clientProvince}
            onChange={(e) => setClientProvince(e.target.value)}
          />
        </LocationContainer>
        <Label>Phone Number</Label>
        <Input
          type="text"
          placeholder="Enter Phone Number"
          value={clientPhoneNum}
          onChange={(e) => setClientPhoneNum(e.target.value)}
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

const LocationContainer = styled.div`
  display: flex;
  gap: 10px; /* Space between city and province */
`;

const CityInput = styled(Input)`
  flex: 1; /* Allows the city input to take available space */
`;

const ProvinceInput = styled(Input)`
  flex: 1; /* Allows the province input to take available space */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export default AddCustomerModal;
