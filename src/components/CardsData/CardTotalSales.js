// src/components/CardTotalSales.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardTotalSales = ({ totalSales }) => {
  return (
    <Card
      label="Total Sales"
      value={`₱${totalSales.toFixed(2)}`} // Display the total sales amount
    />
  );
};

export default CardTotalSales;
