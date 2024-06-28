import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import { colors } from "../../colors";

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
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      return fullName.includes(value) || customer.email.toLowerCase().includes(value) || customer.phone.includes(value);
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
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <AddButton onClick={openAddCustomerModal}>Add Customer</AddButton>
      </SearchContainer>
      <CustomerCardsContainer>
        {filteredCustomers.map((customer, index) => (
          <CustomerCard key={index}>
            <CustomerName>{`${customer.firstName} ${customer.lastName}`}</CustomerName>
            <CustomerEmail>{customer.email}</CustomerEmail>
            <CustomerPhone>{customer.phone}</CustomerPhone>
            <ViewButton onClick={() => handleViewCustomer(customer)}>View</ViewButton>
          </CustomerCard>
        ))}
      </CustomerCardsContainer>
    </LayoutHS>
  );
};

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
`;

const AddButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

const CustomerCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 0;
  padding: 1rem;
  justify-items: center;
`;

const CustomerCard = styled.div`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  width: 200px;
  background-color: #fff;
  text-align: center;
`;

const CustomerName = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const CustomerEmail = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const CustomerPhone = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const CustomerRegistrationDate = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const ViewButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminCustomers;
