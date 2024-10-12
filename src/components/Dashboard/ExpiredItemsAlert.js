// src/components/Dashboard/ExpiredItemsAlert.js

import React from "react";
import DashboardTable from "./DashboardTable";

// Sample data for expired items
const sampleData = [
  { id: 1, expiryDate: "2024-08-20", product: "Cat Dewormer", quantity: 10 },
  { id: 2, expiryDate: "2024-08-21", product: "Canula", quantity: 15 },
  { id: 3, expiryDate: "2024-08-22", product: "Anti Flea Powder", quantity: 5 },
];

const ExpiredItemsAlert = () => {
  const headers = ["Expiry Date", "Product", "Quantity"];
  const data = sampleData.map(item => [item.expiryDate, item.product, item.quantity]);

  return (
    <DashboardTable 
      title="Expired Items Alert" 
      headers={headers} 
      data={data} 
      onRowClick={(id) => window.location.href = "/admin/expired-items"} 
    />
  );
};

export default ExpiredItemsAlert;
