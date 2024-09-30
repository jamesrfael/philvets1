// src/components/CardsData/CardTotalSO.js
import React from "react";
import { FaMoneyBillWave } from "react-icons/fa"; // Icon for Sales Orders
import Card from "../Layout/Card";
import { orders } from "../../pages/data/OrderData";
import styled from "styled-components";

const CardTotalSO = () => {
  // Calculate the total number of Sales Orders
  const salesOrderCount = orders.filter(order => order.orderType === "Sales Order").length;

  return (
    <CardContainer>
      <Card
        label="Total Sales Orders"
        value={salesOrderCount} // Display the count of Sales Orders
        icon={<FaMoneyBillWave />} // Pass the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalSO;
