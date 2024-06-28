// src/pages/AdminOrders.js

import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import OrderDetailsModal from "../../components/AdminOrders/OrderDetailsModal";
import { colors } from "../../colors";

const AdminOrders = () => {
  const orders = [
    {
      id: "0000001",
      name: "Christine",
      date: "Feb 14, 2023",
      type: "Purchase",
      status: "Completed",
    },
    {
      id: "0000002",
      name: "John",
      date: "Mar 5, 2023",
      type: "Return",
      status: "Pending",
    },
    {
      id: "0000003",
      name: "Sarah",
      date: "Apr 12, 2023",
      type: "Purchase",
      status: "Completed",
    },
    {
      id: "0000004",
      name: "Michael",
      date: "May 20, 2023",
      type: "Refund",
      status: "Cancelled",
    },
    // Add more examples as needed
  ];

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <LayoutHS>
      <Controls>
        <SearchBar placeholder="Search orders..." />
        <Button>Create Order</Button>
      </Controls>
      <FilterDropdown>
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" name="filter">
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="date">Order Date</option>
          <option value="type">Type</option>
          <option value="status">Status</option>
        </select>
      </FilterDropdown>
      <Table>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Order Date</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>
                <Status status={order.status}>{order.status}</Status>
              </TableCell>
              <TableCell>
                <ActionButton onClick={() => handleViewClick(order)}>
                  View
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeModal} />
      )}
    </LayoutHS>
  );
};

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
  justify-content: left;
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
  text-align: center;
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  padding: 0 16px;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 12px;
  text-align: center;
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

const Status = styled.span`
  background-color: ${(props) =>
    props.status === "Completed"
      ? "#1DBA0B"
      : props.status === "Pending"
      ? "#f08400"
      : props.status === "Cancelled"
      ? "#ff5757"
      : "gray"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
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

export default AdminOrders;
