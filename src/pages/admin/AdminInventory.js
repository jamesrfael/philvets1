import React, { useState } from "react";
import LayoutHS from "../../components/Layout/LayoutHS";
import styled from "styled-components";
import SampleInventoryData from "../data/InventoryData";
import InventoryDetailModal from "../../components/Inventory/InventoryDetailModal";
import Table from "../../components/Layout/Table";
import SearchBar from "../../components/Layout/SearchBar";
import CardLowStocks from "../../components/CardsData/CardLowStocks";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import Button from "../../components/Layout/Button";

const AdminInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredInventory = SampleInventoryData.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.sku.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.supplier.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.status.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.quantity.toString().includes(lowerCaseSearchTerm)
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

  // Function to set the search term to "Low Stock" when CardLowStocks is clicked
  const handleLowStockClick = () => {
    setSearchTerm("Low Stock");
  };

  // Update headers to include only required fields
  const headers = ["Image", "Name", "Supplier", "Quantity", "Status", "Action"];

  // Update rows to map only required fields
  const rows = filteredInventory.map((item) => [
    <img src={item.image} alt={item.name} width="50" height="50" />,
    item.name,
    item.supplier,
    item.quantity,
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
        {/* Add onClick to set search term to "Low Stock" */}
        <CardLowStocks onClick={handleLowStockClick} />
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
  white-space: nowrap; /* Prevent text wrapping */
`;

export default AdminInventory;
