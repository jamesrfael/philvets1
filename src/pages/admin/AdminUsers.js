// src/pages/AdminUsers.js
import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import { colors } from "../../colors";
import { staff as initialUser } from "../data/UserData";
import AddUserModal from "../../components/Users/AddUserModal";
import UserDetailsModal from "../../components/Users/UserDetailsModal"; // Import the new modal
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalUsers from "../../components/CardsData/CardTotalUsers";
import Button from "../../components/Layout/Button";
import { FaPlus } from "react-icons/fa";

const AdminUsers = () => {
  const [staff, setUser] = useState(initialUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State for the details modal
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [showInactive, setShowInactive] = useState(false);

  const filteredUser = staff.filter((member) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const isActiveFilter = showInactive
      ? !member.USER_ISACTIVE // Show only deactivated users
      : member.USER_ISACTIVE; // Show only active users
    return (
      isActiveFilter &&
      (member.USER_FIRSTNAME.toLowerCase().includes(lowerCaseSearchTerm) ||
        member.USER_LASTNAME.toLowerCase().includes(lowerCaseSearchTerm) ||
        member.USER_EMAIL.toLowerCase().includes(lowerCaseSearchTerm) ||
        member.USER_USERNAME.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  const handleAddUser = (newUser) => {
    setUser((prevUser) => [...prevUser, newUser]);
  };

  const handleActivateDeactivateUser = (email) => {
    setUser((prevUser) =>
      prevUser.map((member) =>
        member.USER_EMAIL === email
          ? {
              ...member,
              USER_ISACTIVE: !member.USER_ISACTIVE, // Toggle active status
            }
          : member
      )
    );
  };

  const headers = ["Image", "Name", "Email", "Username", "Actions"];

  const rows = filteredUser.map((member) => [
    <img src={member.image} alt={`${member.USER_FIRSTNAME} ${member.USER_LASTNAME}`} width="50" />,
    `${member.USER_FIRSTNAME} ${member.USER_LASTNAME}`, // Display full name
    member.USER_EMAIL,
    member.USER_USERNAME,
    <Button
      backgroundColor={colors.primary}
      hoverColor={colors.primaryHover}
      onClick={() => {
        setIsDetailsModalOpen(true);
        setSelectedUser(member); // Set the selected user
      }}
    >
      Details
    </Button>,
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
            backgroundColor={showInactive ? colors.success : colors.fail}
            hoverColor={showInactive ? colors.successHover : colors.failHover}
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
      {isDetailsModalOpen && (
        <UserDetailsModal
          client={selectedUser} // Pass the selected user to the modal
          onClose={() => setIsDetailsModalOpen(false)}
          onRemove={(id) => {
            // Implement user removal logic here if necessary
            handleActivateDeactivateUser(selectedUser.USER_EMAIL); // Deactivate the user
          }}
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
