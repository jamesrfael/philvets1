import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import { logData } from "../../pages/data/LogsData"; // Import the log data

const CardTotalLogs = () => {
  const totalLogs = logData.length; // Calculate total logs here

  return (
    <Card
      label="Total Logs"
      value={totalLogs} // Display the total number of logs
    />
  );
};

export default CardTotalLogs;
