import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../Layout/SearchBar";
import Table from "../Layout/Table";
import Button from "../Layout/Button";
import AddMemberModal from "./AddMemberModal";
import MemberDetailsModal from "./MemberDetailsModal";
import membersData from "../../data/MembersData"; 
import { FaPlus } from "react-icons/fa";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { colors } from "../../colors";

const SharedMembersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(membersData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "MEMBER_NAME",
    direction: "asc",
  });

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = membersData.filter((member) => {
      if (!value) return true;
      return (
        member.MEMBER_NAME.toLowerCase().includes(value) ||
        member.MEMBER_DEPARTMENT.toLowerCase().includes(value) ||
        member.MEMBER_POSITION.toLowerCase().includes(value) ||
        member.MEMBER_ID.includes(value)
      );
    });
    setFilteredMembers(filtered);
  };

  const openAddMemberModal = () => {
    setShowAddModal(true);
  };

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
    setFilteredMembers([...filteredMembers, newMember]);
  };

  const handleRemoveMember = (memberId) => {
    const updatedMembers = filteredMembers.filter(
      (member) => member.MEMBER_ID !== memberId
    );
    setFilteredMembers(updatedMembers);
  };

  const headers = [
    "Name",
    "ID No.",
    "Department",
    "Position",
    "Action",
  ];

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortConfig.key === "MEMBER_NAME") {
      return (
        a.MEMBER_NAME.localeCompare(b.MEMBER_NAME) *
        (sortConfig.direction === "asc" ? 1 : -1)
      );
    }
    return 0;
  });

  const rows = sortedMembers.map((member) => [
    member.MEMBER_NAME,
    member.MEMBER_ID,
    member.MEMBER_DEPARTMENT,
    member.MEMBER_POSITION,
    <ActionButton key="action" onClick={() => openDetailsModal(member)}>
      Details
    </ActionButton>,
  ]);

  return (
    <>
      <Controls>
        <SearchBar
          placeholder="Search / Filter member..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <StyledButton onClick={openAddMemberModal}>
          <FaPlus className="icon" /> Member
        </StyledButton>
      </Controls>
      <Table
        headers={headers.map((header, index) => (
          <TableHeader
            key={index}
            onClick={() => {
              if (header === "Member Name") handleSort("MEMBER_NAME");
            }}
          >
            {header}
            {header === "Member Name" && (
              <>
                {sortConfig.key === "MEMBER_NAME" ? (
                  sortConfig.direction === "asc" ? (
                    <FaChevronUp
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                  ) : (
                    <FaChevronDown
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                  )
                ) : (
                  <span style={{ opacity: 0.5 }}>
                    <FaChevronUp
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                    <FaChevronDown
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                  </span>
                )}
              </>
            )}
          </TableHeader>
        ))}
        rows={rows}
      />
      {showAddModal && (
        <AddMemberModal onClose={closeModals} onAdd={handleAddMember} />
      )}
      {showDetailsModal && selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          onClose={closeModals}
          onRemove={handleRemoveMember}
        />
      )}
    </>
  );
};

// Styled components
const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

const ActionButton = styled(Button)`
  background-color: ${colors.secondary};
  &:hover {
    background-color: ${colors.secondaryHover};
  }

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

const TableHeader = styled.th`
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SharedMembersPage;
