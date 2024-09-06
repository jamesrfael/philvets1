import React from 'react';
import styled from 'styled-components';
import Modal from "../Layout/Modal";
import { colors } from '../../colors'; // Ensure the path to colors is correct

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const formatCurrency = (amount) => `₱${amount.toFixed(2)}`;

  // Calculate totals
  const totalQuantity = (order.purchaseOrderDetails || order.salesOrderDetails).reduce(
    (total, detail) => total + (detail.purchOrderQty || detail.salesOrderQty || 0),
    0
  );
  const totalAmount = (order.purchaseOrderDetails || order.salesOrderDetails).reduce(
    (total, detail) => total + (detail.purchOrderLineTotal || detail.salesOrderLineTotal || 0),
    0
  );

  return (
    <Modal
      title="Order Details"
      status={order.orderType === 'Purchase Order' ? order.purchaseOrderStatus : order.salesOrderStatus}
      completedDate={order.orderType === 'Purchase Order' ? order.purchaseOrderDate : order.salesOrderDate}
      onClose={onClose}
    >
      <Section>
        <p><strong>Order Date:</strong> {order.orderDate}</p>
        <p><strong>Order Type:</strong> {order.orderType}</p>
        {order.orderType === 'Purchase Order' ? (
          <>
            <p><strong>Purchase Order Date:</strong> {order.purchaseOrderDate}</p>
            <p><strong>Total Quantity:</strong> {order.purchaseOrderTotQty}</p>
            <p><strong>Total Amount:</strong> {formatCurrency(order.purchaseOrderTotal)}</p>
            <p><strong>Supplier ID:</strong> {order.supplierId}</p>
          </>
        ) : (
          <>
            <p><strong>Sales Order Date:</strong> {order.salesOrderDate}</p>
            <p><strong>Delivery Date:</strong> {order.salesOrderDlvryDate}</p>
            <p><strong>Total Quantity:</strong> {order.salesOrderTotQty}</p>
            <p><strong>Total Amount:</strong> {formatCurrency(order.salesOrderTotal)}</p>
            <p><strong>Discount:</strong> {formatCurrency(order.salesOrderDiscount)}</p>
            <p><strong>Delivery Option:</strong> {order.salesOrderDlvrOpt}</p>
            <p><strong>Client ID:</strong> {order.clientId}</p>
          </>
        )}
      </Section>
      <Section>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>Product Name</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Total</TableHeader>
              </tr>
            </thead>
            <tbody>
              {(order.purchaseOrderDetails || order.salesOrderDetails).map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.purchOrderProdName || detail.salesOrderProdName}</TableCell>
                  <TableCell>{detail.purchOrderDescription || detail.salesOrderDescription}</TableCell>
                  <TableCell>{detail.purchOrderQty || detail.salesOrderQty}</TableCell>
                  <TableCell>{formatCurrency(detail.purchOrderPrice || detail.salesOrderPrice)}</TableCell>
                  <TableCell>{formatCurrency(detail.purchOrderLineTotal || detail.salesOrderLineTotal)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
        <TotalSummary>
          <p><strong>Total Quantity:</strong> {totalQuantity}</p>
          <p><strong>Total Amount:</strong> <HighlightedTotal>{formatCurrency(totalAmount)}</HighlightedTotal></p>
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
  margin-top: 20px;
  text-align: right;
`;

const HighlightedTotal = styled.span`
  color: green;
  font-weight: bold;
  font-size: 16px;
`;

export default OrderDetailsModal;
