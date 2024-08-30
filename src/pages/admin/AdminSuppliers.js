import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import SupplierDetailsModal from "../../components/AdminSuppliers/SupplierDetailsModal";
import SearchBar from "../../components/Layout/SearchBar";
import { colors } from "../../colors";
import Table from "../../components/Layout/Table";
import CardTotalSuppliers from "../../components/CardsData/CardTotalSuppliers";
import { suppliers as initialSuppliers } from "../../pages/data/SupplierData";
import Button from "../../components/Layout/Button"; // Import the new Button component

const AdminSuppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(initialSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = initialSuppliers.filter((supplier) => {
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

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search supplier..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <ButtonGroup>
          <Button bgColor={colors.primary}>Add Supplier</Button>
        </ButtonGroup>
      </Controls>
      <AnalyticsContainer>
        <CardTotalSuppliers /> {/* Use CardTotalSuppliers without props */}
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

const ActionButton = styled(Button)`
  background-color: ${colors.primary};
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminSuppliers;
