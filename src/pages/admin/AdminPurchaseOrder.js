import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import OrderDetailsModal from "../../components/Orders/OrderDetailsModal";
import AddPurchaseModal from "../../components/Orders/AddPurchaseModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalPurchaseOrder from "../../components/CardsData/CardTotalPurchaseOrder";
import Button from "../../components/Layout/Button";
import { orders as initialOrders } from "../../pages/data/OrderData";
import { FaPlus } from "react-icons/fa";
import { FaChevronUp, FaChevronDown } from "react-icons/fa"; // Import chevron icons

const AdminPurchaseOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingPurchaseOrder, setIsAddingPurchaseOrder] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'orderDate', direction: 'desc' }); // Default sorting set to Order Date

  // Filter Purchase Orders and apply search term
  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      order.orderType === "Purchase Order" && // Ensure only Purchase Orders are shown
      (order.supplierName?.toLowerCase().includes(lowerCaseSearchTerm) || // Now using supplierName
        order.orderDate.toLowerCase().includes(lowerCaseSearchTerm) ||
        order.purchaseOrderStatus?.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  // Sort filtered orders based on sortConfig
  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortConfig.key === "orderDate") {
      return (new Date(b.orderDate) - new Date(a.orderDate)) * (sortConfig.direction === 'asc' ? 1 : -1);
    }
    return a.supplierName.localeCompare(b.supplierName) * (sortConfig.direction === 'asc' ? 1 : -1);
  });

  const openDetailsModal = (order) => setSelectedOrder(order);
  const closeDetailsModal = () => setSelectedOrder(null);

  const openAddPurchaseModal = () => setIsAddingPurchaseOrder(true); // Open modal function
  const closeAddPurchaseModal = () => setIsAddingPurchaseOrder(false); // Close modal function

  // Update headers to include "Client ID"
  const headers = ["Supplier", "Order Date", "Status", "Action"];

  const rows = sortedOrders.map((order) => [
    order.supplierName, // Show supplierName
    order.orderDate,
    <Status status={order.purchaseOrderStatus}>
      {order.purchaseOrderStatus}
    </Status>,
    <Button onClick={() => openDetailsModal(order)} fontSize="14px">
      Details
    </Button>,
  ]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledButton onClick={openAddPurchaseModal}>
          <FaPlus className="icon" /> Purchase Order
        </StyledButton>
      </Controls>
      <AnalyticsContainer>
        <div onClick={() => navigate("/admin/orders/purchase-order")}>
          <CardTotalPurchaseOrder />
        </div>
      </AnalyticsContainer>
      <Table headers={headers.map((header, index) => (
        <TableHeader
          key={index}
          onClick={() => handleSort(header === "Order Date" ? 'orderDate' : 'supplierName')}
        >
          {header}
          {/* Display chevrons for Supplier and Order Date */}
          {(header === "Order Date" || header === "Supplier") && (
            <>
              {sortConfig.key === (header === "Order Date" ? 'orderDate' : 'supplierName') ? (
                sortConfig.direction === 'asc' ? (
                  <FaChevronUp style={{ marginLeft: '5px', fontSize: '12px' }} />
                ) : (
                  <FaChevronDown style={{ marginLeft: '5px', fontSize: '12px' }} />
                )
              ) : (
                <span style={{ opacity: 0.5 }}>
                  <FaChevronUp style={{ marginLeft: '5px', fontSize: '12px' }} />
                  <FaChevronDown style={{ marginLeft: '5px', fontSize: '12px' }} />
                </span>
              )}
            </>
          )}
        </TableHeader>
      ))} rows={rows} />
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeDetailsModal} />
      )}
      {isAddingPurchaseOrder && ( // Render the AddPurchaseModal
        <AddPurchaseModal onClose={closeAddPurchaseModal} />
      )}
    </MainLayout>
  );
};

// Styled Components
const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const Status = styled.span`
  background-color: ${(props) =>
    props.status === "Received"
      ? "#1DBA0B"  // Green
      : props.status === "Approved"
      ? "#00bbff"  // Blue
      : props.status === "Shipped"
      ? "#f08400"  // Amber/Orange
      : props.status === "Cancelled"
      ? "#F44336"  // Red
      : props.status === "Completed"
      ? "#1DBA0B"  // Purple
      : "gray"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

const TableHeader = styled.th`
  text-align: center; /* Center the header text */
  cursor: pointer; /* Change cursor to pointer */
  display: flex; /* Use flex to align items */
  justify-content: center; /* Center content */
  align-items: center; /* Center vertically */
`;

export default AdminPurchaseOrder;
