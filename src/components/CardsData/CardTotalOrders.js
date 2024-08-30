// src/components/CardsData/CardTotalOrders.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardTotalOrders = ({ totalOrders }) => {
  return (
    <Card
      label="Total Orders"
      value={totalOrders} // Display the total number of orders
    />
  );
};

export default CardTotalOrders;
