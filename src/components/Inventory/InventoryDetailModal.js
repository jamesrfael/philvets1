import React from "react";
import styled from "styled-components";
import { IoCloseCircle } from "react-icons/io5";
import { colors } from "../../colors";

const InventoryDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal if clicked outside the modal content
    }
  };

  return (
    <Backdrop onClick={handleBackdropClick}>
      <Modal>
        <CloseButton onClick={onClose}>
          <IoCloseCircle color="#ff5757" size={24} />
        </CloseButton>
        <ModalTitle>Inventory Details</ModalTitle>
        <ModalBody>
          <CenteredImageContainer>
            <ItemImage src={item.image} alt={item.name} />
          </CenteredImageContainer>
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
            <DetailValue>
              <StatusBadge status={item.status}>{item.status}</StatusBadge>
            </DetailValue>
          </DetailRow>
          <ActionButtonContainer>
            <ActionButton bgColor={colors.primary}>Edit</ActionButton>
            <ActionButton bgColor={colors.fail} onClick={() => alert("Delete action")}>
              Delete
            </ActionButton>
          </ActionButtonContainer>
        </ModalBody>
      </Modal>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 95%;
  max-width: 500px;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  padding: 20px 0;
`;

const CenteredImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
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

const StatusBadge = styled.span`
  background-color: ${(props) =>
    props.status === "In stock" ? "#1DBA0B"
    : props.status === "Low stock" ? "#f08400"
    : "#ff5757"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
`;

export default InventoryDetailModal;
