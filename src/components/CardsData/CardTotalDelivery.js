// src/components/CardsData/CardTotalDelivery.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card"; // Import the reusable Card component
import { deliveries } from "../../pages/data/DeliveryData"; // Import the delivery data
import styled from "styled-components";
import { FaTruck } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalDelivery = () => {
  const navigate = useNavigate();

  // Calculate the total number of deliveries
  const totalDeliveries = deliveries.length;

  return (
    <CardContainer onClick={() => navigate('/admin/delivery')}>
      <Card
        label="Total Deliveries"
        value={totalDeliveries} // Display the total number of deliveries
        icon={<FaTruck />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalDelivery;
