import React, { useState } from "react";
import LayoutHS from "../../components/LayoutHS";
import styled from "styled-components";
import { colors } from "../../colors";
import SampleInventoryData from "../data/SampleInventoryData";
import InventoryDetailModal from "../../components/AdminInventory/InventoryDetailModal";
import SearchBar from "../../components/SearchBar"; // Import the reusable SearchBar component

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

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <Table>
        <thead>
          <tr>
            <TableHeader>Image</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>SKU</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Supplier</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <img src={item.image} alt={item.name} width="50" height="50" />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>₱{item.price.toFixed(2)}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                <Status status={item.status}>{item.status}</Status>
              </TableCell>
              <TableCell>
                <ActionButton onClick={() => handleDetailClick(item)}>
                  Details
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {showDetailModal && selectedItem && (
        <InventoryDetailModal
          item={selectedItem}
          closeModal={closeModal}
        />
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

const Table = styled.table`
  text-align: center;
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  padding: 0 16px;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  color: white;
  padding: 12px;
  text-align: center;
  font-size: 17px;
  background-color: ${colors.primary};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 12px;
  font-size: 16px;
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
