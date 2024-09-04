import React, { useState } from "react";
import StaffLayoutHS from "../../components/Layout/StaffLayoutHS";
import styled from "styled-components";
import OrderDetailsModal from "../../components/Orders/OrderDetailsModal";
import AddSalesModal from "../../components/Orders/AddSalesModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalOrders from "../../components/CardsData/CardTotalOrders";
import Button from "../../components/Layout/Button"; // Import the Button component
import { orders as initialOrders } from "../../pages/data/OrderData";

const StaffOrders = () => {
  const [orders, setOrders] = useState(
    initialOrders.filter(order => order.orderType === "Sales Order")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingSales, setIsAddingSales] = useState(false);

  const filteredOrders = orders.filter((order) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        order.orderDate.toLowerCase().includes(lowerCaseSearchTerm) ||
        order.salesOrderStatus?.toLowerCase().includes(lowerCaseSearchTerm) ||
        order.clientId?.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
        order.salesOrderId?.toString().toLowerCase().includes(lowerCaseSearchTerm)
      );
    });

  const openDetailsModal = (order) => setSelectedOrder(order);
  const closeDetailsModal = () => setSelectedOrder(null);

  const openAddSalesModal = () => setIsAddingSales(true);
  const closeAddSalesModal = () => setIsAddingSales(false);

  const handleSaveNewOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const headers = ["Order Type", "Order Date", "Status", "Action"];

  const rows = filteredOrders.map((order, index) => [
    order.orderType,
    order.orderDate,
    <Status status={order.salesOrderStatus}>
      {order.salesOrderStatus}
    </Status>,
    <Button onClick={() => openDetailsModal(order)} fontSize="14px">
      Details
    </Button>,
  ]);

  return (
    <StaffLayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search order..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup>
          <Button onClick={openAddSalesModal}>Add Sales</Button>
        </ButtonGroup>
      </Controls>
      <AnalyticsContainer>
        <CardTotalOrders totalOrders={filteredOrders.length} />
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeDetailsModal} />
      )}
      {isAddingSales && (
        <AddSalesModal
          onClose={closeAddSalesModal}
          onSave={handleSaveNewOrder}
        />
      )}
    </StaffLayoutHS>
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

const ButtonGroup = styled.div`
  display: flex;
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

export default StaffOrders;
