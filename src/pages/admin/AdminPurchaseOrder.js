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

const AdminPurchaseOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingPurchaseOrder, setIsAddingPurchaseOrder] = useState(false); // State for modal visibility

  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      order.clientId?.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
      order.orderDate.toLowerCase().includes(lowerCaseSearchTerm) ||
      (order.purchaseOrderStatus || order.salesOrderStatus)?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const openDetailsModal = (order) => setSelectedOrder(order);
  const closeDetailsModal = () => setSelectedOrder(null);

  const openAddPurchaseModal = () => setIsAddingPurchaseOrder(true); // Open modal function
  const closeAddPurchaseModal = () => setIsAddingPurchaseOrder(false); // Close modal function

  // Update headers to include "Client ID"
  const headers = ["Client ID", "Order Date", "Status", "Action"];

  // Update rows to map the correct data
  const rows = filteredOrders.map((order) => [
    order.clientId,
    order.orderDate,
    <Status status={order.purchaseOrderStatus || order.salesOrderStatus}>
      {order.purchaseOrderStatus || order.salesOrderStatus}
    </Status>,
    <Button onClick={() => openDetailsModal(order)} fontSize="14px">
      Details
    </Button>,
  ]);

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
      <Table headers={headers} rows={rows} />
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

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

export default AdminPurchaseOrder;
