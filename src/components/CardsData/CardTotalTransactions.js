// src/components/CardTotalTransactions.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardTotalTransactions = ({ totalTransactions }) => {
  return (
    <Card
      label="Total Transactions"
      value={totalTransactions} // Display the total number of transactions
    />
  );
};

export default CardTotalTransactions;
