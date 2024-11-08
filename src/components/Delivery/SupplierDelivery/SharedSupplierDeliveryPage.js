// SharedSupplierDeliveryPage.js
import React, { useState } from "react";
import styled from "styled-components";
import SupplierDeliveryDetails from "./SupplierDeliveryDetails";
import { colors } from "../../../colors";
import INBOUND_DELIVERY from "../../../data/InboundData";
import SearchBar from "../../Layout/SearchBar";
import Table from "../../Layout/Table";
import CardTotalDelivery from "../../CardsData/CardTotalDelivery";
import Button from "../../Layout/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const SharedSupplierDeliveryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "INBOUND_DEL_DATE_RCVD",
    direction: "asc",
  });

  // Filter and search deliveries across all fields
  const filteredDeliveries = INBOUND_DELIVERY.INBOUND_DELIVERY.filter((delivery) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return Object.values(delivery).some((value) =>
      value && value.toString().toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Sort deliveries by specified field
  const sortedDeliveries = filteredDeliveries.sort((a, b) => {
    const key = sortConfig.key;
    if (key === "INBOUND_DEL_DATE_RCVD") {
      const dateA = a[key] ? new Date(a[key]) : null;
      const dateB = b[key] ? new Date(b[key]) : null;
      return (dateB - dateA) * (sortConfig.direction === "asc" ? 1 : -1);
    }
    return 0;
  });

  const openDetailsModal = (delivery) => {
    const deliveryDetails = INBOUND_DELIVERY.INBOUND_DELIVERY_DETAILS.filter(
      (detail) => detail.INBOUND_DEL_ID === delivery.INBOUND_DEL_ID
    );
    setSelectedDelivery({ delivery, deliveryDetails });
  };

  const closeDetailsModal = () => setSelectedDelivery(null);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const headers = [
    { title: "Received Date", key: "INBOUND_DEL_DATE_RCVD" },
    { title: "Status", key: "INBOUND_DEL_STATUS" },
    { title: "Supplier ID", key: "SUPPLIER_ID" },
    { title: "Created By User ID", key: "INBOUND_DEL_CREATED_USER_ID" },
    { title: "Action", key: "action" },
  ];

  const rows = sortedDeliveries.map((delivery) => [
    delivery.INBOUND_DEL_DATE_RCVD,
    <Status status={delivery.INBOUND_DEL_STATUS}>{delivery.INBOUND_DEL_STATUS}</Status>,
    delivery.SUPPLIER_ID,
    delivery.INBOUND_DEL_CREATED_USER_ID,
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
    <>
      <Controls>
        <SearchBar
          data-cy="search-bar"
          placeholder="Search / Filter delivery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <SummarySection>
        <CardTotalDelivery />
      </SummarySection>
      <Table
        headers={headers.map((header) => (
          <TableHeader
            key={header.key}
            onClick={header.key === "INBOUND_DEL_DATE_RCVD" ? () => handleSort(header.key) : undefined}
          >
            {header.title}
            {header.key === "INBOUND_DEL_DATE_RCVD" && (
              <>
                {sortConfig.key === header.key ? (
                  sortConfig.direction === "asc" ? (
                    <FaChevronUp style={{ marginLeft: "5px", fontSize: "12px" }} />
                  ) : (
                    <FaChevronDown style={{ marginLeft: "5px", fontSize: "12px" }} />
                  )
                ) : (
                  <span style={{ opacity: 0.5 }}>
                    <FaChevronUp style={{ marginLeft: "5px", fontSize: "12px" }} />
                    <FaChevronDown style={{ marginLeft: "5px", fontSize: "12px" }} />
                  </span>
                )}
              </>
            )}
          </TableHeader>
        ))}
        rows={rows}
      />
      {selectedDelivery && (
        <SupplierDeliveryDetails
          delivery={selectedDelivery.delivery}
          deliveryDetails={selectedDelivery.deliveryDetails}
          onClose={closeDetailsModal}
        />
      )}
    </>
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
      ? "#ff5757"
      : "gray"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

const TableHeader = styled.th`
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SharedSupplierDeliveryPage;
