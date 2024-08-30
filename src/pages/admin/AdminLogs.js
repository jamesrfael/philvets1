import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalLogs from "../../components/CardsData/CardTotalLogs"; // Import the CardTotalLogs component
import { logData } from "../../pages/data/LogsData"; // Import log data

const AdminLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logData.filter(
    (log) =>
      log.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const headers = [
    "Date",
    "Action",
    "Product Name",
    "SKU",
    "Quantity Change",
    "Previous Value",
    "New Value",
    "User",
    "Notes",
  ];

  const rows = filteredLogs.map((log) => [
    log.timestamp,
    log.action,
    log.productName,
    log.sku,
    log.quantityChange,
    log.previousValue,
    log.newValue,
    log.user,
    log.notes,
  ]);

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <AnalyticsContainer>
        <CardTotalLogs /> {/* Display Total Logs */}
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
    </LayoutHS>
  );
};

const Controls = styled.div`
  display: flex;
  justify-content: flex-start; /* Align search bar to the left */
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

export default AdminLogs;
