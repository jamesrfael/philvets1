import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoCloseCircle } from 'react-icons/io5';
import { colors } from '../../colors'; // Ensure the path to colors is correct

const OrderDetailsModal = ({ order, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const formatCurrency = (amount) => `₱${amount.toFixed(2)}`;

  if (!order) return null;

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
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <Header>
          <Title>Order Details</Title>
          <CloseButton onClick={onClose}>
            <IoCloseCircle />
          </CloseButton>
          <Status status={order.orderType === 'Purchase Order' ? order.purchaseOrderStatus : order.salesOrderStatus}>
            {order.orderType === 'Purchase Order' ? order.purchaseOrderStatus : order.salesOrderStatus}
          </Status>
        </Header>
        <Section>
          <h3>Order Summary</h3>
          <p><strong>Order Date:</strong> {order.orderDate}</p>
          <p><strong>Order Type:</strong> {order.orderType}</p>
          {order.orderType === 'Purchase Order' ? (
            <>
              <p><strong>Purchase Order Date:</strong> {order.purchaseOrderDate}</p>
              <p><strong>Status:</strong> {order.purchaseOrderStatus}</p>
              <p><strong>Total Quantity:</strong> {order.purchaseOrderTotQty}</p>
              <p><strong>Total Amount:</strong> {formatCurrency(order.purchaseOrderTotal)}</p>
              <p><strong>Supplier ID:</strong> {order.supplierId}</p>
            </>
          ) : (
            <>
              <p><strong>Sales Order Date:</strong> {order.salesOrderDate}</p>
              <p><strong>Delivery Date:</strong> {order.salesOrderDlvryDate}</p>
              <p><strong>Status:</strong> {order.salesOrderStatus}</p>
              <p><strong>Total Quantity:</strong> {order.salesOrderTotQty}</p>
              <p><strong>Total Amount:</strong> {formatCurrency(order.salesOrderTotal)}</p>
              <p><strong>Discount:</strong> {formatCurrency(order.salesOrderDiscount)}</p>
              <p><strong>Delivery Option:</strong> {order.salesOrderDlvrOpt}</p>
              <p><strong>Client ID:</strong> {order.clientId}</p>
            </>
          )}
        </Section>
        <Section>
          <h3>Product Details</h3>
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
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled Components

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.fail};
`;

const Status = styled.span`
  position: absolute;
  top: 70px; /* Adjusted to move below the close button */
  right: 20px;
  background-color: ${(props) =>
    props.status === "Approved" || props.status === "Received"
      ? "#1DBA0B"
      : props.status === "Pending"
      ? "#f08400"
      : props.status === "Cancelled"
      ? "#ff5757"
      : "gray"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

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