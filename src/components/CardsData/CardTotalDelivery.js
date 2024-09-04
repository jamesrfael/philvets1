// src/components/CardsData/CardTotalDelivery.js

import React from "react";
// import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card"; // Import the reusable Card component
import styled from "styled-components";
import { FaTruck } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalDelivery = ({ totalDeliveries }) => {
//   const navigate = useNavigate();

  // Calculate the total number of deliveries
  const displayTotalDeliveries = totalDeliveries !== undefined ? totalDeliveries : 0;

  return (
    <CardContainer>
      <Card
        label="Total Deliveries"
        value={displayTotalDeliveries} // Display the total number of deliveries
        icon={<FaTruck />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalDelivery;
