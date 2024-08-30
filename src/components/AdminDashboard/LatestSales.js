import React from "react";
import DashboardTable from "./DashboardTable"; // Import the new component

const sampleData = [
  { id: 1, date: "2024-08-20", product: "Cat Dewormer", amount: "₱ 5,000" },
  { id: 2, date: "2024-08-21", product: "Canula", amount: "₱ 4,000" },
  { id: 3, date: "2024-08-22", product: "Anti Flea Powder", amount: "₱ 6,000" },
];

const LatestSales = () => {
  const headers = ["Date", "Product", "Amount"];
  const data = sampleData.map(sale => [sale.date, sale.product, sale.amount]);

  return <DashboardTable title="Latest Sales" headers={headers} data={data} />;
};

export default LatestSales;
