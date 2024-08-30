import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

const DashboardTable = ({ title, headers, data }) => {
  return (
    <TableWrapper>
      <h3>{title}</h3>
      <Table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  flex: 1;
  min-width: 45%; /* Ensures the table occupies about half of the row */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;

  th, td {
    padding: 0.75rem;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: ${colors.primary};
    color: white;
  }

  th:nth-child(1) { width: 30%; } /* Adjust the width as needed */
  th:nth-child(2) { width: 40%; } /* Adjust the width as needed */
  th:nth-child(3) { width: 30%; } /* Adjust the width as needed */
`;

export default DashboardTable;
