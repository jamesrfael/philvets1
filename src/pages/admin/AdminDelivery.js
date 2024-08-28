import React, { useState } from "react";
import LayoutHS from "../../components/Layout/LayoutHS";
import styled from "styled-components";
import DeliveryDetailsModal from "../../components/AdminDelivery/DeliveryDetailsModal";
import { colors } from "../../colors";
import { deliveries } from "../data/DeliveryData";
import SearchBar from "../../components/Layout/SearchBar"; // Import the reusable SearchBar component
import Table from "../../components/Layout/Table"; // Import the reusable Table component

const AdminDelivery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const filteredDeliveries = deliveries.filter((delivery) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      delivery.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.date.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const calculateTotalQuantity = (orderDetails) =>
    orderDetails.reduce((sum, item) => sum + item.quantity, 0);

  const calculateTotalAmount = (orderDetails) =>
    orderDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const openDetailsModal = (delivery) =>
    setSelectedDelivery({
      ...delivery,
      totalQuantity: calculateTotalQuantity(delivery.orderDetails),
      totalAmount: calculateTotalAmount(delivery.orderDetails),
    });

  const closeDetailsModal = () => setSelectedDelivery(null);

  const headers = ["Name", "Order Date", "Type", "Status", "Action"];

  const rows = filteredDeliveries.map((delivery) => [
    delivery.name,
    delivery.date,
    delivery.type,
    <Status status={delivery.status}>{delivery.status}</Status>,
    <ActionButton onClick={() => openDetailsModal(delivery)}>
      Details
    </ActionButton>,
  ]);

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search delivery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <Table headers={headers} rows={rows} />
      {selectedDelivery && (
        <DeliveryDetailsModal
          delivery={selectedDelivery}
          onClose={closeDetailsModal}
        />
      )}
    </LayoutHS>
  );
};

// Styled components

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const Status = styled.span`
  background-color: ${(props) =>
    props.status === "Completed"
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

export default AdminDelivery;
