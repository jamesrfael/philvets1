// src/components/CardTotalSales.js
import React from "react";
import Card from "../Layout/Card";
import { sales as initialSales } from "../../pages/data/SalesData";

const calculateTotalSales = (sales) => {
  return sales.reduce((total, sale) => total + sale.SALES_INV_TOTAL, 0);
};

const CardTotalSales = () => {
  const totalSales = calculateTotalSales(initialSales);

  return (
    <Card
      label="Total Sales"
      value={`₱${totalSales.toFixed(2)}`} // Display the total sales amount
    />
  );
};

export default CardTotalSales;
