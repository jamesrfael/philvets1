import React from "react";
import LayoutHS from "../../components/LayoutHS";
import styled from "styled-components";
import { colors } from "../../colors";

const AdminProducts = () => {
  const products = [
    { id: "0001", name: "Product A", category: "Category 1", unit: "Piece", brand: "Brand X", price: "₱100" },
    { id: "0002", name: "Product B", category: "Category 2", unit: "Box", brand: "Brand Y", price: "₱200" },
    { id: "0003", name: "Product C", category: "Category 1", unit: "Pack", brand: "Brand Z", price: "₱150" },
    { id: "0004", name: "Product D", category: "Category 3", unit: "Piece", brand: "Brand X", price: "₱300" },
    // Add more examples as needed
  ];

  return (
    <LayoutHS>
      <Controls>
        <SearchBar placeholder="Search products..." />
        <Button>Add Category</Button>
        <Button>Add Product</Button>
      </Controls>
      <FilterDropdown>
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" name="filter">
          <option value="id">ID</option>
          <option value="name">Product Name</option>
          <option value="category">Category</option>
          <option value="unit">Unit</option>
          <option value="brand">Brand</option>
          <option value="price">Price</option>
        </select>
      </FilterDropdown>
      <Table>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Product</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Unit</TableHeader>
            <TableHeader>Brand</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.unit}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <ActionButton>View</ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </LayoutHS>
  );
};

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 8px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

const SearchBar = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const FilterDropdown = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 16px;

  label {
    margin-right: 8px;
  }

  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  padding: 0 16px;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 12px;
  text-align: left;
  font-size: 16px;
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 12px;
  font-size: 16px;
`;

const ActionButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminProducts;
