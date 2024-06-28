import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import SampleData from "../data/Sampledata";
import StaffDetailModal from "../../components/AdminStaffs/StaffDetailModal";
import AddStaffModal from "../../components/AdminStaffs/AddStaffModal";
import ProfilePic from "../../assets/profile.png";
import { colors } from "../../colors";

const AdminStaffs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStaff, setFilteredStaff] = useState(SampleData);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase(); // Trim and convert to lowercase
    setSearchTerm(value);
    const filtered = SampleData.filter((staff) => {
      if (!value) {
        return true; // Show all staff if search input is empty
      }
      // Check if any part of the name matches the search term
      if (
        (staff.firstName && staff.firstName.toLowerCase().includes(value)) ||
        (staff.middleName && staff.middleName.toLowerCase().includes(value)) ||
        (staff.lastName && staff.lastName.toLowerCase().includes(value))
      ) {
        return true;
      }
      return false;
    });
    setFilteredStaff(filtered);
  };

  const openDetailModal = (staff) => {
    setSelectedStaff(staff);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedStaff(null);
  };

  const openAddStaffModal = () => {
    setShowAddStaffModal(true);
  };

  const closeAddStaffModal = () => {
    setShowAddStaffModal(false);
  };

  return (
    <LayoutHS>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <AddButton onClick={openAddStaffModal}>Add Staff</AddButton>
      </SearchContainer>
      <StaffCardsContainer>
        {filteredStaff.map((staff, index) => (
          <StaffCard key={index} onClick={() => openDetailModal(staff)}>
            <ProfilePicture src={ProfilePic} alt="Profile" />
            <StaffName>{`${staff.firstName} ${staff.middleName} ${staff.lastName}`}</StaffName>
            <PhoneNumber>{staff.phoneNumber}</PhoneNumber>
            <DetailButton
              onClick={(e) => {
                e.stopPropagation();
                openDetailModal(staff);
              }}
            >
              Details
            </DetailButton>
          </StaffCard>
        ))}
      </StaffCardsContainer>
      {showDetailModal && (
        <StaffDetailModal staff={selectedStaff} onClose={closeDetailModal} />
      )}
      {showAddStaffModal && <AddStaffModal onClose={closeAddStaffModal} />}
    </LayoutHS>
  );
};


const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
`;

const AddButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

const StaffCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 0;
  padding: 1rem;
  justify-items: center; /* Center items horizontally */
`;

const StaffCard = styled.div`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  width: 200px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
`;

const ProfilePicture = styled.img`
  width: 100px; /* Adjust the size as per your design */
  height: 100px; /* Adjust the size as per your design */
  border-radius: 50%;
  margin-bottom: 0.5rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const StaffName = styled.p`
  font-weight: bold;
  font-size: 1.125rem;
`;

const PhoneNumber = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  font-weight: normal;
`;

const DetailButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminStaffs;
