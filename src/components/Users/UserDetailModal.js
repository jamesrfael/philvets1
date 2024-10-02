import React from "react";
import styled from "styled-components";
import { TiTimes } from "react-icons/ti";
import ProfilePic from "../../assets/profile.png"; // Import the profile picture

const UserDetailModal = ({ staff, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <TiTimes size={24} />
        </CloseButton>
        <h2 className="text-xl font-bold mb-4">Staff Details</h2>
        <ProfilePicture src={ProfilePic} alt="Profile" />
        <DetailContainer>
          <DetailRow>
            <DetailLabel>First Name:</DetailLabel>
            <DetailValue>{staff.firstName}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Middle Name:</DetailLabel>
            <DetailValue>{staff.middleName}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Last Name:</DetailLabel>
            <DetailValue>{staff.lastName}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Address:</DetailLabel>
            <DetailValue>{staff.address}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Phone:</DetailLabel>
            <DetailValue>{staff.phoneNumber}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Email:</DetailLabel>
            <DetailValue>{staff.email}</DetailValue>
          </DetailRow>
        </DetailContainer>
        <ButtonContainer>
          <EditButton>Edit</EditButton>
          <DeleteButton>Delete</DeleteButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  position: relative; /* Ensure relative positioning for absolute elements */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ProfilePicture = styled.img`
  width: 150px; /* Adjust the size as per your design */
  height: 150px; /* Adjust the size as per your design */
  border-radius: 50%;
  margin: 20px auto;
  display: block;
`;

const DetailContainer = styled.div`
  margin-bottom: 20px;
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const DetailLabel = styled.p`
  font-weight: bold;
  margin-right: 10px;
`;

const DetailValue = styled.p`
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default UserDetailModal;
