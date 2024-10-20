import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import OrderDetailsModal from "../../components/Orders/OrderDetailsModal";
import AddCustomerOrderModal from "../../components/Orders/Customer Order/AddCustomerOrderModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalOrders from "../../components/CardsData/CardTotalOrders";
import Button from "../../components/Layout/Button"; // Import the Button component
import { orders as initialOrders } from "../../data/OrderData";
import { FaPlus } from "react-icons/fa";

const StaffOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingSales, setIsAddingSales] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      order.orderType.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.orderDate.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.purchaseOrderStatus?.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.salesOrderStatus?.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.clientId?.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
      order.supplierId?.toString().toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const openDetailsModal = (order) => setSelectedOrder(order);
  const closeDetailsModal = () => setSelectedOrder(null);

  const openAddCustomerOrderModal = () => setIsAddingSales(true);
  const closeAddCustomerOrderModal = () => setIsAddingSales(false);

  const handleSaveNewOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const headers = ["Order Type", "Order Date", "Status", "Action"];

  const rows = filteredOrders.map((order, index) => [
    order.orderType,
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
          placeholder="Search / Filter order..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledButton onClick={openAddCustomerOrderModal}>
          <FaPlus className="icon" /> Customer Order
        </StyledButton>
      </Controls>
      <AnalyticsContainer>
        <CardTotalOrders isAdmin={true} />
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeDetailsModal} />
      )}
      {isAddingSales && (
        <AddCustomerOrderModal
          onClose={closeAddCustomerOrderModal}
          onSave={handleSaveNewOrder}
        />
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

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
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
