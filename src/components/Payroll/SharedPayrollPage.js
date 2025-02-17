import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import initialEmployee from "../../data/MembersData";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import Button from "../../components/Layout/Button";
import MemberPayrollDetailsModal from "../Payroll/MemberPayrollDetailsModal";

const SharedPayrollPage = () => {
  const [EMPLOYEE] = useState(initialEmployee);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  // Filtering employee list based on search term (trim the input for better matching)
  const filteredEmployee = EMPLOYEE.filter((member) => {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    return (
      member.MEMBER_FIRSTNAME.toLowerCase().includes(lowerCaseSearchTerm) ||
      (member.MEMBER_MIDDLENAME &&
        member.MEMBER_MIDDLENAME.toLowerCase().includes(lowerCaseSearchTerm)) ||
      member.MEMBER_LASTNAME.toLowerCase().includes(lowerCaseSearchTerm) ||
      member.MEMBER_EMAIL.toLowerCase().includes(lowerCaseSearchTerm) ||
      member.MEMBER_ID.toString().includes(lowerCaseSearchTerm)
    );
  });

  // Define column widths
  const columnWidths = {
    name: "200px",
    payslip: "130px",
    id: "100px",
    company: "150px",
    department: "150px",
    position: "150px",
    status: "120px",
    action: "100px",
  };

  // Table Headers
  const headers = [
    <TableHeader width={columnWidths.name}>Name</TableHeader>,
    <TableHeader width={columnWidths.payslip}>Payslip No.</TableHeader>,
    <TableHeader width={columnWidths.id}>ID No.</TableHeader>,
    <TableHeader width={columnWidths.company}>Company</TableHeader>,
    <TableHeader width={columnWidths.department}>Department</TableHeader>,
    <TableHeader width={columnWidths.position}>Position</TableHeader>,
    <TableHeader width={columnWidths.status}>Status</TableHeader>,
    <TableHeader width={columnWidths.action}>Action</TableHeader>,
  ];

  // Table Rows with destructuring
  const rows = filteredEmployee.map(({ 
    MEMBER_FIRSTNAME, 
    MEMBER_MIDDLENAME, 
    MEMBER_LASTNAME, 
    MEMBER_PAYSLIP_NO, 
    MEMBER_ID, 
    MEMBER_COMPANY, 
    MEMBER_DEPARTMENT, 
    MEMBER_POSITION, 
    MEMBER_STATUS }) => [
    <TableCell width={columnWidths.name}>
      {`${MEMBER_FIRSTNAME} ${MEMBER_MIDDLENAME ? MEMBER_MIDDLENAME + " " : ""}${MEMBER_LASTNAME}`}
    </TableCell>,
    <TableCell width={columnWidths.payslip}>{MEMBER_PAYSLIP_NO || "N/A"}</TableCell>,
    <TableCell width={columnWidths.id}>{MEMBER_ID}</TableCell>,
    <TableCell width={columnWidths.company}>{MEMBER_COMPANY || "N/A"}</TableCell>,
    <TableCell width={columnWidths.department}>{MEMBER_DEPARTMENT || "N/A"}</TableCell>,
    <TableCell width={columnWidths.position}>{MEMBER_POSITION || "N/A"}</TableCell>,
    <TableCell width={columnWidths.status}>{MEMBER_STATUS || "N/A"}</TableCell>,
    <TableCell width={columnWidths.action}>
      <ActionButton onClick={() => setSelectedMember({ MEMBER_FIRSTNAME, MEMBER_MIDDLENAME, MEMBER_LASTNAME })}>
        Details
      </ActionButton>
    </TableCell>,
  ]);

  return (
    <>
      <Controls>
        <SearchBar
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <Table headers={headers} rows={rows} />
      {selectedMember && (
        <MemberPayrollDetailsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
};

// Styled Components
const Controls = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const TableHeader = styled.th`
  width: ${({ width }) => width};
  text-align: center;
  padding: 8px;
`;

const TableCell = styled.td`
  width: ${({ width }) => width};
  text-align: center;
`;

const ActionButton = styled(Button)`
  width: 80px;
  background-color: ${colors.secondary};
  &:hover {
    background-color: ${colors.secondaryHover};
  }
`;

export default SharedPayrollPage;
