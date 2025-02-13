import React, { useState } from "react";
import Modal from "../Layout/Modal";
import styled from "styled-components";
import Button from "../Layout/Button";

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
    monthlySalary: "",
    sss: "",
    philhealth: "",
    pagibig: "",
    vacationLeave: "",
    sickLeave: "",
    emergencyLeave: "",
    maternityLeave: "",
    paternityLeave: "",
  });

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
    onAdd(member);
    onClose();
  };

  return (
    <Modal title="Add New Member" onClose={onClose}>
      <Form>
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
          <Input type="text" name="company" value={member.company} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Department:</Label>
          <Input type="text" name="department" value={member.department} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Position:</Label>
          <Input type="text" name="position" value={member.position} onChange={handleChange} />
        </Row>
        <Row>
          <Label>Status:</Label>
          <Input type="text" name="status" value={member.status} onChange={handleChange} />
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
  width: 300px;
  height: 25px;
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

export default AddMemberModal;
