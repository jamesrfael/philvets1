// src/components/CardsData/CardTotalReturns.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardTotalReturns = ({ totalReturns }) => {
  return (
    <Card
      label="Total Returns"
      value={totalReturns} // Display the total number of returns
    />
  );
};

export default CardTotalReturns;
