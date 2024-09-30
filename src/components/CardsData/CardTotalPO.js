// src/components/CardsData/CardTotalPO.js
import React from "react";
import { FaShoppingCart } from "react-icons/fa"; // Icon for Purchase Orders
import Card from "../Layout/Card";
import { orders } from "../../pages/data/OrderData";
import styled from "styled-components";

const CardTotalPO = () => {
  // Calculate the total number of Purchase Orders
  const purchaseOrderCount = orders.filter(order => order.orderType === "Purchase Order").length;

  return (
    <CardContainer>
      <Card
        label="Total Purchase Orders"
        value={purchaseOrderCount} // Display the count of Purchase Orders
        icon={<FaShoppingCart />} // Pass the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalPO;
