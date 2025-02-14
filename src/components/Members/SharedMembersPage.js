import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../Layout/SearchBar";
import Table from "../Layout/Table";
import Button from "../Layout/Button";
import AddMemberModal from "./AddMemberModal";
import MemberDetailsModal from "./MemberDetailsModal";
import membersData from "../../data/MembersData";
import { FaPlus } from "react-icons/fa";
import { colors } from "../../colors";

const SharedMembersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(
    [...membersData].sort((a, b) => a.MEMBER_ID - b.MEMBER_ID)
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    setFilteredMembers(
      membersData
        .filter((member) =>
          [
            `${member.MEMBER_LASTNAME}, ${member.MEMBER_FIRSTNAME} ${member.MEMBER_MIDDLENAME}`,
            member.MEMBER_DEPARTMENT,
            member.MEMBER_POSITION,
            member.MEMBER_ID.toString(),
          ].some((field) => field.toLowerCase().includes(value))
        )
        .sort((a, b) => a.MEMBER_ID - b.MEMBER_ID)
    );
  };

  const openAddMemberModal = () => setShowAddModal(true);

  const openDetailsModal = (member) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowDetailsModal(false);
    setSelectedMember(null);
  };

  const handleAddMember = (newMember) => {
    setFilteredMembers((prev) =>
      [...prev, newMember].sort((a, b) => a.MEMBER_ID - b.MEMBER_ID)
    );
    setSelectedMember(newMember);
    setShowAddModal(false);
    setShowDetailsModal(true);
  };

  const handleRemoveMember = (memberId) => {
    setFilteredMembers((prev) =>
      prev.filter((member) => member.MEMBER_ID !== memberId).sort((a, b) => a.MEMBER_ID - b.MEMBER_ID)
    );
    closeModals();
  };

  const headers = ["Name", "ID No.", "Department", "Position", "Action"];

  const columnWidths = {
    name: "250px",
    id: "100px",
    department: "200px",
    position: "200px",
    action: "150px",
  };

  return (
    <>
      <Controls>
        <SearchBar placeholder="Search / Filter member..." value={searchTerm} onChange={handleSearch} />
        <StyledButton onClick={openAddMemberModal}>
          <FaPlus className="icon" /> Member
        </StyledButton>
      </Controls>
      <Table
        headers={headers.map((header, index) => (
          <TableHeader key={index} width={columnWidths[header.toLowerCase().replace(/\s/g, "")]}>
            {header}
          </TableHeader>
        ))}
        rows={filteredMembers.map((member) => [
          <TableCell width={columnWidths.name}>
            {`${member.MEMBER_FIRSTNAME} ${member.MEMBER_MIDDLENAME} ${member.MEMBER_LASTNAME}`}
          </TableCell>,
          <TableCell width={columnWidths.id}>{member.MEMBER_ID}</TableCell>,
          <TableCell width={columnWidths.department}>{member.MEMBER_DEPARTMENT}</TableCell>,
          <TableCell width={columnWidths.position}>{member.MEMBER_POSITION}</TableCell>,
          <TableCell width={columnWidths.action}>
            <ActionButton onClick={() => openDetailsModal(member)}>Details</ActionButton>
          </TableCell>,
        ])}
      />
      {showAddModal && <AddMemberModal onClose={() => setShowAddModal(false)} onAdd={handleAddMember} />}
      {showDetailsModal && selectedMember && (
        <MemberDetailsModal member={selectedMember} onClose={closeModals} onRemove={handleRemoveMember} />
      )}
    </>
  );
};

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const StyledButton = styled(Button)`
  display: flex;
  width: 120px;
  margin-top: 12px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 18px;
    margin-right: 8px;
  }
`;

const ActionButton = styled(Button)`
  width: 100px;
  background-color: ${colors.secondary};
  &:hover {
    background-color: ${colors.secondaryHover};
  }
`;

const TableHeader = styled.th`
  text-align: center;
  vertical-align: middle;
  padding: 8px;
  width: ${({ width }) => width || "auto"};
`;

const TableCell = styled.td`
  text-align: center;
  vertical-align: middle;
  width: ${({ width }) => width || "auto"};
`;

export default SharedMembersPage;
