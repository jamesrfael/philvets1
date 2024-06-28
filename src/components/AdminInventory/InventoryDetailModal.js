import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import { IoCloseCircle } from "react-icons/io5";

const InventoryDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Inventory Details</ModalTitle>
          <CloseButton onClick={onClose}>
            <IoCloseCircle color="#aaa" size={24} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <ItemImage src={item.image} alt={item.name} />
          <DetailRow>
            <DetailLabel>Name:</DetailLabel>
            <DetailValue>{item.name}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>SKU:</DetailLabel>
            <DetailValue>{item.sku}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Category:</DetailLabel>
            <DetailValue>{item.category}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Quantity:</DetailLabel>
            <DetailValue>{item.quantity}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Price:</DetailLabel>
            <DetailValue>₱{item.price}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Supplier:</DetailLabel>
            <DetailValue>{item.supplier}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Location:</DetailLabel>
            <DetailValue>{item.location}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Status:</DetailLabel>
            <DetailValue>{item.status}</DetailValue>
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

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
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

export default InventoryDetailModal;
