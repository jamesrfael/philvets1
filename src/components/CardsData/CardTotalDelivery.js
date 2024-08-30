// src/components/CardsData/CardTotalDelivery.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardTotalDelivery = ({ totalDeliveries }) => {
  return (
    <Card
      label="Total Deliveries"
      value={totalDeliveries} // Display the total number of deliveries
    />
  );
};

export default CardTotalDelivery;
