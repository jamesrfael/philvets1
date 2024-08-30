// src/components/CardsData/CardTotalCustomers.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import customersData from "../../pages/data/CustomersData"; // Import customer data

const CardTotalCustomers = () => {
  // Calculate the total number of customers
  const totalCustomers = customersData.length;

  return (
    <Card
      label="Total Customers"
      value={totalCustomers} // Display the total number of customers
    />
  );
};

export default CardTotalCustomers;
