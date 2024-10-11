import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import RequestDetailsModal from "../../components/Orders/Request Order/RequestDetailsModal";
import AddRequestModal from "../../components/Orders/Request Order/AddRequestModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalPendingRequest from "../../components/CardsData/CardTotalRequest";
import Button from "../../components/Layout/Button";
import { requests as initialRequests } from "../data/RequestData"; // Make sure this path is correct
import { FaPlus } from "react-icons/fa";

const StaffRequest = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isAddingRequest, setIsAddingRequest] = useState(false);

  // Filter to include all requests, then filter by search term
  const filteredRequests = requests.filter((request) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      request.requestBy.toLowerCase().includes(lowerCaseSearchTerm) ||
      request.requestDate.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Sort requests to prioritize Pending status first
  const sortedRequests = filteredRequests.sort((a, b) => {
    if (a.status === "Pending" && b.status !== "Pending") {
      return -1; // a comes first
    }
    if (a.status !== "Pending" && b.status === "Pending") {
      return 1; // b comes first
    }
    return 0; // keep original order for other statuses
  });

  const openDetailsModal = (request) => setSelectedRequest(request);
  const closeDetailsModal = () => setSelectedRequest(null);

  const openAddRequestModal = () => setIsAddingRequest(true);
  const closeAddRequestModal = () => setIsAddingRequest(false);

  const handleSaveNewRequest = (newRequest) => {
    setRequests([...requests, newRequest]);
    closeAddRequestModal();
  };

  const headers = ["Request By", "Request Date", "Status", "Action"];

  const rows = sortedRequests.map((request) => [
    request.requestBy,
    request.requestDate,
    <Status status={request.status}>{request.status}</Status>,
    <Button onClick={() => openDetailsModal(request)} fontSize="14px">
      Details
    </Button>,
  ]);

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledButton onClick={openAddRequestModal}>
          <FaPlus className="icon" /> Add Request
        </StyledButton>
      </Controls>
      <AnalyticsContainer>
        <div onClick={() => navigate("/admin/requests/pending-request")}>
          <CardTotalPendingRequest />
        </div>
      </AnalyticsContainer>

      {/* Render the table with all requests, sorted with Pending first */}
      <Table headers={headers} rows={rows} />
      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={closeDetailsModal}
        />
      )}
      {isAddingRequest && (
        <AddRequestModal
          onClose={closeAddRequestModal}
          onSave={handleSaveNewRequest}
        />
      )}
    </MainLayout>
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

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const Status = styled.span`
  background-color: ${(props) =>
    props.status === "Completed"
      ? "#1DBA0B"
      : props.status === "Pending"
      ? "#f08400"
      : props.status === "Cancelled"
      ? "#ff5757"
      : "gray"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

export default StaffRequest;
