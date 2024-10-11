import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalLogs from "../../components/CardsData/CardTotalLogs";
import { logData } from "../data/LogsData";

const AdminLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logData.filter(
    (log) =>
      log.LOG_TITLE.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.LOG_DESCRIPTION.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.LOG_DATETIME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.USER_ID ? log.USER_ID.toString().includes(searchTerm) : false)
  );

  const headers = ["Date & Time", "Title", "Description", "User ID"];

  const rows = filteredLogs.map((log) => [
    log.LOG_DATETIME,
    log.LOG_TITLE,
    log.LOG_DESCRIPTION,
    log.USER_ID,
  ]);

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <AnalyticsContainer>
        <CardTotalLogs />
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
    </MainLayout>
  );
};

const Controls = styled.div`
  display: flex;
  justify-content: flex-start;
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
