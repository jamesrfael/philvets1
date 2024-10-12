import React from "react";
import DashboardTable from "./DashboardTable";

const sampleData = [
  { id: 1, name: "Premium Cat Food", stocks: 10 },
  { id: 2, name: "Dog Leash", stocks: 5 },
  { id: 3, name: "Bird Cage", stocks: 3 },
  { id: 4, name: "Hamster Bedding", stocks: 2 },
  { id: 5, name: "Fish Tank Filter", stocks: 1 },
];

const LowestStocks = () => {
  const headers = ["Product Name", "Number of Stocks"];

  // Sort data by stocks in ascending order
  const sortedData = [...sampleData].sort((a, b) => a.stocks - b.stocks);

  const data = sortedData.map((product) => [product.name, product.stocks]);

  return (
    <DashboardTable
      title="Lowest Stocks"
      headers={headers}
      data={data}
      onRowClick={(id) => (window.location.href = `/admin/inventory/${id}`)} // Navigate to specific product's inventory page
    />
  );
};

export default LowestStocks;
