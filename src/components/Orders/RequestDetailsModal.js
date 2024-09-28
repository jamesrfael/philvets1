import React from 'react';
import styled from 'styled-components';
import Modal from "../Layout/Modal";

const RequestDetailsModal = ({ request, onClose }) => {
  if (!request) return null;

  const totalQuantity = request.orderDetails.reduce(
    (total, detail) => total + detail.quantity,
    0
  );

  // Assuming prices are handled in the future
  const totalAmount = request.orderDetails.reduce((total, detail) => {
    const price = 0; // Placeholder for the future price logic
    return total + price * detail.quantity;
  }, 0);

  return (
    <Modal
      title="Request Details"
      status={request.status}
      completedDate={request.requestDate}
      onClose={onClose}
    >
      <Section>
        <p><strong>Client Name:</strong> {request.requestBy}</p>
        <p><strong>Request Date:</strong> {request.requestDate}</p>
        <p><strong>Delivery Date Expected:</strong> {request.deliveryDateExpected || "N/A"}</p> {/* Added delivery date */}
        <p><strong>Description:</strong> {request.description || "N/A"}</p>
      </Section>

      <Section>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>Product Name</TableHeader>
                <TableHeader>Quantity</TableHeader>
              </tr>
            </thead>
            <tbody>
              {request.orderDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.productName}</TableCell>
                  <TableCell>{detail.quantity}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
        <TotalSummary>
          <p><strong>Total Quantity:</strong> {totalQuantity}</p>
          {/* Uncomment when you implement price logic */}
          {/* <p><strong>Total Amount:</strong> {formatCurrency(totalAmount)}</p> */}
        </TotalSummary>
      </Section>
    </Modal>
  );
};

// Styled Components
const Section = styled.div`
  margin-bottom: 20px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #1DBA0B;
  color: white;
  padding: 12px;
  text-align: center;
  font-size: 16px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  text-align: center;
  padding: 8px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
`;

const TotalSummary = styled.div`
  margin-top: 20px;
  text-align: right;
`;

export default RequestDetailsModal;
