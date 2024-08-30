// src/components/CardsData/CardLowStocks.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import SampleInventoryData from "../../pages/data/InventoryData"; // Import the inventory data

const CardLowStocks = () => {
  // Calculate the count of low-stock and out-of-stock items
  const lowStockCount = SampleInventoryData.filter(item =>
    item.status === "Low stock" || item.status === "Out of stock"
  ).length;

  return (
    <Card
      label="Low Stocks"
      value={lowStockCount} // Display the count of low-stock and out-of-stock items
    />
  );
};

export default CardLowStocks;
