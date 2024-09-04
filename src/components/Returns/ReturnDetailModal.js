import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

const ReturnDetailModal = ({ returnItem, onClose }) => {
  if (!returnItem) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Return Details</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <DetailRow>
            <DetailLabel>ID:</DetailLabel>
            <DetailValue>{returnItem.id}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Name:</DetailLabel>
            <DetailValue>{returnItem.name}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Return Date:</DetailLabel>
            <DetailValue>{returnItem.returnDate}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Type:</DetailLabel>
            <DetailValue>{returnItem.type}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Status:</DetailLabel>
            <DetailValue>{returnItem.status}</DetailValue>
          </DetailRow>
          <ActionButtonContainer>
            <ActionButton bgColor={colors.primary}>Edit</ActionButton>
            <ActionButton bgColor={colors.fail} onClick={() => alert("Delete action")}>
              Delete
            </ActionButton>
          </ActionButtonContainer>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #aaa;
`;

const ModalBody = styled.div`
  padding: 20px 0;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailValue = styled.span``;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

export default ReturnDetailModal;
