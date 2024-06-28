import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>Order Details</ModalTitle>
        <DetailItem>
          <DetailLabel>Status:</DetailLabel>
          <Status status={order.status}>{order.status}</Status>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Type:</DetailLabel>
          <DetailValue>{order.type}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>ID:</DetailLabel>
          <DetailValue>{order.id}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Name:</DetailLabel>
          <DetailValue>{order.name}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Date:</DetailLabel>
          <DetailValue>{order.date}</DetailValue>
        </DetailItem>
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
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailValue = styled.span`
  text-align: right;
`;

const Status = styled.span`
  background-color: ${(props) =>
    props.status === "Completed" ? "#1DBA0B" :
    props.status === "Pending" ? "#f08400" :
    props.status === "Cancelled" ? "#ff5757" :
    "gray"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

export default OrderDetailsModal;
