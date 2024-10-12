import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import DeliveryDetailsModal from "../../components/Delivery/DeliveryDetailsModal";
import { colors } from "../../colors";
import { deliveries } from "../data/DeliveryData";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalDelivery from "../../components/CardsData/CardTotalDelivery";
import Button from "../../components/Layout/Button"; // Import the Button component
import { FaChevronUp, FaChevronDown } from "react-icons/fa"; // Import chevron icons

const SuperAdminDelivery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  }); // Default sorting set to Name
  const navigate = useNavigate(); // Declare useNavigate here

  const filteredDeliveries = deliveries.filter((delivery) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      delivery.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.date.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Sort filtered deliveries based on sortConfig
  const sortedDeliveries = filteredDeliveries.sort((a, b) => {
    if (sortConfig.key === "date") {
      return (
        (new Date(b.date) - new Date(a.date)) *
        (sortConfig.direction === "asc" ? 1 : -1)
      );
    }
    return (
      a.name.localeCompare(b.name) * (sortConfig.direction === "asc" ? 1 : -1)
    );
  });

  const openDetailsModal = (delivery) => setSelectedDelivery(delivery);
  const closeDetailsModal = () => setSelectedDelivery(null);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Only include the sortable headers in the handleSort logic
  const headers = [
    { title: "Name", key: "name" },
    { title: "Order Date", key: "date" },
    { title: "Type", key: "type" },
    { title: "Status", key: "status" },
    { title: "Action", key: "action" },
  ];

  const rows = sortedDeliveries.map((delivery) => [
    delivery.name,
    delivery.date,
    delivery.type,
    <Status status={delivery.status}>{delivery.status}</Status>,
    <Button
      data-cy="details-button"
      backgroundColor={colors.primary}
      hoverColor={colors.primaryHover}
      onClick={() => openDetailsModal(delivery)}
    >
      Details
    </Button>,
  ]);

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          data-cy="search-bar"
          placeholder="Search / Filter delivery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <SummarySection>
        <div onClick={() => navigate("/admin/delivery")}>
          <CardTotalDelivery />
        </div>
      </SummarySection>
      <Table
        headers={headers.map((header) => (
          <TableHeader
            key={header.key}
            onClick={
              header.key === "name" || header.key === "date"
                ? () => handleSort(header.key)
                : undefined
            }
          >
            {header.title}
            {/* Display chevrons for Name and Order Date */}
            {(header.key === "date" || header.key === "name") && (
              <>
                {sortConfig.key === header.key ? (
                  sortConfig.direction === "asc" ? (
                    <FaChevronUp
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                  ) : (
                    <FaChevronDown
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                  )
                ) : (
                  <span style={{ opacity: 0.5 }}>
                    <FaChevronUp
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                    <FaChevronDown
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                  </span>
                )}
              </>
            )}
          </TableHeader>
        ))}
        rows={rows}
      />
      {selectedDelivery && (
        <DeliveryDetailsModal
          delivery={selectedDelivery}
          onClose={closeDetailsModal}
        />
      )}
    </MainLayout>
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

const TableHeader = styled.th`
  text-align: center; /* Center the header text */
  cursor: pointer; /* Change cursor to pointer */
  display: flex; /* Use flex to align items */
  justify-content: center; /* Center content */
  align-items: center; /* Center vertically */
`;

export default SuperAdminDelivery;
