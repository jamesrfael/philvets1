import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import OrderDetailsModal from "../../components/Orders/OrderDetailsModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalOrders from "../../components/CardsData/CardTotalOrders";
import Button from "../../components/Layout/Button"; // Import the Button component
import { orders as initialOrders } from "../data/OrderData";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      order.ORDER_TYPE.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.ORDER_DATACREATED.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.ORDER_STATUS?.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.CLIENT_ID?.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
      order.SUPPLIER_ID?.toString().toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const openDetailsModal = (order) => setSelectedOrder(order);
  const closeDetailsModal = () => setSelectedOrder(null);

  const headers = ["Order Type", "Order Date", "Status", "Action"];

  const rows = filteredOrders.map((order) => [
    order.ORDER_TYPE,
    order.ORDER_DATACREATED,
    <Status status={order.ORDER_STATUS}>{order.ORDER_STATUS}</Status>,
    <Button onClick={() => openDetailsModal(order)} fontSize="14px">
      Details
    </Button>,
  ]);

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter order..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <AnalyticsContainer>
        <div onClick={() => navigate("/admin/orders")}>
          <CardTotalOrders />
        </div>
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeDetailsModal} />
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

export default AdminOrders;
