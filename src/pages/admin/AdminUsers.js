// src/pages/AdminUsers.js
import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import { colors } from "../../colors";
import { staff as initialUser } from "../data/UserData";
import AddUserModal from "../../components/Users/AddUserModal";
import EditUserModal from "../../components/Users/EditUserModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalUsers from "../../components/CardsData/CardTotalUsers";
import Button from "../../components/Layout/Button";
import { FaPlus } from "react-icons/fa";

const AdminUsers = () => {
  const [staff, setUser] = useState(initialUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showInactive, setShowInactive] = useState(false);

  const filteredUser = staff.filter((member) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const isActiveFilter = showInactive
      ? member.status === "Inactive"
      : member.status === "Active";
    return (
      isActiveFilter &&
      (member.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        member.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        member.username.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  const handleAddUser = (newUser) => {
    setUser((prevUser) => [...prevUser, newUser]);
  };

  const handleEditUser = (updatedUser) => {
    setUser((prevUser) =>
      prevUser.map((member) =>
        member.email === updatedUser.email ? updatedUser : member
      )
    );
  };

  const handleActivateDeactivateUser = (email) => {
    setUser((prevUser) =>
      prevUser.map((member) =>
        member.email === email
          ? {
              ...member,
              status: member.status === "Active" ? "Inactive" : "Active",
            }
          : member
      )
    );
  };

  const headers = ["Image", "Name", "Email", "Username", "Actions"];

  const rows = filteredUser.map((member) => [
    <img src={member.image} alt={member.name} width="50" />,
    member.name,
    member.email,
    member.username,
    <>
      <Button
        backgroundColor={colors.primary}
        hoverColor={colors.primaryHover}
        onClick={() => {
          setIsEditModalOpen(true);
          setEditingUser(member);
        }}
      >
        Edit
      </Button>
      <Button
        backgroundColor={colors.primary}
        hoverColor={colors.primaryHover}
        onClick={() => handleActivateDeactivateUser(member.email)}
      >
        {member.status === "Active" ? "Deactivate" : "Activate"}
      </Button>
    </>,
  ]);

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter staff..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup>
          <StyledButton
            backgroundColor={colors.primary}
            hoverColor={colors.primaryHover}
            onClick={() => setIsAddModalOpen(true)}
          >
            <FaPlus className="icon" /> User
          </StyledButton>
          <Button
            backgroundColor={colors.secondary}
            hoverColor={colors.secondaryHover}
            onClick={() => setShowInactive(!showInactive)}
          >
            {showInactive ? "Show Active" : "Show Inactive"}
          </Button>
        </ButtonGroup>
      </Controls>
      <AnalyticsContainer>
        <CardTotalUsers /> {/* Display Total Users */}
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {isAddModalOpen && (
        <AddUserModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddUser}
        />
      )}
      {isEditModalOpen && (
        <EditUserModal
          staff={editingUser}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditUser}
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

const ButtonGroup = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 1px;
`;

export default AdminUsers;
