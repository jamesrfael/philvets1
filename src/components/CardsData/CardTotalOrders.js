import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import { orders } from "../../pages/data/OrderData"; // Import the orders data

const CardTotalOrders = () => {
  const totalOrders = orders.length; // Calculate total orders here

  return (
    <Card
      label="Total Orders"
      value={totalOrders} // Display the total number of orders
    />
  );
};

export default CardTotalOrders;
