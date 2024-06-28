import React from "react";
import { Table } from "antd"; // Assuming you're using Ant Design for UI components
import SampleUsers from "../pages/data/Sampledata";
import { TbEye, TbEdit, TbTrash } from "react-icons/tb"; // Importing icons
import styled from "styled-components";

const AdminStaffTable = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <StyledButton color="blue" icon={<TbEye />} />
          <StyledButton color="green" icon={<TbEdit />} />
          <StyledButton color="red" icon={<TbTrash />} />
        </span>
      ),
    },
  ];

  return (
    <Container>
      <Title>Table Title</Title>
      <TableWrapper>
        <Table columns={columns} dataSource={SampleUsers} scroll={{ x: true, y: true }} pagination={false} />
      </TableWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
  overflow-x: auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const TableWrapper = styled.div`
  max-height: 100vh;
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.color};
  margin-right: 5px;
  border: none;
  color: white;
  padding: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default AdminStaffTable;
