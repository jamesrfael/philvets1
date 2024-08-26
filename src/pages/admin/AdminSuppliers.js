import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import SupplierDetailsModal from "../../components/AdminSuppliers/SupplierDetailsModal";
import SearchBar from "../../components/SearchBar"; // Importing the reusable SearchBar component
import { colors } from "../../colors";

const sampleSuppliers = [
  {
    supplierName: "Pet Care",
    supplierNumber: "09123456789",
    contactPersonName: "Gloria Madrigal",
    contactPersonNumber: "0912346679",
  },
  {
    supplierName: "Animal World",
    supplierNumber: "09234567890",
    contactPersonName: "John Doe",
    contactPersonNumber: "0923456789",
  },
  {
    supplierName: "Vet Supplies",
    supplierNumber: "09345678901",
    contactPersonName: "Jane Smith",
    contactPersonNumber: "0934567890",
  },
  {
    supplierName: "Pet Foods Inc.",
    supplierNumber: "09456789012",
    contactPersonName: "Alice Johnson",
    contactPersonNumber: "0945678901",
  },
  {
    supplierName: "Pet Accessories",
    supplierNumber: "09567890123",
    contactPersonName: "Bob Williams",
    contactPersonNumber: "0956789012",
  },
];

const AdminSuppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(sampleSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = sampleSuppliers.filter((supplier) => {
      if (!value) {
        return true;
      }
      return (
        supplier.supplierName.toLowerCase().includes(value) ||
        supplier.supplierNumber.includes(value) ||
        supplier.contactPersonName.toLowerCase().includes(value) ||
        supplier.contactPersonNumber.includes(value)
      );
    });
    setFilteredSuppliers(filtered);
  };

  const openModal = (supplier) => {
    setSelectedSupplier(supplier);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedSupplier(null);
    setShowModal(false);
  };

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search supplier..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <ButtonGroup>
          <AddButton>Add Supplier</AddButton>
        </ButtonGroup>
      </Controls>
      <Table>
        <thead>
          <tr>
            <TableHeader>Supplier Name</TableHeader>
            <TableHeader>Supplier Number</TableHeader>
            <TableHeader>Contact Person</TableHeader>
            <TableHeader>Contact Number</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((supplier, index) => (
            <TableRow key={index}>
              <TableCell>{supplier.supplierName}</TableCell>
              <TableCell>{supplier.supplierNumber}</TableCell>
              <TableCell>{supplier.contactPersonName}</TableCell>
              <TableCell>{supplier.contactPersonNumber}</TableCell>
              <TableCell>
                <ActionButton onClick={() => openModal(supplier)}>
                  View
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {showModal && (
        <SupplierDetailsModal
          supplier={selectedSupplier}
          onClose={closeModal}
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const AddButton = styled.button`
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

export default AdminSuppliers;
