// src/components/CardsData/CardTotalOrders.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card"; // Import the reusable Card component
import styled from "styled-components";
import { FaClipboardCheck } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalOrders = ({ totalOrders }) => {
  const navigate = useNavigate();
  
const displayTotalOrders = totalOrders !== undefined ? totalOrders : 0;
  
  return (
    <CardContainer onClick={() => navigate('/admin/orders')}>
      <Card
        label="Total Orders"
        value={displayTotalOrders} // Display the total number of orders
        icon={<FaClipboardCheck />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalOrders;
