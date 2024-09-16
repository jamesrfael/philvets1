import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import SampleInventoryData from "../data/InventoryData";
import Table from "../../components/Layout/Table";
import SearchBar from "../../components/Layout/SearchBar";
import CardLowStocks from "../../components/CardsData/CardLowStocks";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import Button from "../../components/Layout/Button";
import InventoryDetailsModal from "../../components/Inventory/InventoryDetailsModal"; // Ensure the path is correct

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
    <MainLayout>
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
    </MainLayout>
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
