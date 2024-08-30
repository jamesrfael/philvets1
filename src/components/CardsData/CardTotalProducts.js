// src/components/CardsData/CardTotalProducts.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import SampleInventoryData from "../../pages/data/InventoryData"; // Import the inventory data

const CardTotalProducts = () => {
  // Calculate the total number of products
  const totalProducts = SampleInventoryData.length;

  return (
    <Card
      label="Total Products"
      value={totalProducts} // Display the total number of products
    />
  );
};

export default CardTotalProducts;
