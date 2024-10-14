import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import { orders } from "../../data/OrderData"; // Import the orders data
import styled from "styled-components";
import { FaClipboardCheck } from "react-icons/fa"; // Keeping the existing icon for Purchase Orders

const CardTotalPurchaseOrder = () => {
  // Calculation for total number of Purchase Orders
  const purchaseOrderCount = orders.filter(
    (order) => order.orderType === "Purchase Order"
  ).length;

  return (
    <CardContainer>
      <Card
        label="Total Purchase Orders"
        value={purchaseOrderCount} // Display the total number of Purchase Orders
        icon={<FaClipboardCheck />} // Keeping the existing icon
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalPurchaseOrder;
