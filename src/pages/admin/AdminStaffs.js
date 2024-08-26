// src/pages/AdminStaffs.js
import React, { useState } from "react";
import LayoutHS from "../../components/LayoutHS";
import styled from "styled-components";
import { colors } from "../../colors";
import { staff as initialStaff } from "../data/StaffData";
import AddStaffModal from "../../components/AdminStaffs/AddStaffModal";
import EditStaffModal from "../../components/AdminStaffs/EditStaffModal";
import SearchBar from "../../components/SearchBar"; // Import SearchBar

const AdminStaffs = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const filteredStaff = staff.filter((member) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
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

  const handleDeleteStaff = (email) => {
    setStaff(staff.filter((member) => member.email !== email));
  };

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
        </ButtonGroup>
      </Controls>
      <Table>
        <thead>
          <tr>
            <TableHeader>Image</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Username</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.map((member, index) => (
            <TableRow key={index}>
              <TableCell><img src={member.image} alt={member.name} width="50" /></TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.username}</TableCell>
              <TableCell>
                <ActionButton onClick={() => { setIsEditModalOpen(true); setEditingStaff(member); }}>Edit</ActionButton>
                <ActionButton onClick={() => handleDeleteStaff(member.email)}>Delete</ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
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
  margin: 0 5px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminStaffs;
