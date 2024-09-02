// src/components/CardTotalTransactions.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card";
import { sales as initialSales } from "../../pages/data/SalesData";
import styled from "styled-components";

const calculateTotalTransactions = (sales) => {
  return sales.length; // Return the number of transactions
};

const CardTotalTransactions = () => {
  const navigate = useNavigate();

  const totalTransactions = calculateTotalTransactions(initialSales);

  return (
    <CardContainer onClick={() => navigate('/admin/sales')}>
      <Card
        label="Total Transactions"
        value={totalTransactions} // Display the total number of transactions
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalTransactions;
