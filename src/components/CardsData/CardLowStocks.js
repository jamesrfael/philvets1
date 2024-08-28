// src/components/CardsData/CardLowStocks.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardLowStocks = ({ lowStockCount }) => {
  return (
    <Card
      label="Low Stocks"
      value={lowStockCount} // Display the number of low-stock items
    />
  );
};

export default CardLowStocks;
