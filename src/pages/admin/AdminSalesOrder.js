import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import OrderDetailsModal from "../../components/Orders/OrderDetailsModal";
import AddSalesModal from "../../components/Orders/AddSalesModal"; // Import AddSalesModal
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalSalesOrder from "../../components/CardsData/CardTotalSalesOrder"; // Replaced Card
import Button from "../../components/Layout/Button"; // Import the Button component
import { orders as initialOrders } from "../../pages/data/OrderData";
import { FaPlus } from "react-icons/fa";

const AdminSalesOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingSalesOrder, setIsAddingSalesOrder] = useState(false);

  // Filter Sales Orders and apply search term
  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      order.orderType === "Sales Order" && // Ensure only Sales Orders are shown
      (order.clientName?.toLowerCase().includes(lowerCaseSearchTerm) || // Now using clientName
        order.orderDate.toLowerCase().includes(lowerCaseSearchTerm) ||
        order.salesOrderStatus?.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  const openDetailsModal = (order) => setSelectedOrder(order);
  const closeDetailsModal = () => setSelectedOrder(null);

  const openAddSalesModal = () => setIsAddingSalesOrder(true); // Open modal function
  const closeAddSalesModal = () => setIsAddingSalesOrder(false); // Close modal function

  // Update headers to include "Client ID"
  const headers = ["Client", "Order Date", "Status", "Action"];

  const rows = filteredOrders.map((order) => [
    order.clientName, // Show clientName
    order.orderDate,
    <Status status={order.salesOrderStatus}>{order.salesOrderStatus}</Status>,
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
        <StyledButton onClick={openAddSalesModal}>
          <FaPlus className="icon" /> Sales Order
        </StyledButton>
      </Controls>
      <AnalyticsContainer>
        <div onClick={() => navigate("/admin/orders/sales-order")}>
          <CardTotalSalesOrder /> {/* Changed to PurchaseOrder Card */}
        </div>
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeDetailsModal} />
      )}
      {isAddingSalesOrder && (
        <AddSalesModal onClose={closeAddSalesModal} />
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
    props.status === "Approved" ||
    props.status === "Received" ||
    props.status === "Delivered"
      ? "#1DBA0B"
      : props.status === "Shipped"
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

export default AdminSalesOrder;
