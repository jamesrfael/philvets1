// src/components/CardsData/CardTotalLogs.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardTotalLogs = ({ totalLogs }) => {
  return (
    <Card
      label="Total Logs"
      value={totalLogs} // Display the total number of logs
    />
  );
};

export default CardTotalLogs;
