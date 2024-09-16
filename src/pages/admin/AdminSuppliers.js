import React, { useState } from "react";
import styled from "styled-components";
import MainLayout from "../../components/Layout/MainLayout";
import SupplierDetailsModal from "../../components/Suppliers/SupplierDetailsModal";
import AddSupplierModal from "../../components/Suppliers/AddSupplierModal"; // Import the Add Supplier Modal
import SearchBar from "../../components/Layout/SearchBar";
import { colors } from "../../colors";
import Table from "../../components/Layout/Table";
import CardTotalSuppliers from "../../components/CardsData/CardTotalSuppliers";
import { suppliers as initialSuppliers } from "../../pages/data/SupplierData";
import Button from "../../components/Layout/Button";

const AdminSuppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(initialSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // Track the Add modal visibility

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = initialSuppliers.filter((supplier) => {
      if (!value) return true;
      return (
        supplier.supplierName.toLowerCase().includes(value) ||
        supplier.supplierNumber.includes(value) ||
        supplier.contactPersonName.toLowerCase().includes(value) ||
        supplier.contactPersonNumber.includes(value)
      );
    });
    setFilteredSuppliers(filtered);
  };

  const openDetailsModal = (supplier) => {
    setSelectedSupplier(supplier);
    setShowDetailsModal(true);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeModals = () => {
    setSelectedSupplier(null);
    setShowDetailsModal(false);
    setShowAddModal(false);
  };

  const handleAddSupplier = (newSupplier) => {
    // Add the new supplier to the supplier list
    setFilteredSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
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
    <ActionButton key="action" onClick={() => openDetailsModal(supplier)}>
      Details
    </ActionButton>,
  ]);

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter supplier..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <ButtonGroup>
          <Button bgColor={colors.primary} onClick={openAddModal}>
            Add Supplier
          </Button>
        </ButtonGroup>
      </Controls>
      <AnalyticsContainer>
        <CardTotalSuppliers />
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {showDetailsModal && selectedSupplier && (
        <SupplierDetailsModal
          supplier={selectedSupplier}
          onClose={closeModals}
        />
      )}
      {showAddModal && (
        <AddSupplierModal
          onClose={closeModals}
          onAdd={handleAddSupplier} // Pass the add handler
        />
      )}
    </MainLayout>
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

const ActionButton = styled(Button)`
  background-color: ${colors.primary};
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminSuppliers;
