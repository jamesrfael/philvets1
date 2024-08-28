// src/components/CardsData/CardTotalSuppliers.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardTotalSuppliers = ({ totalSuppliers }) => {
  return (
    <Card
      label="Total Suppliers"
      value={totalSuppliers} // Display the total number of suppliers
    />
  );
};

export default CardTotalSuppliers;
