import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styled from "styled-components";

const MemberDetailsModal = ({ show, handleClose, member, onSave, onDelete }) => {
  const [editableMember, setEditableMember] = useState({});

  // Ensure state updates when member changes
  useEffect(() => {
    if (member) {
      setEditableMember(member);
    }
  }, [member]);

  // Handle changes for non-nested fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableMember((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for nested fields (CONTRIBUTIONS, LEAVES)
  const handleNestedChange = (category, key, value) => {
    setEditableMember((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(editableMember);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Member Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editableMember && editableMember.MEMBER_ID ? (
          <StyledForm>
            <img
              src={editableMember.PROFILE_PIC || "assets/profilepic.png"}
              alt="Profile"
              style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }}
            />

            <SectionTitle>Basic Information</SectionTitle>
            <FormGroup>
              <FormLabel>ID Number:</FormLabel>
              <StyledInput name="MEMBER_ID" value={editableMember.MEMBER_ID} readOnly />
            </FormGroup>
            <FormGroup>
              <FormLabel>Last Name:</FormLabel>
              <StyledInput name="MEMBER_LASTNAME" value={editableMember.MEMBER_LASTNAME || ""} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>First Name:</FormLabel>
              <StyledInput name="MEMBER_FIRSTNAME" value={editableMember.MEMBER_FIRSTNAME || ""} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Middle Name:</FormLabel>
              <StyledInput name="MEMBER_MIDDLENAME" value={editableMember.MEMBER_MIDDLENAME || ""} onChange={handleChange} />
            </FormGroup>

            <SectionTitle>Contact Information</SectionTitle>
            <FormGroup>
              <FormLabel>Email Address:</FormLabel>
              <StyledInput name="MEMBER_EMAIL" value={editableMember.MEMBER_EMAIL || ""} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Contact Number:</FormLabel>
              <StyledInput name="MEMBER_CONTACT" value={editableMember.MEMBER_PHONENUM || ""} onChange={handleChange} />
            </FormGroup>

            <SectionTitle>Employment Information</SectionTitle>
            <FormGroup>
              <FormLabel>Date Hired:</FormLabel>
              <StyledInput type="date" name="MEMBER_DATE_HIRED" value={editableMember.MEMBER_DATE_HIRED || ""} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Company:</FormLabel>
              <StyledInput name="MEMBER_COMPANY" value={editableMember.MEMBER_COMPANY || ""} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Department:</FormLabel>
              <StyledInput name="MEMBER_DEPARTMENT" value={editableMember.MEMBER_DEPARTMENT || ""} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Position:</FormLabel>
              <StyledInput name="MEMBER_POSITION" value={editableMember.MEMBER_POSITION || ""} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Status:</FormLabel>
              <StyledInput name="MEMBER_STATUS" value={editableMember.MEMBER_STATUS || ""} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Monthly Salary:</FormLabel>
              <StyledInput name="MONTHLY_SALARY" value={editableMember.MONTHLY_SALARY || ""} onChange={handleChange} />
            </FormGroup>

            <SectionTitle>Contributions</SectionTitle>
            <FormGroup>
              <FormLabel>SSS:</FormLabel>
              <StyledInput
                name="MEMBER_SSS"
                value={editableMember.CONTRIBUTIONS?.MEMBER_SSS || ""}
                onChange={(e) => handleNestedChange("CONTRIBUTIONS", "MEMBER_SSS", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>PhilHealth:</FormLabel>
              <StyledInput
                name="MEMBER_PHILHEALTH"
                value={editableMember.CONTRIBUTIONS?.MEMBER_PHILHEALTH || ""}
                onChange={(e) => handleNestedChange("CONTRIBUTIONS", "MEMBER_PHILHEALTH", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>HDMF/Pag-IBIG:</FormLabel>
              <StyledInput
                name="MEMBER_PAGIBIG"
                value={editableMember.CONTRIBUTIONS?.MEMBER_PAGIBIG || ""}
                onChange={(e) => handleNestedChange("CONTRIBUTIONS", "MEMBER_PAGIBIG", e.target.value)}
              />
            </FormGroup>

            <SectionTitle>Leaves</SectionTitle>
            <FormGroup>
              <FormLabel>Vacation Leave:</FormLabel>
              <StyledInput
                name="MEMBER_VACATION"
                value={editableMember.LEAVES?.MEMBER_VACATION || ""}
                onChange={(e) => handleNestedChange("LEAVES", "MEMBER_VACATION", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Sick Leave:</FormLabel>
              <StyledInput
                name="MEMBER_SICK"
                value={editableMember.LEAVES?.MEMBER_SICK || ""}
                onChange={(e) => handleNestedChange("LEAVES", "MEMBER_SICK", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Emergency Leave:</FormLabel>
              <StyledInput
                name="MEMBER_EMERGENCY"
                value={editableMember.LEAVES?.MEMBER_EMERGENCY || ""}
                onChange={(e) => handleNestedChange("LEAVES", "MEMBER_EMERGENCY", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Maternity Leave:</FormLabel>
              <StyledInput
                name="MEMBER_MATERNITY"
                value={editableMember.LEAVES?.MEMBER_MATERNITY || ""}
                onChange={(e) => handleNestedChange("LEAVES", "MEMBER_MATERNITY", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Paternity Leave:</FormLabel>
              <StyledInput
                name="MEMBER_PATERNITY"
                value={editableMember.LEAVES?.MEMBER_PATERNITY || ""}
                onChange={(e) => handleNestedChange("LEAVES", "MEMBER_PATERNITY", e.target.value)}
              />
            </FormGroup>
          </StyledForm>
        ) : (
          <p>No member details available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => onDelete(editableMember.MEMBER_ID)}>Delete</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberDetailsModal;

// Styled Components
const StyledForm = styled(Form)`
  padding: 0;
`;

// const ProfileContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 20px;
// `;

// const ProfileImage = styled.img`
//   width: 120px;
//   height: 120px;
//   border-radius: 50%;
//   object-fit: cover;
//   border: 2px solid #ddd;
// `;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const FormLabel = styled.label`
  font-weight: 500;
  min-width: 120px;
  text-align: left;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 4px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
