// src/pages/AdminCustomers.js
import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import { colors } from "../../colors";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalCustomers from "../../components/CardsData/CardTotalCustomers";
import Button from "../../components/Layout/Button";
import AddCustomerModal from "../../components/Customers/AddCustomerModal";
import CustomerDetailsModal from "../../components/Customers/CustomerDetailsModal"; // Import CustomerDetailsModal
import customersData from "../data/CustomersData";

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customersData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State for CustomerDetailsModal
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = customersData.filter((customer) => {
      if (!value) return true;
      const fullName =
        `${customer.firstName} ${customer.lastName}`.toLowerCase();
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

  const headers = ["Name", "Email", "Phone", "Registration Date", "Action"];

  const rows = filteredCustomers.map((customer) => [
    `${customer.firstName} ${customer.lastName}`,
    customer.email,
    customer.phone,
    customer.registrationDate,
    <Button
      backgroundColor={colors.primary}
      hoverColor={colors.primaryHover}
      onClick={() => openDetailsModal(customer)}
      key="action"
    >
      Details
    </Button>,
  ]);

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search / Filter customer..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          backgroundColor={colors.primary}
          hoverColor={colors.primaryHover}
          onClick={openAddCustomerModal}
        >
          Add Customer
        </Button>
      </Controls>
      <SummarySection>
        <CardTotalCustomers />
      </SummarySection>
      <Table headers={headers} rows={rows} />

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

const SummarySection = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
`;

export default AdminCustomers;
