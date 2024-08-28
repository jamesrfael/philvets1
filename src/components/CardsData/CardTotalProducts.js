// src/components/CardsData/CardTotalProducts.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardTotalProducts = ({ totalProducts }) => {
  return (
    <Card
      label="Total Products"
      value={totalProducts} // Display the total number of products
    />
  );
};

export default CardTotalProducts;
