import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

const sampleData = [
  { id: 1, date: "2024-08-20", product: "Product A", amount: "₱ 5,000" },
  { id: 2, date: "2024-08-21", product: "Product B", amount: "₱ 4,000" },
  { id: 3, date: "2024-08-22", product: "Product C", amount: "₱ 6,000" },
];

const LatestSales = () => {
  return (
    <TableWrapper>
      <h3>Latest Sales</h3>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.date}</td>
              <td>{sale.product}</td>
              <td>{sale.amount}</td>
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

  h3{
    margin-bottom: 10px;
    font-weight: bold;
  }
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
`;

export default LatestSales;
