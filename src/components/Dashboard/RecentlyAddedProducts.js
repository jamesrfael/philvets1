import React from "react";
import DashboardTable from "./DashboardTable";

const sampleData = [
  { id: 1, name: "Premium Dog Food", dateAdded: "2024-08-20", quantity: 50, amount: "₱ 125,000" },
  { id: 2, name: "Cat Scratching Post", dateAdded: "2024-08-21", quantity: 20, amount: "₱ 10,000" },
  { id: 3, name: "Fish Tank Pump", dateAdded: "2024-08-22", quantity: 15, amount: "₱ 7,500" },
  { id: 4, name: "Hamster Wheel", dateAdded: "2024-08-23", quantity: 30, amount: "₱ 3,000" },
  { id: 5, name: "Bird Feeder", dateAdded: "2024-08-24", quantity: 25, amount: "₱ 12,500" },
];

const RecentlyAddedProducts = () => {
  const headers = ["Product Name", "Date Added", "Quantity", "Amount"];
  const data = sampleData.map((product) => [product.name, product.dateAdded, product.quantity, product.amount]);

  return (
    <DashboardTable
      title="Recently Added Products"
      headers={headers}
      data={data}
      onRowClick={(id) => (window.location.href = `/admin/products/${id}`)} // Navigate to product details page
    />
  );
};

export default RecentlyAddedProducts;
