import React from "react";
import DashboardTable from "./DashboardTable"; // Import the new component

const sampleData = [
  { id: 1, name: "Product X", stocks: 10 },
  { id: 2, name: "Product Y", stocks: 5 },
  { id: 3, name: "Product Z", stocks: 3 },
];

const LowestStocks = () => {
  const headers = ["Product Name", "Number of Stocks"];
  const data = sampleData.map(product => [product.name, product.stocks]);

  return <DashboardTable title="Lowest Stocks" headers={headers} data={data} />;
};

export default LowestStocks;
