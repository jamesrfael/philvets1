import React, { useState } from "react";
import Modal from "../Layout/Modal";
import styled from "styled-components";
import Button from "../Layout/Button";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

const AddMemberModal = ({ onClose, onAdd }) => {
  const [member, setMember] = useState({
    idNumber: "",
    lastName: "",
    firstName: "",
    middleName: "",
    email: "",
    contactNumber: "",
    dateHired: "",
    company: "",
    department: "",
    position: "",
    status: "",
    dailyRate: 0,
    basicPay: 0,
    monthlySalary: 0,
    sss: 0,
    philhealth: 0,
    pagibig: 0,
    vacationLeave: 0,
    sickLeave: 0,
    emergencyLeave: 0,
    maternityLeave: 0,
    paternityLeave: 0,
    profilePicture: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMember((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMember = async () => {
    if (!member.idNumber || !member.lastName || !member.firstName || !member.email) {
      alert("Please fill all required fields.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/members", member);
      if (response.status === 201) {
        alert("Member added successfully!");
        onAdd(response.data.member); // Pass the new member data to parent component
        onClose();
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || "Failed to add member"}`);
    }
    setLoading(false);
  };  

  return (
    <Modal title="Add New Member" onClose={onClose}>
      <Form>
        <SectionTitle>Profile Picture</SectionTitle>
        <ImageUploadContainer>
          {member.profilePicture ? (
            <ProfileImage src={member.profilePicture} alt="Profile" />
          ) : (
            <ImagePlaceholder>
              <FaCamera size={30} color="#ccc" />
            </ImagePlaceholder>
          )}
          <StyledInput type="file" accept="image/*" onChange={handleImageChange} />
        </ImageUploadContainer>
        <SectionTitle>Basic Information</SectionTitle>
        <ColumnContainer>
          <Row>
            <Label>ID Number:</Label>
            <Input type="text" name="idNumber" value={member.idNumber} onChange={handleChange} />
          </Row>
          <Row>
            <Label>Last Name:</Label>
            <Input type="text" name="lastName" value={member.lastName} onChange={handleChange} />
          </Row>
          <Row>
            <Label>First Name:</Label>
            <Input type="text" name="firstName" value={member.firstName} onChange={handleChange} />
          </Row>
          <Row>
            <Label>Middle Name:</Label>
            <Input type="text" name="middleName" value={member.middleName} onChange={handleChange} />
          </Row>
        </ColumnContainer>
        <SectionTitle>Contact Information</SectionTitle>
        <ColumnContainer>
          <Row>
            <Label>Email Address:</Label>
            <Input type="email" name="email" value={member.email} onChange={handleChange} />
          </Row>
          <Row>
            <Label>Contact Number:</Label>
            <Input type="text" name="contactNumber" value={member.contactNumber} onChange={handleChange} />
          </Row>
        </ColumnContainer>
        <SectionTitle>Employment Information</SectionTitle>
        <Row>
          <Label>Date Hired:</Label>
          <Input type="date" name="dateHired" value={member.dateHired} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Company:</Label>
          <Select name="company" value={member.company} onChange={handleChange}>
            <option value="">Select Company</option>
            <option value="Open'Space Technologies Inc.">Open'Space Technologies Inc.</option>
            <option value="IT Central Global Corp">IT Central Global Corp</option>
          </Select>
        </Row>
        <Row>
          <Label>Department:</Label>
          <Select name="department" value={member.department} onChange={handleChange}>
            <option value="">Select Department</option>
            <option value="Software Development">Software Development</option>
            <option value="Admin">Admin</option>
            <option value="Sales">Sales</option>
            <option value="Technician">Technician</option>
          </Select>
        </Row>
        <Row>
          <Label>Position:</Label>
          <Input type="text" name="position" value={member.position} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Status:</Label>
          <Select name="status" value={member.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Regular">Regular</option>
            <option value="Probationary">Probationary</option>
            <option value="OJT">OJT</option>
          </Select>
        </Row>
        <Row>
          <Label>Daily Rate:</Label>
          <Input type="number" name="dailyRate" value={member.dailyRate} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Basic Pay:</Label>
          <Input type="number" name="basicPay" value={member.basicPay} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Monthly Salary:</Label>
          <Input type="number" name="monthlySalary" value={member.monthlySalary} onChange={handleChange} />
        </Row>
        <SectionTitle>Contribution</SectionTitle>
        <Row>
          <Label>SSS:</Label>
          <Input type="text" name="sss" value={member.sss} onChange={handleChange} />
        </Row>
        <Row>
          <Label>PhilHealth:</Label>
          <Input type="text" name="philhealth" value={member.philhealth} onChange={handleChange} />
        </Row>
        <Row>
          <Label>HDMF/Pag-IBIG:</Label>
          <Input type="text" name="pagibig" value={member.pagibig} onChange={handleChange} />
        </Row>
        <SectionTitle>Leaves</SectionTitle>
        <Row>
          <Label>Vacation Leave:</Label>
          <Input type="number" name="vacationLeave" value={member.vacationLeave} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Sick Leave:</Label>
          <Input type="number" name="sickLeave" value={member.sickLeave} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Emergency Leave:</Label>
          <Input type="number" name="emergencyLeave" value={member.emergencyLeave} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Maternity Leave:</Label>
          <Input type="number" name="maternityLeave" value={member.maternityLeave} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Paternity Leave:</Label>
          <Input type="number" name="paternityLeave" value={member.paternityLeave} onChange={handleChange} />
        </Row>
        <p />
        <p />
        <ButtonGroup>
          <Button variant="red" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddMember}>
            Add Member
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
`;

const Label = styled.label`
  font-weight: normal;
  width: 200px; 
  text-align: left;
  padding-left: 60px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 375px;
  height: 35px;
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 375px;
  height: 35px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
`;

const ImagePlaceholder = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default AddMemberModal;
