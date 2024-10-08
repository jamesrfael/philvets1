import React, { useState } from "react";
import styled from "styled-components";
import MainLayout from "../../components/Layout/MainLayout";
import { colors } from "../../colors";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalCustomers from "../../components/CardsData/CardTotalCustomers";
import Button from "../../components/Layout/Button";
import AddCustomerModal from "../../components/Customers/AddCustomerModal";
import CustomerDetailsModal from "../../components/Customers/CustomerDetailsModal"; // Import CustomerDetailsModal
import customersData from "../data/CustomersData";
import { FaPlus } from "react-icons/fa"; // Import the FaPlus icon
import { FaChevronUp, FaChevronDown } from "react-icons/fa"; // Import chevron icons

const SuperAdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customersData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State for CustomerDetailsModal
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "customerName", direction: "asc" }); // Default sorting

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = customersData.filter((customer) => {
      if (!value) return true;
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      return (
        fullName.includes(value) ||
        customer.email.toLowerCase().includes(value) ||
        customer.phone.includes(value)
      );
    });
    setFilteredCustomers(filtered);
  };

  const openAddCustomerModal = () => {
    setShowAddModal(true);
  };

  const openDetailsModal = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowDetailsModal(false); // Close CustomerDetailsModal
    setSelectedCustomer(null);
  };

  const handleAddCustomer = (newCustomer) => {
    setFilteredCustomers([...filteredCustomers, newCustomer]);
  };

  const handleRemoveCustomer = (customerId) => {
    const updatedCustomers = filteredCustomers.filter(
      (customer) => customer.customerId !== customerId
    );
    setFilteredCustomers(updatedCustomers);
  };

  const headers = ["Customer Name", "Email", "Phone", "Registration Date", "Action"];

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort filtered customers based on sortConfig
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortConfig.key === "customerName") {
      const nameA = `${a.firstName} ${a.lastName}`;
      const nameB = `${b.firstName} ${b.lastName}`;
      return nameA.localeCompare(nameB) * (sortConfig.direction === "asc" ? 1 : -1);
    } else if (sortConfig.key === "registrationDate") {
      return (new Date(b.registrationDate) - new Date(a.registrationDate)) * (sortConfig.direction === "asc" ? 1 : -1);
    }
    return 0; // Default return for non-sortable headers
  });

  const rows = sortedCustomers.map((customer) => [
    `${customer.firstName} ${customer.lastName}`,
    customer.email,
    customer.phone,
    customer.registrationDate,
    <ActionButton key="action" onClick={() => openDetailsModal(customer)}>
      Details
    </ActionButton>,
  ]);

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter customer..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <StyledButton onClick={openAddCustomerModal}>
          <FaPlus className="icon" /> Customer
        </StyledButton>
      </Controls>
      <SummarySection>
        <CardTotalCustomers />
      </SummarySection>
      <Table
        headers={headers.map((header, index) => (
          <TableHeader
            key={index}
            onClick={() => {
              if (header === "Customer Name") handleSort("customerName");
              if (header === "Registration Date") handleSort("registrationDate");
            }}
          >
            {header}
            {/* Display chevrons for Customer Name and Registration Date */}
            {header === "Customer Name" && (
              <>
                {sortConfig.key === "customerName" ? (
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
            {header === "Registration Date" && (
              <>
                {sortConfig.key === "registrationDate" ? (
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
      {showAddModal && (
        <AddCustomerModal onClose={closeModals} onAdd={handleAddCustomer} />
      )}
      {showDetailsModal && selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={closeModals}
          onRemove={handleRemoveCustomer}
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

const SummarySection = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
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

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

const TableHeader = styled.th`
  text-align: center; /* Center the header text */
  cursor: pointer; /* Change cursor to pointer */
  display: flex; /* Use flex to align items */
  justify-content: center; /* Center content */
  align-items: center; /* Center vertically */
`;

export default SuperAdminCustomers;
