import React, { useState } from "react";
import LayoutHS from "../../components/Layout/LayoutHS";
import styled from "styled-components";
import DeliveryDetailsModal from "../../components/AdminDelivery/DeliveryDetailsModal";
import { colors } from "../../colors";
import { deliveries } from "../data/DeliveryData";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalDelivery from "../../components/CardsData/CardTotalDelivery"; // Import CardTotalDelivery

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

  const calculateTotalQuantity = (deliveries) =>
    deliveries.reduce(
      (total, delivery) =>
        total + delivery.orderDetails.reduce((sum, item) => sum + item.quantity, 0),
      0
    );

  const calculateTotalAmount = (deliveries) =>
    deliveries.reduce(
      (total, delivery) =>
        total +
        delivery.orderDetails.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      0
    );

  const openDetailsModal = (delivery) =>
    setSelectedDelivery({
      ...delivery,
      totalQuantity: calculateTotalQuantity([delivery]),
      totalAmount: calculateTotalAmount([delivery]),
    });

  const closeDetailsModal = () => setSelectedDelivery(null);

  const headers = ["Name", "Order Date", "Type", "Status", "Action"];

  const rows = filteredDeliveries.map((delivery) => [
    delivery.name,
    delivery.date,
    delivery.type,
    <Status status={delivery.status}>{delivery.status}</Status>,
    <ActionButton onClick={() => openDetailsModal(delivery)}>Details</ActionButton>,
  ]);

  const totalDeliveries = deliveries.length; // Use original deliveries array

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search delivery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <SummarySection>
        <CardTotalDelivery totalDeliveries={totalDeliveries} /> {/* Use the new card component */}
      </SummarySection>
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
  padding: 0 1px;
`;

const SummarySection = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
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
