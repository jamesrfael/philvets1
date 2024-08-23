import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import ReturnDetailModal from "../../components/AdminReturns/ReturnDetailModal";
import { colors } from "../../colors";

// Sample return data
const sampleReturns = [
  { id: 1, name: "Item A", returnDate: "2024-06-01", type: "Purchase", status: "Processing" },
  { id: 2, name: "Item B", returnDate: "2024-06-02", type: "Sales", status: "Completed" },
  { id: 3, name: "Item C", returnDate: "2024-06-03", type: "Purchase", status: "Processing" },
  { id: 4, name: "Item D", returnDate: "2024-06-04", type: "Sales", status: "Pending" },
  { id: 5, name: "Item E", returnDate: "2024-06-05", type: "Purchase", status: "Completed" },
];

const AdminReturns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReturns, setFilteredReturns] = useState(sampleReturns);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = sampleReturns.filter((item) => {
      if (!value) {
        return true;
      }
      if (
        (item.name && item.name.toLowerCase().includes(value)) ||
        (item.type && item.type.toLowerCase().includes(value)) ||
        (item.status && item.status.toLowerCase().includes(value))
      ) {
        return true;
      }
      return false;
    });
    setFilteredReturns(filtered);
  };

  const openDetailModal = (item) => {
    setSelectedReturn(item);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedReturn(null);
  };

  const handleAddReturn = () => {
    // Logic for handling Add Return modal
    console.log("Add Return clicked");
  };

  return (
    <LayoutHS>
      <Header>
        <PageTitle>Return Management</PageTitle>
        <Button onClick={handleAddReturn}>Add Return</Button>
      </Header>
      <SearchFilterBar>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchFilterBar>
      <MainContent>
        <ReturnTable>
          <thead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Return Date</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {filteredReturns.map((returnItem, index) => (
              <TableRow key={index}>
                <TableCell>{returnItem.id}</TableCell>
                <TableCell>{returnItem.name}</TableCell>
                <TableCell>{returnItem.returnDate}</TableCell>
                <TableCell>{returnItem.type}</TableCell>
                <StatusCell>{returnItem.status}</StatusCell>
                <TableCell>
                  <ActionButton bgColor="#00C4FF" onClick={() => openDetailModal(returnItem)}>View</ActionButton>
                  <ActionButton bgColor="#f08400">Edit</ActionButton>
                  <ActionButton bgColor="#ff1f1f">Delete</ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </ReturnTable>
      </MainContent>
      {showDetailModal && (
        <ReturnDetailModal returnItem={selectedReturn} onClose={closeDetailModal} />
      )}
    </LayoutHS>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
`;

const SearchFilterBar = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: #F5F5F5;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #CCCCCC;
  border-radius: 5px;
  margin-right: 1rem;
  font-size: 16px;
`;

const MainContent = styled.div`
  padding: 0 2rem;
`;

const ReturnTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  text-align: center; /* Center the cells */
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 12px;
  text-align: center; /* Center the headers */
  font-size: 16px;
  background-color: #f2f2f2;
`;

const StatusCell = styled(TableCell)`
  text-align: center; /* Center the status text */
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
  margin: 0 0.25rem;
  &:hover {
    opacity: 0.8;
  }
`;

// Example of a Styled Button Component
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${ colors.primaryHover };
  }
`;

export default AdminReturns;
