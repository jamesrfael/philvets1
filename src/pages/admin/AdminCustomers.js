// src/pages/AdminCustomers.js
import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import { colors } from "../../colors";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table"; // Import the custom Table component
import CardTotalCustomers from "../../components/CardsData/CardTotalCustomers"; // Import CardTotalCustomers

// Sample customer data
import customersData from "../data/CustomersData"; // Import customer data

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customersData);

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
    // Function to open the add customer modal
  };

  const handleViewCustomer = (customer) => {
    // Function to handle the view customer button click
    console.log("Viewing customer:", customer);
  };

  const headers = ["Name", "Email", "Phone", "Registration Date", "Action"];

  const rows = filteredCustomers.map((customer) => [
    `${customer.firstName} ${customer.lastName}`,
    customer.email,
    customer.phone,
    customer.registrationDate,
    <ActionButton key="action" onClick={() => handleViewCustomer(customer)}>
      View
    </ActionButton>,
  ]);

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search customer..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <AddButton onClick={openAddCustomerModal}>Add Customer</AddButton>
      </Controls>
      <SummarySection>
        <CardTotalCustomers /> {/* Use the CardTotalCustomers component */}
      </SummarySection>
      <Table headers={headers} rows={rows} />
    </LayoutHS>
  );
};

// Styled Components

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

export default AdminCustomers;
