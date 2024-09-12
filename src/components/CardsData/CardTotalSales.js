// src/components/CardsData/CardTotalSales.js
import React from "react";
import { FaDollarSign } from "react-icons/fa"; // Import an icon for sales
import Card from "../Layout/Card";
import { sales as initialSales } from "../../pages/data/SalesData";
import styled from "styled-components";

const calculateTotalSales = (sales) => {
  return sales.reduce((total, sale) => total + sale.SALES_INV_TOTAL, 0);
};

const CardTotalSales = () => {
  const totalSales = calculateTotalSales(initialSales);

  return (
    <CardContainer>
      <Card
        label="Total Sales"
        value={`₱${totalSales.toFixed(2)}`} // Display the total sales amount
        icon={<FaDollarSign />} // Add the sales icon
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalSales;
