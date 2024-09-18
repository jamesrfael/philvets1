import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

// Table Component
const Table = ({ headers, rows }) => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <TableRow>
            {headers.map((header, index) => (
              <TableHeader key={index} data-column={header}>
                {header}
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} data-column={headers[cellIndex]}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

// Styled Components
const TableContainer = styled.div`
  max-height: 400px; /* Adjust this value as needed */
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin: 0 auto;
  padding: 0 16px;
`;

const TableHeader = styled.th`
  background-color: ${colors.primary};
  color: white;
  padding: 10px;
  border-top: 1px solid #ddd; /* Top border */
  border-bottom: 1px solid #ddd; /* Bottom border */
  font-size: 17px;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-top: 1px solid #ddd; /* Top border */
  border-bottom: 1px solid #ddd; /* Bottom border */
  font-size: 13px;
  
  &[data-column="Image"] {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  img {
    max-width: 100%; /* Ensure image doesn't overflow */
    max-height: 100px; /* Limit image height */
  }
`;

export default Table;
