// src/components/CardsData/CardTotalCustomers.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardTotalCustomers = ({ totalCustomers }) => {
  return (
    <Card
      label="Total Customers"
      value={totalCustomers} // Display the total number of customers
    />
  );
};

export default CardTotalCustomers;
