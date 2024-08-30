import React from "react";
import DashboardTable from "./DashboardTable"; // Import the new component

const sampleData = [
  { id: 1, name: "Anti Flea Soap", addedDate: "2024-08-18" },
  { id: 2, name: "Vaccine (Dog)", addedDate: "2024-08-19" },
  { id: 3, name: "Vitamins", addedDate: "2024-08-20" },
];

const RecentlyAddedProducts = () => {
  const headers = ["Product Name", "Date Added"];
  const data = sampleData.map(product => [product.name, product.addedDate]);

  return <DashboardTable title="Recently Added Products" headers={headers} data={data} />;
};

export default RecentlyAddedProducts;
