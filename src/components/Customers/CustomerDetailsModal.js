// src/components/CustomerDetailsModal.js
import React, { useState } from "react";
import Modal from "../Layout/Modal"; // Ensure the path to Modal is correct
import styled from "styled-components";
import Button from "../Layout/Button"; // Import the Button component

const CustomerDetailsModal = ({ customer, onClose, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);

  if (!customer) return null;

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const confirmSave = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (confirmSave) {
      // Implement save logic here
      alert("Customer details saved");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to discard the changes?"
    );
    if (confirmCancel) {
      setIsEditing(false);
      setEditedCustomer(customer);
    }
  };

  const handleRemove = () => {
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this customer?"
    );
    if (confirmRemoval) {
      onRemove(customer.customerId); // Call the remove callback with the customer ID
      onClose(); // Close the modal after removal
    }
  };

  return (
    <Modal
      title={
        isEditing
          ? `Edit ${customer.firstName} ${customer.lastName}`
          : `Customer Details`
      }
      onClose={onClose}
    >
      {isEditing ? (
        <>
          <Details>
            <DetailItem>
              <strong>First Name:</strong>
              <Input
                type="text"
                value={editedCustomer.firstName}
                onChange={(e) =>
                  setEditedCustomer({
                    ...editedCustomer,
                    firstName: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Last Name:</strong>
              <Input
                type="text"
                value={editedCustomer.lastName}
                onChange={(e) =>
                  setEditedCustomer({
                    ...editedCustomer,
                    lastName: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Email:</strong>
              <Input
                type="email"
                value={editedCustomer.email}
                onChange={(e) =>
                  setEditedCustomer({
                    ...editedCustomer,
                    email: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Phone:</strong>
              <Input
                type="tel"
                value={editedCustomer.phone}
                onChange={(e) =>
                  setEditedCustomer({
                    ...editedCustomer,
                    phone: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Registration Date:</strong>
              <Input
                type="text"
                value={editedCustomer.registrationDate}
                onChange={(e) =>
                  setEditedCustomer({
                    ...editedCustomer,
                    registrationDate: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
          </Details>
          <ButtonGroup>
            <Button variant="fail" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Edit
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Section>
            <Detail>
              <DetailLabel>First Name:</DetailLabel> {customer.firstName}
            </Detail>
            <Detail>
              <DetailLabel>Last Name:</DetailLabel> {customer.lastName}
            </Detail>
            <Detail>
              <DetailLabel>Email:</DetailLabel> {customer.email}
            </Detail>
            <Detail>
              <DetailLabel>Phone:</DetailLabel> {customer.phone}
            </Detail>
            <Detail>
              <DetailLabel>Registration Date:</DetailLabel>{" "}
              {customer.registrationDate}
            </Detail>
          </Section>

          <ButtonGroup>
            <Button variant="fail" onClick={handleRemove}>
              Remove
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Edit
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
  align-items: flex-start;
`;

const Details = styled.div`
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  justify-content: flex-end;
  gap: 10px;
`;

const Input = styled.input`
  border: ${(props) => (props.border ? "1px solid #ddd" : "none")};
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export default CustomerDetailsModal;
