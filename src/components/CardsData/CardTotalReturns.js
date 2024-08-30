// src/components/CardsData/CardTotalReturns.js
import React from "react";
import Card from "../Layout/Card";
import returnsData from "../../pages/data/ReturnsData";

const CardTotalReturns = () => {
  // Calculate the total number of returns
  const totalReturns = returnsData.length;

  return (
    <Card
      label="Total Returns"
      value={totalReturns} // Display the total number of returns
    />
  );
};

export default CardTotalReturns;
