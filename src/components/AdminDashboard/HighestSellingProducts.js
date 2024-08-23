import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

const sampleData = [
  { id: 1, name: "Product A", quantity: 150, revenue: "₱ 15,000" },
  { id: 2, name: "Product B", quantity: 120, revenue: "₱ 12,000" },
  { id: 3, name: "Product C", quantity: 100, revenue: "₱ 10,000" },
];

const HighestSellingProducts = () => {
  return (
    <TableWrapper>
      <h3>Highest Selling Products</h3>
      <Table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.revenue}</td>
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

export default HighestSellingProducts;
