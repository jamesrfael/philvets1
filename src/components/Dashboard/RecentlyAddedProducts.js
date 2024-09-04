import React from "react";
import DashboardTable from "./DashboardTable";

const sampleData = [
  { id: 1, name: "Product X", dateAdded: "2024-08-20" },
  { id: 2, name: "Product Y", dateAdded: "2024-08-21" },
  { id: 3, name: "Product Z", dateAdded: "2024-08-22" },
];

const RecentlyAddedProducts = () => {
  const headers = ["Product Name", "Date Added"];
  const data = sampleData.map((product) => [product.name, product.dateAdded]);

  return (
    <DashboardTable
      title="Recently Added Products"
      headers={headers}
      data={data}
      onRowClick={(id) => (window.location.href = "/admin/products")}
    />
  );
};

export default RecentlyAddedProducts;
