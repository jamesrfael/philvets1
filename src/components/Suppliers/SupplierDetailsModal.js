import React from "react";
import styled from "styled-components";
import { IoCloseCircle } from "react-icons/io5";
import { colors } from "../../colors";

const SupplierDetailsModal = ({ supplier, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoCloseCircle color="#ff5757" size={24} />
        </CloseButton>
        <SupplierName>{supplier.supplierName}</SupplierName>
        <SupplierNumber>{supplier.supplierNumber}</SupplierNumber>
        <ContactPerson>{supplier.contactPersonName}</ContactPerson>
        <ContactPersonNumber>{supplier.contactPersonNumber}</ContactPersonNumber>
        <EditButton>Edit Supplier</EditButton>
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
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  position: relative;
  width: 300px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const SupplierName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const SupplierNumber = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ContactPerson = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ContactPersonNumber = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryHover};
  }
  display: block;
  margin: 0 auto;
`;

export default SupplierDetailsModal;
