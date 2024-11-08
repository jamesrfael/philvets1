// SupplierDeliveryDetails.js
import React from "react";
import styled from "styled-components";
import Modal from "../../Layout/Modal";
import { colors } from "../../../colors";
import Button from "../../Layout/Button";

const SupplierDeliveryDetails = ({ delivery, deliveryDetails, onClose }) => {
  const calculateTotalQuantity = () => {
    return deliveryDetails.reduce(
      (total, item) => total + item.INBOUND_DEL_DETAIL_QTY_DLVRD,
      0
    );
  };

  return (
    <Modal
      data-cy="inbound-delivery-details-modal"
      title="Inbound Delivery Details"
      status={delivery.INBOUND_DEL_STATUS}
      onClose={onClose}
    >
      <DetailsContainer>
        <Column>
          <FormGroup>
            <Label>Delivery ID:</Label>
            <Value>{delivery.INBOUND_DEL_ID}</Value>
          </FormGroup>
          <FormGroup>
            <Label>Received Date:</Label>
            <Value>{delivery.INBOUND_DEL_DATE_RCVD}</Value>
          </FormGroup>
          <FormGroup>
            <Label>Status:</Label>
            <Value>{delivery.INBOUND_DEL_STATUS}</Value>
          </FormGroup>
          <FormGroup>
            <Label>Supplier ID:</Label>
            <Value>{delivery.SUPPLIER_ID}</Value>
          </FormGroup>
        </Column>
        <Column>
          <FormGroup>
            <Label>Total Quantity:</Label>
            <Value>{calculateTotalQuantity()}</Value>
          </FormGroup>
          <FormGroup>
            <Label>Created By User ID:</Label>
            <Value>{delivery.INBOUND_DEL_CREATED_USER_ID}</Value>
          </FormGroup>
        </Column>
      </DetailsContainer>

      <ProductTable>
        <thead>
          <tr>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Quantity Delivered</TableHeader>
            <TableHeader>Expiry Date</TableHeader>
          </tr>
        </thead>
        <tbody>
          {deliveryDetails.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.PROD_NAME}</TableCell>
              <TableCell>{item.INBOUND_DEL_DETAIL_QTY_DLVRD}</TableCell>
              <TableCell>{item.INBOUND_DEL_DETAIL_EXPIRY_DATE}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </ProductTable>

      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
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

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export default SupplierDeliveryDetails;
