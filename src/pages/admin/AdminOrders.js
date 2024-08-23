import React, { useState } from "react";
import LayoutHS from "../../components/LayoutHS";
import styled from "styled-components";
import OrderDetailsModal from "../../components/AdminOrders/OrderDetailsModal";
import AddPurchaseModal from "../../components/AdminOrders/AddPurchaseModal";
import AddSalesModal from "../../components/AdminOrders/AddSalesModal";
import { colors } from "../../colors";
import { orders as initialOrders } from "../data/OrderData";

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingPurchase, setIsAddingPurchase] = useState(false);
  const [isAddingSales, setIsAddingSales] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      order.orderType.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.orderDate.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.purchaseOrderStatus?.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.salesOrderStatus?.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.clientId?.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
      order.supplierId?.toString().toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const openDetailsModal = (order) => setSelectedOrder(order);
  const closeDetailsModal = () => setSelectedOrder(null);

  const openAddPurchaseModal = () => setIsAddingPurchase(true);
  const closeAddPurchaseModal = () => setIsAddingPurchase(false);

  const openAddSalesModal = () => setIsAddingSales(true);
  const closeAddSalesModal = () => setIsAddingSales(false);

  const handleSaveNewOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup>
          <AddButton onClick={openAddPurchaseModal}>Add Purchase</AddButton>
          <AddButton onClick={openAddSalesModal}>Add Sales</AddButton>
        </ButtonGroup>
      </Controls>
      <Table>
        <thead>
          <tr>
            <TableHeader>Order Type</TableHeader>
            <TableHeader>Order Date</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.orderType}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>
                <Status
                  status={order.purchaseOrderStatus || order.salesOrderStatus}
                >
                  {order.purchaseOrderStatus || order.salesOrderStatus}
                </Status>
              </TableCell>
              <TableCell>
                <ActionButton onClick={() => openDetailsModal(order)}>
                  Details
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeDetailsModal} />
      )}
      {isAddingPurchase && (
        <AddPurchaseModal
          onClose={closeAddPurchaseModal}
          onSave={handleSaveNewOrder}
        />
      )}
      {isAddingSales && (
        <AddSalesModal
          onClose={closeAddSalesModal}
          onSave={handleSaveNewOrder}
        />
      )}
    </LayoutHS>
  );
};

// Styled Components

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const SearchBar = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const AddButton = styled.button`
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
    props.status === "Approved" || props.status === "Received"
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
