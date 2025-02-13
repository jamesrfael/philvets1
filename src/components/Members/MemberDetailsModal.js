import React, { useState } from "react";
import Modal from "../Layout/Modal";
import styled from "styled-components";
import Button from "../Layout/Button";

const MemberDetailsModal = ({ member, onClose, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState(member || {});
  const [errors, setErrors] = useState({});

  if (!member) return null; // Ensure modal doesn't render if member is undefined

  const validateFields = () => {
    let newErrors = {};

    // Validate required fields
    if (!editedMember.MEMBER_NAME) newErrors.MEMBER_NAME = "Member name is required";
    if (!editedMember.MEMBER_CITY) newErrors.MEMBER_CITY = "City is required";
    if (!editedMember.MEMBER_POSITION) newErrors.MEMBER_POSITION = "Province is required";

    // Validate phone number
    if (!editedMember.MEMBER_PHONENUM) {
      newErrors.MEMBER_PHONENUM = "Phone number is required";
    } else if (!/^0\d{10}$/.test(editedMember.MEMBER_PHONENUM)) {
      newErrors.MEMBER_PHONENUM = "Phone number must be 11 digits and start with '0'";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    if (validateFields()) {
      const confirmSave = window.confirm(
        "Are you sure you want to save the changes?"
      );
      if (confirmSave) {
        // Implement save logic here
        alert("Customer details saved");
        setIsEditing(false);
      }
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to discard the changes?"
    );
    if (confirmCancel) {
      setIsEditing(false);
      setEditedMember (member); // Reset to original member data on cancel
      setErrors({}); // Clear errors on cancel
    }
  };

  const handleRemove = () => {
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this member?"
    );
    if (confirmRemoval) {
      onRemove(member.MEMBER_ID);
      onClose();
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;

    // Ensure the first digit is always "0" and limit input to 11 characters
    if (value.length <= 11) {
      // Allow only digits and start with "0"
      if (/^[0-9]*$/.test(value)) {
        setEditedMember({
          ...editedMember,
          MEMBER_PHONENUM: value.length === 0 ? "0" : value, // Ensure leading zero
        });
      }
    }
  };

  return (
    <Modal
      title={isEditing ? `Edit ${member.MEMBER_NAME}` : `Member Details`}
      onClose={onClose}
    >
      {isEditing ? (
        <>
          <Details>
            <DetailItem>
              <strong>Member Name:</strong>
              <Input
                type="text"
                value={editedMember.MEMBER_NAME || ""} // Add fallback to empty string
                onChange={(e) =>
                  setEditedMember({
                    ...editedMember,
                    MEMBER_NAME: e.target.value,
                  })
                }
                border
              />
              {errors.MEMBER_NAME && <Error>{errors.MEMBER_NAME}</Error>}
            </DetailItem>
            <DetailItem>
              <strong>Location</strong>
              <LocationContainer>
                <CityInput
                  type="text"
                  value={editedMember.MEMBER_CITY || ""}
                  onChange={(e) =>
                    setEditedMember({
                      ...editedMember,
                      MEMBER_CITY: e.target.value,
                    })
                  }
                  border
                />
                {errors.MEMBER_CITY && <Error>{errors.MEMBER_CITY}</Error>}
                <ProvinceInput
                  type="text"
                  value={editedMember.MEMBER_POSITION || ""}
                  onChange={(e) =>
                    setEditedMember({
                      ...editedMember,
                      MEMBER_POSITION: e.target.value,
                    })
                  }
                  border
                />
                {errors.MEMBER_POSITION && <Error>{errors.MEMBER_POSITION}</Error>}
              </LocationContainer>
            </DetailItem>
            <DetailItem>
              <strong>Phone Number:</strong>
              <Input
                type="tel"
                value={editedMember.MEMBER_PHONENUM || "0"} // Default to "0"
                onChange={handlePhoneNumberChange}
                border
              />
              {errors.MEMBER_PHONENUM && <Error>{errors.MEMBER_PHONENUM}</Error>}
            </DetailItem>
          </Details>
          <ButtonGroup>
            <Button variant="red" onClick={handleCancel}>
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
              <DetailLabel>Member Name:</DetailLabel>{" "}
              {member.MEMBER_NAME || "N/A"}
            </Detail>
            <Detail>
              <DetailLabel>ID No:</DetailLabel>{" "}
              {member.MEMBER_ID || "N/A"}
            </Detail>
            <Detail>
              <DetailLabel>Employment Info:</DetailLabel>{" "}
              {`${member.MEMBER_DEPARTMENT || "N/A"}, ${member.MEMBER_POSITION || "N/A"}`}
            </Detail>
          </Section>

          <ButtonGroup>
            <Button variant="red" onClick={handleRemove}>
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

const LocationContainer = styled.div`
  display: flex;
  gap: 10px; /* Space between city and province */
`;

const CityInput = styled(Input)`
  flex: 1; /* Allows the city input to take available space */
`;

const ProvinceInput = styled(Input)`
  flex: 1; /* Allows the province input to take available space */
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export default MemberDetailsModal;
