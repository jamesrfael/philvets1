// src/components/CardsData/CardTotalOrders.js

import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import { orders } from "../../pages/data/OrderData"; // Import the orders data
import styled from "styled-components";
import { FaClipboardCheck } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalPendingRequest = () => {
  //Calculation for total number of orders
  const requestCount = orders.length;

  return (
    <CardContainer>
      <Card
        label="Total Pending"
        value={requestCount} // Display the total number of orders
        icon={<FaClipboardCheck />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalPendingRequest;
