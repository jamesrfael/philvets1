// src/components/CardsData/CardTotalLogs.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card"; // Import the reusable Card component
import { logData } from "../../pages/data/LogsData"; // Import the log data
import styled from "styled-components";
import { FaClipboardList } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalLogs = () => {
  const navigate = useNavigate();

  const totalLogs = logData.length; // Calculate total logs here

  return (
    <CardContainer onClick={() => navigate('/admin/logs')}>
      <Card
        label="Total Logs"
        value={totalLogs} // Display the total number of logs
        icon={<FaClipboardList />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalLogs;
