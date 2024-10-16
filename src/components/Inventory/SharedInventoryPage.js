import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../Layout/SearchBar";
import Table from "../Layout/Table";
import CardTotalProducts from "../CardsData/CardTotalProducts";
import CardLowStocks from "../CardsData/CardLowStocks";
import InventoryDetailsModal from "../Inventory/InventoryDetailsModal"; // Ensure the path is correct
import SampleInventoryData from "../../data/InventoryData"; // Ensure the path is correct
import Button from "../Layout/Button";

const SharedInventoryPage = () => {
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

  const headers = ["Image", "Name", "Supplier", "Quantity", "Status", "Action"];

  const rows = filteredInventory.map((item) => [
    <img src={item.image} alt={item.name} width="50" height="50" />,
    item.name,
    item.supplier,
    item.quantity,
    <Status status={item.status}>{item.status}</Status>,
    <Button onClick={() => handleDetailClick(item)}>Details</Button>,
  ]);

  return (
    <>
      <Controls>
        <SearchBar
          placeholder="Search / Filter inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <AnalyticsContainer>
        <CardTotalProducts />
        <CardLowStocks /> {/* No onClick handler here */}
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {showDetailModal && selectedItem && (
        <InventoryDetailsModal item={selectedItem} onClose={closeModal} />
      )}
    </>
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

export default SharedInventoryPage;
