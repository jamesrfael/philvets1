// src/components/CardTotalTransactions.js
import React from "react";
import Card from "../Layout/Card";
import { sales as initialSales } from "../../pages/data/SalesData";

const calculateTotalTransactions = (sales) => {
  return sales.length; // Return the number of transactions
};

const CardTotalTransactions = () => {
  const totalTransactions = calculateTotalTransactions(initialSales);

  return (
    <Card
      label="Total Transactions"
      value={totalTransactions} // Display the total number of transactions
    />
  );
};

export default CardTotalTransactions;
