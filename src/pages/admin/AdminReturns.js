import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import ReturnDetailModal from "../../components/AdminReturns/ReturnDetailModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";

// Sample return data
const sampleReturns = [
  {
    id: 1,
    name: "Item A",
    returnDate: "2024-06-01",
    type: "Purchase",
    status: "Processing",
  },
  {
    id: 2,
    name: "Item B",
    returnDate: "2024-06-02",
    type: "Sales",
    status: "Completed",
  },
  {
    id: 3,
    name: "Item C",
    returnDate: "2024-06-03",
    type: "Purchase",
    status: "Processing",
  },
  {
    id: 4,
    name: "Item D",
    returnDate: "2024-06-04",
    type: "Sales",
    status: "Pending",
  },
  {
    id: 5,
    name: "Item E",
    returnDate: "2024-06-05",
    type: "Purchase",
    status: "Completed",
  },
];

const AdminReturns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReturn, setSelectedReturn] = useState(null);

  const filteredReturns = sampleReturns.filter((returnItem) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      returnItem.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      returnItem.returnDate.toLowerCase().includes(lowerCaseSearchTerm) ||
      returnItem.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      returnItem.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const openDetailModal = (returnItem) => setSelectedReturn(returnItem);
  const closeDetailModal = () => setSelectedReturn(null);

  const headers = ["ID", "Name", "Return Date", "Type", "Status", "Actions"];
  const rows = filteredReturns.map((returnItem) => [
    returnItem.id,
    returnItem.name,
    returnItem.returnDate,
    returnItem.type,
    <Status status={returnItem.status}>{returnItem.status}</Status>,
    <>
      <ActionButton
        bgColor="#00C4FF"
        onClick={() => openDetailModal(returnItem)}
      >
        View
      </ActionButton>
      <ActionButton bgColor="#f08400">Edit</ActionButton>
      <ActionButton bgColor="#ff1f1f">Delete</ActionButton>
    </>,
  ]);

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search returns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <MainContent>
        <Table headers={headers} rows={rows} />
      </MainContent>
      {selectedReturn && (
        <ReturnDetailModal
          returnItem={selectedReturn}
          onClose={closeDetailModal}
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
  padding: 0 16px;
`;

const MainContent = styled.div`
  padding: 0 2rem;
`;

const Status = styled.span`
  background-color: ${(props) =>
    props.status === "Completed"
      ? "#1DBA0B"
      : props.status === "Processing"
      ? "#00C4FF"
      : props.status === "Pending"
      ? "#f08400"
      : "gray"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
  margin: 0 0.25rem;
  &:hover {
    opacity: 0.8;
  }
`;

export default AdminReturns;
