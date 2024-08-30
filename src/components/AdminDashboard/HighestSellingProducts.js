import React from "react";
import DashboardTable from "./DashboardTable"; // Import the new component

const sampleData = [
  { id: 1, name: "Product A", quantity: 150, revenue: "₱ 15,000" },
  { id: 2, name: "Product B", quantity: 120, revenue: "₱ 12,000" },
  { id: 3, name: "Product C", quantity: 100, revenue: "₱ 10,000" },
];

const HighestSellingProducts = () => {
  const headers = ["Product Name", "Quantity Sold", "Revenue"];
  const data = sampleData.map(product => [product.name, product.quantity, product.revenue]);

  return <DashboardTable title="Highest Selling Products" headers={headers} data={data} />;
};

export default HighestSellingProducts;
