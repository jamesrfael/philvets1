// src/components/CardsData/CardTotalDelivery.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import { deliveries } from "../../pages/data/DeliveryData"; // Import the delivery data

const CardTotalDelivery = () => {
  // Calculate the total number of deliveries
  const totalDeliveries = deliveries.length;

  return (
    <Card
      label="Total Deliveries"
      value={totalDeliveries} // Display the total number of deliveries
    />
  );
};

export default CardTotalDelivery;
