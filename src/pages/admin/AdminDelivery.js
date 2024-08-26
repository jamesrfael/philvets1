import React, { useState } from "react";
import LayoutHS from "../../components/LayoutHS";
import styled from "styled-components";
import DeliveryDetailsModal from "../../components/AdminDelivery/DeliveryDetailsModal";
import { colors } from "../../colors";
import { deliveries } from "../data/DeliveryData";
import SearchBar from "../../components/SearchBar"; // Import the reusable SearchBar component

const AdminDelivery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const filteredDeliveries = deliveries.filter((delivery) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      delivery.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.date.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      delivery.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const calculateTotalQuantity = (orderDetails) =>
    orderDetails.reduce((sum, item) => sum + item.quantity, 0);

  const calculateTotalAmount = (orderDetails) =>
    orderDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const openDetailsModal = (delivery) =>
    setSelectedDelivery({
      ...delivery,
      totalQuantity: calculateTotalQuantity(delivery.orderDetails),
      totalAmount: calculateTotalAmount(delivery.orderDetails),
    });

  const closeDetailsModal = () => setSelectedDelivery(null);

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Order Date</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredDeliveries.map((delivery, index) => (
            <TableRow key={index}>
              <TableCell>{delivery.name}</TableCell>
              <TableCell>{delivery.date}</TableCell>
              <TableCell>{delivery.type}</TableCell>
              <TableCell>
                <Status status={delivery.status}>{delivery.status}</Status>
              </TableCell>
              <TableCell>
                <ActionButton onClick={() => openDetailsModal(delivery)}>
                  Details
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {selectedDelivery && (
        <DeliveryDetailsModal
          delivery={selectedDelivery}
          onClose={closeDetailsModal}
        />
      )}
    </LayoutHS>
  );
};

// Styled components

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 16px;
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
  color: white;
  padding: 12px;
  text-align: center;
  font-size: 17px;
  background-color: ${colors.primary};
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

export default AdminDelivery;
