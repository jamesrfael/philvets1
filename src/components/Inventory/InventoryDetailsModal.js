import React, { useState } from "react";
import Modal from "../Layout/Modal"; // Ensure the path to Modal is correct
import styled from "styled-components";
import Button from "../Layout/Button"; // Import the Button component

const InventoryDetailsModal = ({ item, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  if (!item) return null;

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const confirmSave = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (confirmSave) {
      // Implement save logic here
      alert("Inventory details saved");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to discard the changes?"
    );
    if (confirmCancel) {
      setIsEditing(false);
      setEditedItem(item);
    }
  };

  const handleRemove = () => {
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (confirmRemoval) {
      // Implement remove logic here
      alert(`Item ${item.name} removed`);
      onClose(); // Close the modal after removal
    }
  };

  return (
    <Modal
      title={isEditing ? `Edit ${item.name}` : `${item.name} Details`}
      status={item.status}
      onClose={onClose}
    >
      {isEditing ? (
        <>
          <Details>
            <DetailItem>
              <strong>Image:</strong>
              <ImagePreview src={editedItem.image} alt="Preview" />
              <ImageInput
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditedItem({ ...editedItem, image: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </DetailItem>
            <DetailItem>
              <strong>Name:</strong>
              <Input
                type="text"
                value={editedItem.name}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, name: e.target.value })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>SKU:</strong>
              <Input
                type="text"
                value={editedItem.sku}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, sku: e.target.value })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Supplier:</strong>
              <Input
                type="text"
                value={editedItem.supplier}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, supplier: e.target.value })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Quantity:</strong>
              <Input
                type="number"
                value={editedItem.quantity}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, quantity: e.target.value })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Status:</strong>
              <Input
                type="text"
                value={editedItem.status}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, status: e.target.value })
                }
                border
              />
            </DetailItem>
          </Details>
          <ButtonGroup>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel} variant="orange">
              Cancel
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
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
          <ButtonGroup>
            <Button variant="red" onClick={handleRemove}>
              Remove
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Edit Details
            </Button>
          </ButtonGroup>
        </>
      )}
    </Modal>
  );
};

// Styled Components

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align to the left */
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const ImageInput = styled.input`
  margin-top: 10px;
`;

const Details = styled.div`
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align to the left */
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
  border: ${(props) => (props.border ? "1px solid #ddd" : "none")};
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export default InventoryDetailsModal;
