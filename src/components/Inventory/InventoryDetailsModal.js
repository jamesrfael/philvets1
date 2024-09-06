import React from 'react';
import Modal from '../Layout/Modal'; // Ensure the path to Modal is correct
import styled from 'styled-components';

const InventoryDetailsModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <Modal
      title="Inventory Details"
      status={item.status}
      onClose={onClose}
    >
      <Section>
        <Image src={item.image} alt={item.name} />
        <Detail>
          <DetailLabel>Name:</DetailLabel> {item.name}
        </Detail>
        <Detail>
          <DetailLabel>SKU:</DetailLabel> {item.sku}
        </Detail>
        <Detail>
          <DetailLabel>Supplier:</DetailLabel> {item.supplier}
        </Detail>
        <Detail>
          <DetailLabel>Quantity:</DetailLabel> {item.quantity}
        </Detail>
        <Detail>
          <DetailLabel>Status:</DetailLabel> {item.status}
        </Detail>
      </Section>
    </Modal>
  );
};

// Styled Components
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const Detail = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

export default InventoryDetailsModal;
