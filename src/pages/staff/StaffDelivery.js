import React, { useState } from "react";
import StaffLayoutHS from "../../components/Layout/StaffLayoutHS";
import styled from "styled-components";
import DeliveryDetailsModal from "../../components/Delivery/DeliveryDetailsModal";
import { colors } from "../../colors";
import { deliveries as initialDeliveries } from "../../pages/data/DeliveryData";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalDelivery from "../../components/CardsData/CardTotalDelivery";
import Button from "../../components/Layout/Button"; // Import the Button component

const StaffDelivery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // Filter deliveries initially to include only "Sales"
  const deliveries = initialDeliveries.filter(delivery => delivery.type === "Sales");

  const filteredDeliveries = deliveries.filter((delivery) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      delivery.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.date.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const openDetailsModal = (delivery) => setSelectedDelivery(delivery);
  const closeDetailsModal = () => setSelectedDelivery(null);

  const headers = ["Name", "Order Date", "Type", "Status", "Action"];

  const rows = filteredDeliveries.map((delivery) => [
    delivery.name,
    delivery.date,
    delivery.type,
    <Status status={delivery.status}>{delivery.status}</Status>,
    <Button
      backgroundColor={colors.primary}
      hoverColor={colors.primaryHover}
      onClick={() => openDetailsModal(delivery)}
    >
      Details
    </Button>,
  ]);

  return (
    <StaffLayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search delivery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <SummarySection>
        <CardTotalDelivery totalDeliveries={filteredDeliveries.length}/> {/* Use the CardTotalDelivery component */}
      </SummarySection>
      <Table headers={headers} rows={rows} />
      {selectedDelivery && (
        <DeliveryDetailsModal
          delivery={selectedDelivery}
          onClose={closeDetailsModal}
        />
      )}
    </StaffLayoutHS>
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

export default StaffDelivery;