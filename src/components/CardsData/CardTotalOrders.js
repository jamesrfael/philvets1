// src/components/CardsData/CardTotalOrders.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card"; // Import the reusable Card component
import { orders } from "../../pages/data/OrderData"; // Import the orders data
import styled from "styled-components";
import { FaClipboardCheck } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalOrders = () => {
  const navigate = useNavigate();

  //Calculation for total number of orders 
  const orderCount = orders.lengths; 

  return (
    <CardContainer onClick= {() => navigate('/admin/orders')}>
      <Card
        label="Total Orders"
        value={orderCount} // Display the total number of orders
        icon={<FaClipboardCheck />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalOrders;
