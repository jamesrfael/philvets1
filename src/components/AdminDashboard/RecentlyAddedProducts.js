import React from "react";
import styled from "styled-components";
import { colors } from "../../colors";

const sampleData = [
  { id: 1, name: "Product D", addedDate: "2024-08-18" },
  { id: 2, name: "Product E", addedDate: "2024-08-19" },
  { id: 3, name: "Product F", addedDate: "2024-08-20" },
];

const RecentlyAddedProducts = () => {
  return (
    <TableWrapper>
      <h3>Recently Added Products</h3>
      <Table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.addedDate}</td>
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


export default RecentlyAddedProducts;
