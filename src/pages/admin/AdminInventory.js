import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import SampleInventoryData from "../data/SampleInventoryData";
import InventoryDetailModal from "../../components/AdminInventory/InventoryDetailModal";
import { colors } from "../../colors";

const AdminInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInventory, setFilteredInventory] = useState(SampleInventoryData);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = SampleInventoryData.filter((item) => {
      if (!value) {
        return true;
      }
      if (
        (item.name && item.name.toLowerCase().includes(value)) ||
        (item.sku && item.sku.toLowerCase().includes(value)) ||
        (item.category && item.category.toLowerCase().includes(value))
      ) {
        return true;
      }
      return false;
    });
    setFilteredInventory(filtered);
  };

  const openDetailModal = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedItem(null);
  };

  return (
    <LayoutHS>
      <Header>
        <PageTitle>Admin Inventory</PageTitle>
        <Button>Add Product</Button>
      </Header>
      <SearchFilterBar>
        <SearchInput
          type="text"
          placeholder="Search by Name, SKU, Category"
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* FilterOptions and SearchInput components */}
      </SearchFilterBar>
      <MainContent>
        <InventoryTable>
          <thead>
            <tr>
              <TableHeader>Image</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>SKU</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Price (Peso)</TableHeader>
              <TableHeader>Supplier</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item, index) => (
              <TableRow key={index}>
                <TableCell><img src={item.image} alt={item.name} width="50" /></TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₱{item.price}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <ActionButton bgColor="#00C4FF" onClick={() => openDetailModal(item)}>View</ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </InventoryTable>
      </MainContent>
      {/* PaginationControls component */}
      {showDetailModal && (
        <InventoryDetailModal item={selectedItem} onClose={closeDetailModal} />
      )}
    </LayoutHS>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
`;

const SearchFilterBar = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: #F5F5F5;
`;

const SearchInput = styled.input`
  flex: 1; /* Take up remaining space */
  width: 500px; /* Adjusted width */
  padding: 10px;
  border: 1px solid #CCCCCC;
  border-radius: 5px;
  margin-right: 1rem;
  font-size: 16px;
`;

const MainContent = styled.div`
  padding: 0 2rem;
`;

const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  text-align: center; /* Center the cells */
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 12px;
  text-align: center; /* Center the headers */
  font-size: 16px;
  background-color: #f2f2f2;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
  margin: 0 0.25rem;
  &:hover {
    opacity: 0.8;
  }
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminInventory;
 