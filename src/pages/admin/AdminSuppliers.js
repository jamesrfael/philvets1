import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import SupplierDetailsModal from "../../components/AdminSuppliers/SupplierDetailsModal";
import SearchBar from "../../components/Layout/SearchBar";
import { colors } from "../../colors";
import Table from "../../components/Layout/Table"; // Import the custom Table component
import CardTotalSuppliers from "../../components/CardsData/CardTotalSuppliers"; // Import CardTotalSuppliers component

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

  const headers = [
    "Supplier Name",
    "Supplier Number",
    "Contact Person",
    "Contact Number",
    "Action",
  ];

  const rows = filteredSuppliers.map((supplier) => [
    supplier.supplierName,
    supplier.supplierNumber,
    supplier.contactPersonName,
    supplier.contactPersonNumber,
    <ActionButton key="action" onClick={() => openModal(supplier)}>
      View
    </ActionButton>,
  ]);

  const totalSuppliers = sampleSuppliers.length; // Use original sampleSuppliers array

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
      <AnalyticsContainer>
        <CardTotalSuppliers totalSuppliers={totalSuppliers} /> {/* Use CardTotalSuppliers */}
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {showModal && selectedSupplier && (
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
  padding: 0 1px;
`;

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 1px;
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
