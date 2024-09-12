// src/components/CardsData/CardLowStocks.js
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa"; // Import an icon from react-icons
import Card from "../Layout/Card";
import SampleInventoryData from "../../pages/data/InventoryData";
import styled from "styled-components";

const CardLowStocks = () => {
  // Calculate the count of low-stock and out-of-stock items
  const lowStockCount = SampleInventoryData.filter(
    (item) => item.status === "Low stock" || item.status === "Out of stock"
  ).length;

  return (
    <CardContainer>
      <Card
        label="Low Stocks"
        value={lowStockCount} // Display the count of low-stock and out-of-stock items
        icon={<FaExclamationTriangle />} // Pass the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardLowStocks;
