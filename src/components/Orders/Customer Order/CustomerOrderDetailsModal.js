import React from "react";
import styled from "styled-components";
import Modal from "../../Layout/Modal"; // Assuming you have a modal component
import { colors } from "../../../colors"; // Ensure the path to colors is correct

const CustomerOrderDetailsModal = ({ order, onClose }) => {
  // Early return if order is not provided
  if (!order) return null;

  // Function to format currency values safely
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) {
      return "₱0.00"; // Default value if input is undefined or null
    }
    return `₱${amount.toFixed(2)}`; // Format to two decimal places
  };

  // Extract ORDER_DETAILS directly from the provided order
  const orderDetails = order.ORDER_DETAILS || [];

  // Calculate total quantity and total amount safely
  const totalQuantity = orderDetails.reduce(
    (total, detail) => total + (detail.SALES_ORDER_QTY || 0),
    0
  );
  const totalAmount = orderDetails.reduce(
    (total, detail) => total + (detail.SALES_ORDER_LINE_TOTAL || 0),
    0
  );

  return (
    <Modal
      title="Customer Order Details"
      status={order.SALES_ORDER_PYMNT_STAT}
      completedDate={order.SALES_ORDER_DATEUPDATED}
      onClose={onClose}
    >
      <Section>
        <p>
          <strong>Order ID:</strong> {order.SALES_ORDER_ID}
        </p>
        <p>
          <strong>Order Created Date:</strong> {order.SALES_ORDER_DATACREATED}
        </p>
        <p>
          <strong>Order Updated Date:</strong> {order.SALES_ORDER_DATEUPDATED}
        </p>
        <p>
          <strong>Delivery Date:</strong>{" "}
          {order.SALES_ORDER_DLVRY_DATE || "N/A"}
        </p>
        <p>
          <strong>Discount:</strong>{" "}
          {formatCurrency(order.SALES_ORDER_DISCOUNT || 0)}
        </p>
        <p>
          <strong>Delivery Option:</strong>{" "}
          {order.SALES_ORDER_DLVRY_OPT || "N/A"}
        </p>
        <p>
          <strong>Client ID:</strong> {order.CLIENT_ID}
        </p>
      </Section>
      <Section>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>Product Name</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Total</TableHeader>
              </tr>
            </thead>
            <tbody>
              {orderDetails.length > 0 ? (
                orderDetails.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell>{detail.SALES_ORDER_PROD_NAME || "Unknown Product"}</TableCell>
                    <TableCell>{detail.SALES_ORDER_QTY || 0}</TableCell>
                    <TableCell>{formatCurrency(detail.SALES_ORDER_PRICE || 0)}</TableCell>
                    <TableCell>{formatCurrency(detail.SALES_ORDER_LINE_TOTAL || 0)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No order details available.</TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        </TableWrapper>
        <TotalSummary>
          <TotalItem>
            <strong>Total Quantity:</strong> {totalQuantity}
          </TotalItem>
          <TotalItem>
            <strong>Total Amount:</strong>{" "}
            <HighlightedTotal>{formatCurrency(totalAmount)}</HighlightedTotal>
          </TotalItem>
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
  background-color: ${colors.primary};
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
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: flex-end; /* Align items to the right */
  margin-top: 20px;
  font-weight: bold;
`;

const TotalItem = styled.p`
  margin: 5px 0; /* Add some margin for spacing */
`;

const HighlightedTotal = styled.span`
  color: green; /* Highlight total amount in green */
  font-size: 16px;
`;

export default CustomerOrderDetailsModal;
