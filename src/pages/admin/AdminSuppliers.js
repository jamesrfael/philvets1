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
import { FaPlus } from "react-icons/fa"; // Import the FaPlus icon
import { FaChevronUp, FaChevronDown } from "react-icons/fa"; // Import chevron icons

const AdminSuppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(initialSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // Track the Add modal visibility
  const [sortConfig, setSortConfig] = useState({ key: "supplierName", direction: "asc" }); // Default sorting

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

  // Sort suppliers based on the current sort configuration
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    if (sortConfig.key === "supplierName") {
      return a.supplierName.localeCompare(b.supplierName) * (sortConfig.direction === "asc" ? 1 : -1);
    }
    return 0;
  });

  const headers = [
    "Supplier Name",
    "Supplier Number",
    "Contact Person",
    "Contact Number",
    "Action",
  ];

  const rows = sortedSuppliers.map((supplier) => [
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
          <StyledButton bgColor={colors.primary} onClick={openAddModal}>
            <FaPlus className="icon"/> Supplier
          </StyledButton>
        </ButtonGroup>
      </Controls>
      <AnalyticsContainer>
        <CardTotalSuppliers />
      </AnalyticsContainer>
      <Table
        headers={headers.map((header, index) => (
          <TableHeader
            key={index}
            onClick={() => header === "Supplier Name" && handleSort("supplierName")}
          >
            {header}
            {/* Display chevrons for Supplier Name */}
            {header === "Supplier Name" && (
              <>
                {sortConfig.key === "supplierName" ? (
                  sortConfig.direction === "asc" ? (
                    <FaChevronUp style={{ marginLeft: '5px', fontSize: '12px' }} />
                  ) : (
                    <FaChevronDown style={{ marginLeft: '5px', fontSize: '12px' }} />
                  )
                ) : (
                  <span style={{ opacity: 0.5 }}>
                    <FaChevronUp style={{ marginLeft: '5px', fontSize: '12px' }} />
                    <FaChevronDown style={{ marginLeft: '5px', fontSize: '12px' }} />
                  </span>
                )}
              </>
            )}
          </TableHeader>
        ))}
        rows={rows}
      />
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

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

const ActionButton = styled(Button)`
  background-color: ${colors.primary};
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

const TableHeader = styled.th`
  text-align: center; /* Center the header text */
  cursor: pointer; /* Change cursor to pointer */
  display: flex; /* Use flex to align items */
  justify-content: center; /* Center content */
  align-items: center; /* Center vertically */
`;
export default AdminSuppliers;
