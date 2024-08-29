import React, { useState } from "react";
import LayoutHS from "../../components/Layout/LayoutHS";
import styled from "styled-components";
import OrderDetailsModal from "../../components/AdminOrders/OrderDetailsModal";
import AddPurchaseModal from "../../components/AdminOrders/AddPurchaseModal";
import AddSalesModal from "../../components/AdminOrders/AddSalesModal";
import SearchBar from "../../components/Layout/SearchBar"; // Import the new SearchBar component
import Table from "../../components/Layout/Table"; // Import the reusable Table component
import { colors } from "../../colors";
import { orders as initialOrders } from "../data/OrderData";

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingPurchase, setIsAddingPurchase] = useState(false);
  const [isAddingSales, setIsAddingSales] = useState(false);

  // Apply the filter based on searchTerm
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

  const openAddPurchaseModal = () => setIsAddingPurchase(true);
  const closeAddPurchaseModal = () => setIsAddingPurchase(false);

  const openAddSalesModal = () => setIsAddingSales(true);
  const closeAddSalesModal = () => setIsAddingSales(false);

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
    <ActionButton onClick={() => openDetailsModal(order)}>
      Details
    </ActionButton>,
  ]);

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search order..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup>
          <AddButton onClick={openAddPurchaseModal}>Ad Purchase</AddButton>
          <AddButton onClick={openAddSalesModal}>Add Sales</AddButton>
        </ButtonGroup>
      </Controls>
      <Table headers={headers} rows={rows} />
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeDetailsModal} />
      )}
      {isAddingPurchase && (
        <AddPurchaseModal
          onClose={closeAddPurchaseModal}
          onSave={handleSaveNewOrder}
        />
      )}
      {isAddingSales && (
        <AddSalesModal
          onClose={closeAddSalesModal}
          onSave={handleSaveNewOrder}
        />
      )}
    </LayoutHS>
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
  gap: 10px;
`;

const AddButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
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

const ActionButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminOrders;
