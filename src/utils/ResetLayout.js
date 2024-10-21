// src/components/ResetLayout.js
import React from "react";
import { saveLayout } from "./indexedDB";

const ResetLayout = ({ setCurrentCardOrder, setTableOrder }) => {
  const handleResetLayout = async () => {
    // Reset card layout to default state
    const defaultCardOrder = [
      "CardTotalSales",
      "CardTotalInventoryValue",
      "CardTotalProducts",
      "CardLowStocks",
      "CardTotalOrders",
      "CardTotalCustomers",
      "CardTotalTransactions",
      "CardTotalDelivery",
      "CardTotalReturns",
      "CardTotalPurchaseOrder",
      "CardTotalNotification",
      "CardTotalLogs",
      "CardTotalCategories",
      "CardTotalSuppliers",
      "CardTotalUsers",
    ];

    // Reset table layout to default state
    const defaultTableOrder = [
      "LowestStocks",
      "ExpiredItemsAlert",
      "HighestSellingProducts",
      "RecentlyAddedProducts",
    ];

    // Update the state with the default layout
    setCurrentCardOrder(defaultCardOrder);
    setTableOrder(defaultTableOrder);

    // Clear the layout saved in indexedDB
    await saveLayout("superadmin", "cardOrder", defaultCardOrder);
    await saveLayout("superadmin", "tableOrder", defaultTableOrder);
  };

  return <button onClick={handleResetLayout}>Reset Layout</button>;
};

export default ResetLayout;
