import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import { orders } from "../../pages/data/OrderData"; // Import the orders data
import styled from "styled-components";
import { FaClipboardList } from "react-icons/fa"; // Updated icon

const CardTotalSalesOrder = () => {
  // Calculation for total number of Sales Orders
  const salesOrderCount = orders.filter(order => order.orderType === "Sales Order").length;

  return (
    <CardContainer>
      <Card
        label="Total Sales Orders"
        value={salesOrderCount} // Display the total number of Sales Orders
        icon={<FaClipboardList />} // Updated icon
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalSalesOrder;
