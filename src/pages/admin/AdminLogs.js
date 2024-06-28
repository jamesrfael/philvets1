import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";

const AdminLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const logData = [
    {
      id: 1,
      timestamp: "2024-06-28 09:00 AM",
      action: "Admin Logged In",
      details: "Admin John Doe logged into the system."
    },
    {
      id: 2,
      timestamp: "2024-06-28 09:30 AM",
      action: "Restocked Item",
      details: "Restocked 50 units of Widget A."
    },
    {
      id: 3,
      timestamp: "2024-06-28 10:00 AM",
      action: "New Item Added",
      details: "Added new item Widget B to the inventory."
    },
    {
      id: 4,
      timestamp: "2024-06-28 11:00 AM",
      action: "Staff Logged In",
      details: "Staff member Jane Smith logged into the system."
    },
    {
      id: 5,
      timestamp: "2024-06-28 11:30 AM",
      action: "Order Processed",
      details: "Processed order #12345 for 10 units of Widget A."
    },
  ];

  const filteredLogs = logData.filter((log) =>
    log.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <LayoutHS>
      <Title></Title>
      <SearchBar
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <LogList>
        {filteredLogs.map((log) => (
          <LogEntry key={log.id}>
            <LogTimestamp>{log.timestamp}</LogTimestamp>
            <LogAction>{log.action}</LogAction>
            <LogDetails>{log.details}</LogDetails>
          </LogEntry>
        ))}
      </LogList>
    </LayoutHS>
  );
};

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const SearchBar = styled.input`
  display: block;
  width: 500px;
  padding: 8px;
  margin: 0 auto 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const LogEntry = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 2, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogTimestamp = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
  flex: 1;
`;

const LogAction = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
  flex: 1;
`;

const LogDetails = styled.div`
  font-size: 16px;
  color: #666;
  flex: 2;
`;

export default AdminLogs;
