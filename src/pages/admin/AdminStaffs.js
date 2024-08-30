// src/pages/AdminStaffs.js
import React, { useState } from "react";
import LayoutHS from "../../components/Layout/LayoutHS";
import styled from "styled-components";
import { colors } from "../../colors";
import { staff as initialStaff } from "../data/StaffData";
import AddStaffModal from "../../components/AdminStaffs/AddStaffModal";
import EditStaffModal from "../../components/AdminStaffs/EditStaffModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalStaffs from "../../components/CardsData/CardTotalStaffs";
import Button from "../../components/Layout/Button";

const AdminStaffs = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [showInactive, setShowInactive] = useState(false);

  const filteredStaff = staff.filter((member) => {
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

  const handleAddStaff = (newStaff) => {
    setStaff([...staff, newStaff]);
  };

  const handleEditStaff = (updatedStaff) => {
    setStaff(
      staff.map((member) =>
        member.email === updatedStaff.email ? updatedStaff : member
      )
    );
  };

  const handleActivateDeactivateStaff = (email) => {
    setStaff(
      staff.map((member) =>
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

  const rows = filteredStaff.map((member) => [
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
          setEditingStaff(member);
        }}
      >
        Edit
      </Button>
      <Button
        backgroundColor={colors.primary}
        hoverColor={colors.primaryHover}
        onClick={() => handleActivateDeactivateStaff(member.email)}
      >
        {member.status === "Active" ? "Deactivate" : "Activate"}
      </Button>
    </>,
  ]);

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search staff..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup>
          <Button
            backgroundColor={colors.primary}
            hoverColor={colors.primaryHover}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Staff
          </Button>
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
        <CardTotalStaffs /> {/* Display Total Staffs */}
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {isAddModalOpen && (
        <AddStaffModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddStaff}
        />
      )}
      {isEditModalOpen && (
        <EditStaffModal
          staff={editingStaff}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditStaff}
        />
      )}
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

const ButtonGroup = styled.div`
  display: flex;
`;

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 1px;
`;

export default AdminStaffs;
