import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import styled from 'styled-components';
import Modal from '../Layout/Modal'; // Ensure the path to Modal is correct
import Button from '../Layout/Button'; // Import the Button component

const SupplierDetailsModal = ({ supplier, onClose, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSupplier, setEditedSupplier] = useState(supplier || {}); // Initialize with empty object

  if (!supplier) return null; // Guard clause to handle undefined supplier

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const confirmSave = window.confirm("Are you sure you want to save the changes?");
    if (confirmSave) {
      // Implement save logic here
      alert("Supplier details saved");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to discard the changes?");
    if (confirmCancel) {
      setIsEditing(false);
      setEditedSupplier(supplier);
    }
  };

  const handleRemove = () => {
    const confirmRemoval = window.confirm("Are you sure you want to remove this supplier?");
    if (confirmRemoval) {
      if (typeof onRemove === 'function') {
        onRemove(supplier.supplierId); // Assuming you have a supplierId for identification
      } else {
        console.error('onRemove is not a function');
      }
      onClose(); // Close the modal after removal
    }
  };

  return (
    <Modal
      title={isEditing ? `Edit ${supplier.supplierName}` : `${supplier.supplierName} Details`}
      onClose={onClose}
    >
      {isEditing ? (
        <>
          <Details>
            <DetailItem>
              <strong>Supplier Name:</strong>
              <Input
                type="text"
                value={editedSupplier.supplierName || ''}
                onChange={(e) => setEditedSupplier({ ...editedSupplier, supplierName: e.target.value })}
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Supplier Number:</strong>
              <Input
                type="text"
                value={editedSupplier.supplierNumber || ''}
                onChange={(e) => setEditedSupplier({ ...editedSupplier, supplierNumber: e.target.value })}
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Contact Person:</strong>
              <Input
                type="text"
                value={editedSupplier.contactPersonName || ''}
                onChange={(e) => setEditedSupplier({ ...editedSupplier, contactPersonName: e.target.value })}
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Contact Number:</strong>
              <Input
                type="text"
                value={editedSupplier.contactPersonNumber || ''}
                onChange={(e) => setEditedSupplier({ ...editedSupplier, contactPersonNumber: e.target.value })}
                border
              />
            </DetailItem>
          </Details>
          <ButtonGroup>
            <Button variant="primary" onClick={handleSave}>Save</Button>
            <Button variant="fail" onClick={handleCancel}>Cancel</Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Section>
            <Detail>
              <DetailLabel>Supplier Name:</DetailLabel> {supplier.supplierName}
            </Detail>
            <Detail>
              <DetailLabel>Supplier Number:</DetailLabel> {supplier.supplierNumber}
            </Detail>
            <Detail>
              <DetailLabel>Contact Person:</DetailLabel> {supplier.contactPersonName}
            </Detail>
            <Detail>
              <DetailLabel>Contact Number:</DetailLabel> {supplier.contactPersonNumber}
            </Detail>
          </Section>
            <ButtonGroup>
            <Button variant="fail" onClick={handleRemove}>Remove</Button>
            <Button variant="primary" onClick={handleEdit}>Edit</Button>
          </ButtonGroup>
        </>
      )}
    </Modal>
  );
};

// Prop Types for validation
SupplierDetailsModal.propTypes = {
  supplier: PropTypes.shape({
    supplierId: PropTypes.string.isRequired,
    supplierName: PropTypes.string,
    supplierNumber: PropTypes.string,
    contactPersonName: PropTypes.string,
    contactPersonNumber: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

// Styled Components
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Details = styled.div`
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Detail = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Input = styled.input`
  border: ${(props) => (props.border ? '1px solid #ddd' : 'none')};
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export default SupplierDetailsModal;
