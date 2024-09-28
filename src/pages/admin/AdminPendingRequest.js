import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import RequestDetailsModal from "../../components/Orders/RequestDetailsModal";
import AddRequestModal from "../../components/Orders/AddRequestModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalPendingRequest from "../../components/CardsData/CardTotalPendingRequest";
import Button from "../../components/Layout/Button";
import { requests as initialRequests } from "../../pages/data/RequestData";
import { FaPlus } from "react-icons/fa";

const AdminPendingRequest = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isAddingRequest, setIsAddingRequest] = useState(false);

  const filteredRequests = requests.filter((request) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      request.requestBy.toLowerCase().includes(lowerCaseSearchTerm) ||
      request.requestDate.toLowerCase().includes(lowerCaseSearchTerm) ||
      request.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
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

  const rows = filteredRequests.map((request) => [
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
      <Table headers={headers} rows={rows} />
      {selectedRequest && (
        <RequestDetailsModal request={selectedRequest} onClose={closeDetailsModal} />
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
    props.status === "Approved"
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

export default AdminPendingRequest;
