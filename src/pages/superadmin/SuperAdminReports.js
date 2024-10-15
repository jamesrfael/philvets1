import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import PurchaseOrderReport from "../../components/Reports/PurchaseOrderReport"; // Import PurchaseOrderReport
import Button from "../../components/Layout/Button"; // For the tab buttons
import { colors } from "../../colors"; // Ensure colors are correctly imported

const SuperAdminReports = () => {
  const [activeTab, setActiveTab] = useState("Purchase Order Report"); // Set default tab to Purchase Order Report

  // Function to render the report body based on the active tab
  const renderActiveReport = () => {
    switch (activeTab) {
      // Comment out the other reports for now
      // case "Sales Report":
      //   return <SalesReport />;
      // case "Inventory Report":
      //   return <InventoryReport />;
      // case "Order Report":
      //   return <OrderReport />;
      case "Purchase Order Report":
        return <PurchaseOrderReport />; // Render the PurchaseOrderReport
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <Tabs>
        <StyledTabButton
          active={activeTab === "Purchase Order Report"}
          onClick={() => setActiveTab("Purchase Order Report")}
        >
          Purchase Order Report
        </StyledTabButton>
      </Tabs>

      {renderActiveReport()} {/* Render the report based on active tab */}
    </MainLayout>
  );
};

// Styled components for tabs layout
const Tabs = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const StyledTabButton = styled(Button)`
  background-color: ${(props) => 
    props.active ? colors.primary : "#e0e0e0"}; /* Use primary for active, grey for inactive */
  color: ${(props) => (props.active ? "#fff" : "#000")};
  &:hover {
    background-color: ${(props) => 
      props.active ? colors.primaryHover : "#c0c0c0"}; // Use primaryHover for active hover
  }
`;

export default SuperAdminReports;
