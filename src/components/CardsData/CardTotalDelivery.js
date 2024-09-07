// src/components/CardsData/CardTotalDelivery.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card"; // Import the reusable Card component
import { deliveries } from "../../pages/data/DeliveryData"; // Import the delivery data
import styled from "styled-components";
import { FaTruck } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalDelivery = ({ totalDeliveries, isAdmin = false }) => {
  const navigate = useNavigate();

   // If it's for admin, calculate the total deliveries using all deliveries, otherwise use the passed prop
  const deliveryCount = isAdmin ? deliveries.length : totalDeliveries;

  return (
    <CardContainer onClick={() => navigate(isAdmin ? '/admin/delivery' : '/staff/delivery')}>
      <Card
        label="Total Deliveries"
        value={deliveryCount} // Display the total number of deliveries
        icon={<FaTruck />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalDelivery;
