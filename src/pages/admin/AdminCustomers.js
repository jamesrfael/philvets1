import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import { colors } from "../../colors";
import SearchBar from "../../components/SearchBar"; // Import the reusable SearchBar component

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
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Registration Date</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <TableRow key={index}>
              <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.registrationDate}</TableCell>
              <TableCell>
                <ActionButton onClick={() => handleViewCustomer(customer)}>
                  View
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
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

export default AdminCustomers;
