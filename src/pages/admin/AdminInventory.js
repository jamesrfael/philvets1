import React, { useState } from "react";
import LayoutHS from "../../components/Layout/LayoutHS";
import styled from "styled-components";
import { colors } from "../../colors";
import SampleInventoryData from "../data/InventoryData";
import InventoryDetailModal from "../../components/AdminInventory/InventoryDetailModal";
import Table from "../../components/Layout/Table";
import SearchBar from "../../components/Layout/SearchBar";
import CardLowStocks from "../../components/CardsData/CardLowStocks";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import Button from "../../components/Layout/Button"; // Import the Button component

const AdminInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredInventory = SampleInventoryData.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.sku.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.category.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.supplier.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.location.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.status.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.quantity.toString().includes(lowerCaseSearchTerm) ||
      item.price.toFixed(2).includes(lowerCaseSearchTerm)
    );
  });

  const handleDetailClick = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedItem(null);
  };

  const headers = [
    "Image",
    "Name",
    "SKU",
    "Category",
    "Quantity",
    "Price",
    "Supplier",
    "Location",
    "Status",
    "Action",
  ];

  const rows = filteredInventory.map((item) => [
    <img src={item.image} alt={item.name} width="50" height="50" />,
    item.name,
    item.sku,
    item.category,
    item.quantity,
    `₱${item.price.toFixed(2)}`,
    item.supplier,
    item.location,
    <Status status={item.status}>{item.status}</Status>,
    <Button onClick={() => handleDetailClick(item)}>Details</Button>,
  ]);

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <AnalyticsContainer>
        <CardTotalProducts />
        <CardLowStocks />
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {showDetailModal && selectedItem && (
        <InventoryDetailModal item={selectedItem} closeModal={closeModal} />
      )}
    </LayoutHS>
  );
};

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const Status = styled.span`
  background-color: ${(props) =>
    props.status === "In stock"
      ? "#1DBA0B"
      : props.status === "Low stock"
      ? "#f08400"
      : props.status === "Out of stock"
      ? "#ff5757"
      : "gray"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

export default AdminInventory;
