import React, { useState } from "react";
import LayoutHS from "../../components/LayoutHS";
import styled from "styled-components";
import { colors } from "../../colors";
import { staff as initialStaff } from "../data/StaffData";
import AddStaffModal from "../../components/AdminStaffs/AddStaffModal";
import EditStaffModal from "../../components/AdminStaffs/EditStaffModal";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";

const AdminStaffs = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [showInactive, setShowInactive] = useState(false);

  const filteredStaff = staff.filter((member) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const isActiveFilter = showInactive ? member.status === "Inactive" : member.status === "Active";
    return isActiveFilter && (
      member.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      member.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      member.username.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const handleAddStaff = (newStaff) => {
    setStaff([...staff, newStaff]);
  };

  const handleEditStaff = (updatedStaff) => {
    setStaff(staff.map((member) =>
      member.email === updatedStaff.email ? updatedStaff : member
    ));
  };

  const handleActivateDeactivateStaff = (email) => {
    setStaff(staff.map((member) =>
      member.email === email
        ? { ...member, status: member.status === "Active" ? "Inactive" : "Active" }
        : member
    ));
  };

  const headers = [
    "Image",
    "Name",
    "Email",
    "Username",
    "Actions"
  ];

  const rows = filteredStaff.map((member) => [
    <img src={member.image} alt={member.name} width="50" />,
    member.name,
    member.email,
    member.username,
    <>
      <ActionButton onClick={() => { setIsEditModalOpen(true); setEditingStaff(member); }}>
        Edit
      </ActionButton>
      <ActionButton onClick={() => handleActivateDeactivateStaff(member.email)}>
        {member.status === "Active" ? "Deactivate" : "Activate"}
      </ActionButton>
    </>
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
          <AddButton onClick={() => setIsAddModalOpen(true)}>Add Staff</AddButton>
          <ToggleButton
            onClick={() => setShowInactive(!showInactive)}
          >
            {showInactive ? "Show Active" : "Show Inactive"}
          </ToggleButton>
        </ButtonGroup>
      </Controls>
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
  padding: 0 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
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

const ToggleButton = styled.button`
  background-color: ${colors.secondary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${colors.secondaryHover};
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
  margin: 0 5px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminStaffs;
