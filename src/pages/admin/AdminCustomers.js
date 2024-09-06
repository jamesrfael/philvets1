import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import { colors } from "../../colors";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalCustomers from "../../components/CardsData/CardTotalCustomers";
import Button from "../../components/Layout/Button"; // Import the Button component

// Sample customer data
import customersData from "../data/CustomersData";

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
    <Button
      backgroundColor={colors.primary}
      hoverColor={colors.primaryHover}
      onClick={() => handleViewCustomer(customer)}
      key="action"
    >
      View
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

export default AdminCustomers;
