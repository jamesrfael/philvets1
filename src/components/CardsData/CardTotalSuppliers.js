// src/components/CardsData/CardTotalSuppliers.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import { suppliers as initialSuppliers } from "../../pages/data/SupplierData"; // Import the supplier data

const CardTotalSuppliers = () => {
  // Calculate the total number of suppliers
  const totalSuppliers = initialSuppliers.length;

  return (
    <Card
      label="Total Suppliers"
      value={totalSuppliers} // Display the total number of suppliers
    />
  );
};

export default CardTotalSuppliers;
