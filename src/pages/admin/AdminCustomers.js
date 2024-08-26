import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import { colors } from "../../colors";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table"; // Import the custom Table component

// Sample customer data
const sampleCustomers = [
  {
    customerId: "C001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "09478925611",
    registrationDate: "2023-01-15",
  },
  {
    customerId: "C002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "09213456785",
    registrationDate: "2022-11-20",
  },
  // Add more sample customers as needed
];

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(sampleCustomers);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = sampleCustomers.filter((customer) => {
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

  const headers = [
    "Name",
    "Email",
    "Phone",
    "Registration Date",
    "Action"
  ];

  const rows = filteredCustomers.map((customer) => [
    `${customer.firstName} ${customer.lastName}`,
    customer.email,
    customer.phone,
    customer.registrationDate,
    <ActionButton key="action" onClick={() => handleViewCustomer(customer)}>View</ActionButton>
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
  padding: 0 16px;
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
