import React, { useState } from "react";
import Modal from "../Layout/Modal";
import styled from "styled-components";
import Button from "../Layout/Button";

const CustomerDetailsModal = ({ client, onClose, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState(client || {});

  if (!client) return null; // Ensure modal doesn't render if client is undefined

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const confirmSave = window.confirm("Are you sure you want to save the changes?");
    if (confirmSave) {
      // Implement save logic here
      alert("Client details saved");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to discard the changes?");
    if (confirmCancel) {
      setIsEditing(false);
      setEditedClient(client); // Reset to original client data on cancel
    }
  };

  const handleRemove = () => {
    const confirmRemoval = window.confirm("Are you sure you want to remove this client?");
    if (confirmRemoval) {
      onRemove(client.CLIENT_ID);
      onClose();
    }
  };

  return (
    <Modal
      title={isEditing ? `Edit ${client.CLIENT_NAME}` : `Client Details`}
      onClose={onClose}
    >
      {isEditing ? (
        <>
          <Details>
            <DetailItem>
              <strong>Client Name:</strong>
              <Input
                type="text"
                value={editedClient.CLIENT_NAME || ""} // Add fallback to empty string
                onChange={(e) =>
                  setEditedClient({
                    ...editedClient,
                    CLIENT_NAME: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>City:</strong>
              <Input
                type="text"
                value={editedClient.CLIENT_CITY || ""}
                onChange={(e) =>
                  setEditedClient({
                    ...editedClient,
                    CLIENT_CITY: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Province:</strong>
              <Input
                type="text"
                value={editedClient.CLIENT_PROVINCE || ""}
                onChange={(e) =>
                  setEditedClient({
                    ...editedClient,
                    CLIENT_PROVINCE: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Phone Number:</strong>
              <Input
                type="tel"
                value={editedClient.CLIENT_PHONENUM || ""}
                onChange={(e) =>
                  setEditedClient({
                    ...editedClient,
                    CLIENT_PHONENUM: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
            <DetailItem>
              <strong>Email:</strong>
              <Input
                type="email"
                value={editedClient.CLIENT_EMAIL || ""}
                onChange={(e) =>
                  setEditedClient({
                    ...editedClient,
                    CLIENT_EMAIL: e.target.value,
                  })
                }
                border
              />
            </DetailItem>
          </Details>
          <ButtonGroup>
            <Button variant="fail" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Edit
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Section>
            <Detail>
              <DetailLabel>Client Name:</DetailLabel> {client.CLIENT_NAME || "N/A"}
            </Detail>
            <Detail>
              <DetailLabel>City:</DetailLabel> {client.CLIENT_CITY || "N/A"}
            </Detail>
            <Detail>
              <DetailLabel>Province:</DetailLabel> {client.CLIENT_PROVINCE || "N/A"}
            </Detail>
            <Detail>
              <DetailLabel>Phone:</DetailLabel> {client.CLIENT_PHONENUM || "N/A"}
            </Detail>
            <Detail>
              <DetailLabel>Email:</DetailLabel> {client.CLIENT_EMAIL || "N/A"}
            </Detail>
          </Section>

          <ButtonGroup>
            <Button variant="fail" onClick={handleRemove}>
              Remove
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
          </ButtonGroup>
        </>
      )}
    </Modal>
  );
};

// Styled Components
const Section = styled.div`
  margin-bottom: 20px;
`;

const Detail = styled.div`
  margin-bottom: 10px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const Details = styled.div`
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: ${(props) => (props.border ? "1px solid #ccc" : "none")};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export default CustomerDetailsModal;
