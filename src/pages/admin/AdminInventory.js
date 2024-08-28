// src/pages/AdminInventory.js
import React, { useState } from "react";
import LayoutHS from "../../components/Layout/LayoutHS";
import styled from "styled-components";
import { colors } from "../../colors";
import SampleInventoryData from "../data/SampleInventoryData"; // Import sample inventory data
import InventoryDetailModal from "../../components/AdminInventory/InventoryDetailModal";
import Table from "../../components/Layout/Table"; // Import the custom Table component
import SearchBar from "../../components/Layout/SearchBar"; // Import SearchBar

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
      item.quantity.toString().includes(lowerCaseSearchTerm) || // search by quantity
      item.price.toFixed(2).includes(lowerCaseSearchTerm) // search by price
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
    <ActionButton onClick={() => handleDetailClick(item)}>
      Details
    </ActionButton>,
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
      <Table headers={headers} rows={rows} />
      {showDetailModal && selectedItem && (
        <InventoryDetailModal item={selectedItem} closeModal={closeModal} />
      )}
    </LayoutHS>
  );
};

// Styled components

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 16px;
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

const ActionButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminInventory;
