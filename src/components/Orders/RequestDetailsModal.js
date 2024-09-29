import React from 'react';
import Modal from "../Layout/Modal";
import styled from 'styled-components';

const RequestDetailsModal = ({ request, onClose }) => {
  if (!request) return null;

  return (
    <Modal title="Request Details" onClose={onClose}>
      <Section>
        <p><strong>Client Name:</strong> {request.requestBy}</p>
        <p><strong>Request Date:</strong> {request.requestDate}</p>
        <p><strong>Description:</strong> {request.description}</p>
      </Section>
      <Section>
        <h3>Products</h3>
        <Table>
          <thead>
            <tr>
              <TableHeader>Product Name</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Total</TableHeader>
            </tr>
          </thead>
          <tbody>
            {request.requestDetails.map((detail, index) => (
              <TableRow key={index}>
                <TableCell>{detail.productName}</TableCell>
                <TableCell>{formatCurrency(detail.price)}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>{formatCurrency(detail.price * detail.quantity)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <TotalSection>
          <TotalRow>
            <TotalLabel>Total Quantity:</TotalLabel>
            <TotalValue>{request.requestDetails.reduce((sum, detail) => sum + detail.quantity, 0)}</TotalValue>
          </TotalRow>
          <TotalRow>
            <TotalLabel>Total Amount:</TotalLabel>
            <TotalValue>{formatCurrency(request.requestDetails.reduce((sum, detail) => sum + (detail.price * detail.quantity), 0))}</TotalValue>
          </TotalRow>
        </TotalSection>
      </Section>
    </Modal>
  );
};

// Styled Components
const Section = styled.div`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #007bff;
  color: white;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
`;

const TotalSection = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const TotalRow = styled.div`
  margin-bottom: 8px;
`;

const TotalLabel = styled.span`
  font-weight: bold;
`;

const TotalValue = styled.span`
  margin-left: 8px;
  font-weight: bold;
  color: green;
`;

export default RequestDetailsModal;
