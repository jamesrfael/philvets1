import React from "react";
import styled from "styled-components";
import Modal from "../Layout/Modal"; // Importing the reusable Modal component
import { colors } from "../../colors";

// Utility function to format numbers as currency
const formatCurrency = (amount) => {
  return `₱${amount.toFixed(2)}`;
};

const DeliveryDetailsModal = ({ delivery = {}, onClose }) => {
  const calculateSubTotal = () => {
    if (!delivery.orderDetails) return 0;
    return delivery.orderDetails.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const calculateTotalAfterDiscount = () => {
    const subTotal = calculateSubTotal();
    if (!delivery.discount) return subTotal;
    if (typeof delivery.discount === "string" && delivery.discount.includes("%")) {
      const discountPercentage = parseFloat(delivery.discount) / 100;
      return subTotal - subTotal * discountPercentage;
    } else {
      return subTotal - parseFloat(delivery.discount);
    }
  };

  const calculateTotalQuantity = () => {
    if (!delivery.orderDetails) return 0;
    return delivery.orderDetails.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  return (
    <Modal
      title="Delivery Details"
      status={delivery.status}
      completedDate={delivery.completedDate}
      onClose={onClose}
    >
      <DetailsContainer>
        <Column align="left">
          <FormGroup>
            <Label>Name:</Label>
            <Value>{delivery.name || ""}</Value>
          </FormGroup>
          <FormGroup>
            <Label>Date:</Label>
            <Value>{delivery.date || ""}</Value>
          </FormGroup>
          <FormGroup>
            <Label>Type:</Label>
            <Value>{delivery.type || ""}</Value>
          </FormGroup>
        </Column>
      </DetailsContainer>

      <FormGroup>
        <DescriptionBox>
          <p>{delivery.description || "No description available."}</p>
        </DescriptionBox>
      </FormGroup>

      <ProductTable>
        <thead>
          <tr>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Price</TableHeader>
          </tr>
        </thead>
        <tbody>
          {(delivery.orderDetails || []).map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.productName || ""}</TableCell>
              <TableCell>{item.quantity || 0}</TableCell>
              <TableCell>{formatCurrency(item.price || 0)}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </ProductTable>

      <FormSection>
        <FormGroup>
          <Label>Order Sub Total:</Label>
          <Value>{formatCurrency(calculateSubTotal())}</Value>
        </FormGroup>
        <FormGroup>
          <Label>Total Quantity:</Label>
          <Value>{calculateTotalQuantity()}</Value>
        </FormGroup>
        <FormGroup>
          <Label>Discount:</Label>
          <Discount>{delivery.discount || ""}</Discount>
        </FormGroup>
        <FormGroup>
          <Label>Order Total:</Label>
          <Total>{formatCurrency(calculateTotalAfterDiscount())}</Total>
        </FormGroup>
      </FormSection>
    </Modal>
  );
};

// Styled components

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Column = styled.div`
  width: 48%;
  text-align: ${(props) => props.align || "left"};
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Label = styled.div`
  font-weight: bold;
  color: black;
`;

const Value = styled.div`
  color: ${colors.text};
`;

const Discount = styled.div`
  color: #ff5757;
  font-weight: bold;
`;

const Total = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #1dba0b;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: ${colors.primary};
  color: white;
  padding: 10px;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const FormSection = styled.div`
  margin-top: 20px;
`;

const DescriptionBox = styled.div`
  border: 1px solid #3b3b3bf7;
  border-radius: 4px;
  padding: 10px;
  max-height: 100px;
  overflow-y: auto;
  width: 100%;
  text-align: left;
  background: #f9f9f9;
`;

export default DeliveryDetailsModal;
