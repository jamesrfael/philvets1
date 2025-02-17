import React, { useState, useEffect } from "react";
import Modal from "../Layout/Modal";
import styled from "styled-components";
import Button from "../Layout/Button";
import { colors } from "../../colors";

const MemberPayrollDetailsModal = ({ member, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState(member || {});

  useEffect(() => {
    setEditedMember(member);
  }, [member]);

  if (!member) return null;

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    if (window.confirm("Are you sure you want to save the changes?")) {
      alert("Member details saved");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to discard the changes?")) {
      setIsEditing(false);
      setEditedMember(member);
    }
  };

  const handleChange = (field, value) => {
    setEditedMember({ ...editedMember, [field]: value });
  };

  return (
    <Modal title="Payroll Details" onClose={onClose}>
      <Section>
        {/* 1st row: Payslip centered */}
        <PayslipContainer>
          <PayslipCard>
            <CardLabel>Payslip Number:</CardLabel>
            <CardContent>
              <InputField
                type="text"
                value={editedMember.MEMBER_PAYSLIP_NUMBER || ""}
                onChange={(e) => handleChange("MEMBER_PAYSLIP_NUMBER", e.target.value)}
                disabled={!isEditing}
              />
            </CardContent>
          </PayslipCard>
        </PayslipContainer>

        {/* 2nd row: Detail Labels (First Name, Middle Name, Last Name) */}
        <DetailLabel style={{ marginBottom: '-5px' }}>Employee Information: </DetailLabel>
        <StyledHr />
        <DetailsRow>
          <DetailsColumn>
            <DetailLabel>First Name: </DetailLabel>
          </DetailsColumn>
          <DetailsColumn>
            <DetailLabel>Middle Name: </DetailLabel>
          </DetailsColumn>
          <DetailsColumn>
            <DetailLabel>Last Name: </DetailLabel>
          </DetailsColumn>
        </DetailsRow>

        {/* 3rd row: Input Fields (First Name, Middle Name, Last Name) */}
        <DetailsRow>
          <DetailsColumn>
            <InputField
              type="text"
              value={editedMember.MEMBER_FIRSTNAME || ""}
              onChange={(e) => handleChange("MEMBER_FIRSTNAME", e.target.value)}
              disabled={!isEditing}
            />
          </DetailsColumn>
          <DetailsColumn>
            <InputField
              type="text"
              value={editedMember.MEMBER_MIDDLENAME || ""}
              onChange={(e) => handleChange("MEMBER_MIDDLENAME", e.target.value)}
              disabled={!isEditing}
            />
          </DetailsColumn>
          <DetailsColumn>
            <InputField
              type="text"
              value={editedMember.MEMBER_LASTNAME || ""}
              onChange={(e) => handleChange("MEMBER_LASTNAME", e.target.value)}
              disabled={!isEditing}
            />
          </DetailsColumn>
        </DetailsRow>

        {/* 4th row: Detail Labels (Company, Department, Position) */}
        <DetailsRow>
          <DetailsColumn>
            <DetailLabel>Company: </DetailLabel>
          </DetailsColumn>
          <DetailsColumn>
            <DetailLabel>Department: </DetailLabel>
          </DetailsColumn>
          <DetailsColumn>
            <DetailLabel>Position: </DetailLabel>
          </DetailsColumn>
        </DetailsRow>

        {/* 5th row: Input Fields (Company, Department, Position) */}
        <DetailsRow>
          <DetailsColumn>
            <InputField
              type="text"
              value={editedMember.MEMBER_COMPANY || ""}
              onChange={(e) => handleChange("MEMBER_COMPANY", e.target.value)}
              disabled={!isEditing}
            />
          </DetailsColumn>
          <DetailsColumn>
            <InputField
              type="text"
              value={editedMember.MEMBER_DEPARTMENT || ""}
              onChange={(e) => handleChange("MEMBER_DEPARTMENT", e.target.value)}
              disabled={!isEditing}
            />
          </DetailsColumn>
          <DetailsColumn>
            <InputField
              type="text"
              value={editedMember.MEMBER_POSITION || ""}
              onChange={(e) => handleChange("MEMBER_POSITION", e.target.value)}
              disabled={!isEditing}
            />
          </DetailsColumn>
        </DetailsRow>

        {/* 6th row: Detail Labels (Status, ID No) */}
        <DetailsRow>
          <DetailsColumn>
            <DetailLabel>Status: </DetailLabel>
          </DetailsColumn>
          <DetailsColumn>
            <DetailLabel>ID No: </DetailLabel>
          </DetailsColumn>
          <DetailsColumn></DetailsColumn>
        </DetailsRow>

        {/* 7th row: Input Fields (Status, ID No) */}
        <DetailsRow>
          <DetailsColumn>
            <InputField
              type="text"
              value={editedMember.MEMBER_STATUS || ""}
              onChange={(e) => handleChange("MEMBER_STATUS", e.target.value)}
              disabled={!isEditing}
            />
          </DetailsColumn>
          <DetailsColumn>
            <InputField
              type="text"
              value={editedMember.MEMBER_ID || ""}
              onChange={(e) => handleChange("MEMBER_ID", e.target.value)}
              disabled={!isEditing}
            />
          </DetailsColumn>
          <DetailsColumn></DetailsColumn>
        </DetailsRow>

        {/* Tables for Salary, Daily Rate, Working Days, and Leaves */}
        <DetailLabel style={{ marginBottom: '-5px', marginTop: '10px' }}>Salary Information: </DetailLabel>
        <StyledHr />
        <Table>
          <thead>
            <tr>
              <Th>Daily Rate</Th>
              <Th>Basic Pay</Th>
              <Th>Monthly Salary</Th>
              <Th>Working Days</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.DAILY_RATE || ""}
                  onChange={(e) => handleChange("DAILY_RATE", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.BASIC_PAY || ""}
                  onChange={(e) => handleChange("BASIC_PAY", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.MONTHLY_SALARY || ""}
                  onChange={(e) => handleChange("MONTHLY_SALARY", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.MEMBER_WORKING_DAYS || ""}
                  onChange={(e) => handleChange("MEMBER_WORKING_DAYS", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
            </tr>
          </tbody>
        </Table>

        <DetailLabel style={{ marginBottom: '-5px', marginTop: '10px' }}>Leave Information: </DetailLabel>
        <StyledHr />
        <Table>
          <thead>
            <tr>
              <Th>Leaves</Th>
              <Th>Days Used</Th>
              <Th>Leave Dates</Th>
              <Th>Remaining Days</Th>
            </tr>
          </thead>
          <tbody>
            {["Vacation", "Sick", "Emergency", "Maternity", "Paternity"].map((leaveType) => (
              <tr key={leaveType}>
                <Td isEditing={isEditing}>{leaveType}</Td>
                <Td isEditing={isEditing}>
                  <InputFieldTable
                    type="text"
                    value={editedMember[`MEMBER_${leaveType.toUpperCase()}_USED`] || "N/A"}
                    onChange={(e) => handleChange(`MEMBER_${leaveType.toUpperCase()}_USED`, e.target.value)}
                    disabled={!isEditing}
                  />
                </Td>
                <Td isEditing={isEditing}>
                  <InputFieldTable
                    type="text"
                    value={editedMember[`MEMBER_${leaveType.toUpperCase()}_DATES`] || "N/A"}
                    onChange={(e) => handleChange(`MEMBER_${leaveType.toUpperCase()}_DATES`, e.target.value)}
                    disabled={!isEditing}
                  />
                </Td>
                <Td isEditing={isEditing}>
                  <InputFieldTable
                    type="text"
                    value={editedMember[`MEMBER_${leaveType.toUpperCase()}_REMAINING`] || "N/A"}
                    onChange={(e) => handleChange(`MEMBER_${leaveType.toUpperCase()}_REMAINING`, e.target.value)}
                    disabled={!isEditing}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Employee Earnings Table */}
        <DetailLabel style={{ marginBottom: '-5px', marginTop: '10px' }}>Employee Earnings: </DetailLabel>
        <StyledHr />
        <Table style={{ tableLayout: 'auto' }}>
          <thead>
            <tr>
              <Th style={{ minWidth: '50px' }}>OT Hours</Th>
              <Th style={{ minWidth: '50px' }}>OT Total Amount</Th>
              <Th style={{ minWidth: '60px' }}>Transpo Allowance</Th>
              <Th style={{ minWidth: '50px' }}>Load Allowance</Th>
              <Th style={{ minWidth: '40px' }}>Incentives</Th>
              <Th style={{ minWidth: '50px' }}>Adjustments</Th>
              <Th style={{ minWidth: '50px' }}>Total</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.OT_HOURS || ""}
                  onChange={(e) => handleChange("OT_HOURS", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.OT_TOTAL_AMOUNT || ""}
                  onChange={(e) => handleChange("OT_TOTAL_AMOUNT", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.TRANSPO_ALLOWANCE || ""}
                  onChange={(e) => handleChange("TRANSPO_ALLOWANCE", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.LOAD_ALLOWANCE || ""}
                  onChange={(e) => handleChange("LOAD_ALLOWANCE", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.INCENTIVES || ""}
                  onChange={(e) => handleChange("INCENTIVES", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.ADJUSTMENTS || ""}
                  onChange={(e) => handleChange("ADJUSTMENTS", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.TOTAL || ""}
                  onChange={(e) => handleChange("TOTAL", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
            </tr>
          </tbody>
        </Table>

        {/* Social Taxes Table */}
        <DetailLabel style={{ marginBottom: '-5px', marginTop: '10px' }}>Deductions - Social Taxes: </DetailLabel>
        <StyledHr />
        <Table style={{ tableLayout: 'auto' }}>
          <thead>
            <tr>
              <Th style={{ minWidth: '100px' }}>Withholding Tax</Th>
              <Th style={{ minWidth: '100px' }}>SSS</Th>
              <Th style={{ minWidth: '100px' }}>PhilHealth</Th>
              <Th style={{ minWidth: '100px' }}>HDMF/Pag-IBIG</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.WITHHOLDING_TAX || ""}
                  onChange={(e) => handleChange("WITHHOLDING_TAX", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.SSS || ""}
                  onChange={(e) => handleChange("SSS", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.PHILHEALTH || ""}
                  onChange={(e) => handleChange("PHILHEALTH", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.HDMF_PAG_IBIG || ""}
                  onChange={(e) => handleChange("HDMF_PAG_IBIG", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
            </tr>
          </tbody>
        </Table>

        {/* Attendance Issues Table */}
        <DetailLabel style={{ marginBottom: '-5px', marginTop: '10px' }}>Deductions - Attendance Issues: </DetailLabel>
        <StyledHr />
        <Table style={{ tableLayout: 'auto' }}>
          <thead>
            <tr>
              <Th style={{ minWidth: '100px' }}>Tardiness (mins)</Th>
              <Th style={{ minWidth: '100px' }}>Tardiness (P/min)</Th>
              <Th style={{ minWidth: '100px' }}>Tardiness Total Amount (P)</Th>
              <Th style={{ minWidth: '100px' }}>Absent Days</Th>
              <Th style={{ minWidth: '100px' }}>Absent (P)</Th>
              <Th style={{ minWidth: '100px' }}>Total</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.TARDINESS_MINS || ""}
                  onChange={(e) => handleChange("TARDINESS_MINS", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.TARDINESS_P_PER_MIN || ""}
                  onChange={(e) => handleChange("TARDINESS_P_PER_MIN", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.TARDINESS_TOTAL_AMOUNT || ""}
                  onChange={(e) => handleChange("TARDINESS_TOTAL_AMOUNT", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.ABSENT_DAYS || ""}
                  onChange={(e) => handleChange("ABSENT_DAYS", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.ABSENT_P || ""}
                  onChange={(e) => handleChange("ABSENT_P", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.ATTENDANCE_TOTAL || ""}
                  onChange={(e) => handleChange("ATTENDANCE_TOTAL", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
            </tr>
          </tbody>
        </Table>

        {/* Loans Table */}
        <DetailLabel style={{ marginBottom: '-5px', marginTop: '10px' }}>Loans: </DetailLabel>
        <StyledHr />
        <Table style={{ tableLayout: 'auto' }}>
          <thead>
            <tr>
              <Th style={{ minWidth: '100px' }}>SSS Loan</Th>
              <Th style={{ minWidth: '100px' }}>Pag-IBIG Loan</Th>
              <Th style={{ minWidth: '100px' }}>Total</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.SSS_LOAN || ""}
                  onChange={(e) => handleChange("SSS_LOAN", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.PAG_IBIG_LOAN || ""}
                  onChange={(e) => handleChange("PAG_IBIG_LOAN", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.LOAN_TOTAL || ""}
                  onChange={(e) => handleChange("LOAN_TOTAL", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
            </tr>
          </tbody>
        </Table>

        {/* Others Table */}
        <DetailLabel style={{ marginBottom: '-5px', marginTop: '10px' }}>Others: </DetailLabel>
        <StyledHr />
        <Table style={{ tableLayout: 'auto' }}>
          <thead>
            <tr>
              <Th style={{ minWidth: '100px' }}>Cleanliness</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.CLEANLINESS || ""}
                  onChange={(e) => handleChange("CLEANLINESS", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
            </tr>
          </tbody>
        </Table>

        {/* Total Salary Table */}
        <DetailLabel style={{ marginBottom: '-5px', marginTop: '10px' }}>Total Salary: </DetailLabel>
        <StyledHr />
        <Table style={{ tableLayout: 'auto' }}>
          <thead>
            <tr>
              <Th style={{ minWidth: '100px' }}>Total Deductions</Th>
              <Th style={{ minWidth: '100px' }}>Gross Pay</Th>
              <Th style={{ minWidth: '100px' }}>Net Pay</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.TOTAL_DEDUCTIONS || ""}
                  onChange={(e) => handleChange("TOTAL_DEDUCTIONS", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.GROSS_PAY || ""}
                  onChange={(e) => handleChange("GROSS_PAY", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
              <Td isEditing={isEditing}>
                <InputFieldTable
                  type="text"
                  value={editedMember.NET_PAY || ""}
                  onChange={(e) => handleChange("NET_PAY", e.target.value)}
                  disabled={!isEditing}
                />
              </Td>
            </tr>
          </tbody>
        </Table>

        <ButtonGroup>
          {isEditing ? (
            <>
              <Button variant="red" onClick={handleCancel}>Cancel</Button>
              <Button variant="secondary" onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button variant="secondary" onClick={handleEdit}>Edit</Button>
          )}
        </ButtonGroup>
      </Section>
    </Modal>
  );
};

// Styled Components
const InputField = styled.input`
  width: 100%;
  padding: 3px;
  margin-bottom: 5px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const InputFieldTable = styled.input`
  width: 100%;
  padding: 3px;
  margin: 0;
  background-color: white;
  border: 1px solid #fff;
  border-radius: 5px;
  box-sizing: border-box;
`;

const StyledHr = styled.hr`
  border: 0;
  border-top: 1px solid #808080;
  margin-bottom: 10px;
  padding: -3px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const PayslipContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const PayslipCard = styled.div`
  background: #00539C;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 210px;
`;

const CardLabel = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const CardContent = styled.div`
  font-size: 20px;
  color: black;
  text-align: center;
`;

const DetailsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const DetailsColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.label`
  font-weight: bold;
`;

const Table = styled.table`
  margin-top: 10px;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th`
  background: ${colors.secondary};
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  width: 25%; 
`;

const Td = styled.td`
  color: black;
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
  
  /* Conditionally display input fields if editing is enabled */
  input {
    width: 100%;
    padding: 3px;
    margin: 0;
    background-color: white;
    border: 1px solid #fff;
    border-radius: 5px;
    box-sizing: border-box;
    text-align: center;
  }

  ${({ isEditing }) =>
    isEditing &&
    `
    input {
      display: inline-block;
    }
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export default MemberPayrollDetailsModal;
