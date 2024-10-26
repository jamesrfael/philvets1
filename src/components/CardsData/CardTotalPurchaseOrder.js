import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component
import PURCHASE_ORDERS from "../../data/PurchaseOrderData"; // Import the purchase order data as default
import styled from "styled-components";
import { FaClipboardCheck } from "react-icons/fa"; // Keeping the existing icon for Purchase Orders

const CardTotalPurchaseOrder = () => {
  // Calculation for total number of Purchase Orders
  const purchaseOrderCount = PURCHASE_ORDERS.length; // Count total purchase orders

  return (
    <CardContainer>
      <Card
        label="Purchase Orders"
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
