import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import initialEmployee from "../../data/MembersData"; // Correct import
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import Button from "../../components/Layout/Button";

const SharedPayrollPage = () => {
  const [EMPLOYEE] = useState(initialEmployee);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering employee list based on search term
  const filteredEmployee = EMPLOYEE.filter((member) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      member.MEMBER_FIRSTNAME.toLowerCase().includes(lowerCaseSearchTerm) ||
      (member.MEMBER_MIDDLENAME && member.MEMBER_MIDDLENAME.toLowerCase().includes(lowerCaseSearchTerm)) ||
      member.MEMBER_LASTNAME.toLowerCase().includes(lowerCaseSearchTerm) ||
      member.MEMBER_EMAIL.toLowerCase().includes(lowerCaseSearchTerm) ||
      member.MEMBER_ID.toString().includes(lowerCaseSearchTerm) // Searching by ID
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

  // Table Rows
  const rows = filteredEmployee.map((member) => [
    <TableCell width={columnWidths.name}>
      {`${member.MEMBER_FIRSTNAME} ${member.MEMBER_MIDDLENAME ? member.MEMBER_MIDDLENAME + " " : ""}${member.MEMBER_LASTNAME}`}
    </TableCell>,
    <TableCell width={columnWidths.payslip}>{member.MEMBER_PAYSLIP_NO || "N/A"}</TableCell>,
    <TableCell width={columnWidths.id}>{member.MEMBER_ID}</TableCell>,
    <TableCell width={columnWidths.company}>{member.MEMBER_COMPANY || "N/A"}</TableCell>,
    <TableCell width={columnWidths.department}>{member.MEMBER_DEPARTMENT || "N/A"}</TableCell>,
    <TableCell width={columnWidths.position}>{member.MEMBER_POSITION || "N/A"}</TableCell>,
    <TableCell width={columnWidths.status}>{member.MEMBER_STATUS || "N/A"}</TableCell>,
    <TableCell width={columnWidths.action}>
      <ActionButton>Details</ActionButton>
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
