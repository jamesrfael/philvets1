import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import PurchaseOrderDetailsModal from "../../components/Orders/Purchase Order/PurchaseOrderDetailsModal";
import AddPurchaseOrderModal from "../../components/Orders/Purchase Order/AddPurchaseOrderModal";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalPurchaseOrder from "../../components/CardsData/CardTotalPurchaseOrder";
import Button from "../../components/Layout/Button";
import PURCHASE_ORDERS from "../../pages/data/PurchaseOrderData"; // Make sure this path is correct
import { FaPlus, FaChevronUp, FaChevronDown } from "react-icons/fa";

const AdminPurchaseOrder = () => {
  const navigate = useNavigate();
  const [orders] = useState(PURCHASE_ORDERS); // Use PURCHASE_ORDERS directly
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingPurchaseOrder, setIsAddingPurchaseOrder] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "PURCHASE_ORDER_DATE",
    direction: "desc",
  });

  const filteredOrders = (orders || []).filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      order.SUPPLIER_ID.toString().includes(lowerCaseSearchTerm) ||
      order.PURCHASE_ORDER_DATE.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.PURCHASE_ORDER_STATUS.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortConfig.key === "PURCHASE_ORDER_DATE") {
      return (
        (new Date(b.PURCHASE_ORDER_DATE) - new Date(a.PURCHASE_ORDER_DATE)) *
        (sortConfig.direction === "asc" ? 1 : -1)
      );
    }
    return a.PURCHASE_ORDER_ID - b.PURCHASE_ORDER_ID; // Ensure correct comparison
  });

  const openDetailsModal = (order) => setSelectedOrder(order);
  const closeDetailsModal = () => setSelectedOrder(null);
  const openAddPurchaseOrderModal = () => setIsAddingPurchaseOrder(true);
  const closeAddPurchaseOrderModal = () => setIsAddingPurchaseOrder(false);

  const headers = ["Supplier ID", "Order Date", "Status", "Action"];

  const rows = sortedOrders.map((order) => {
    return [
      order.SUPPLIER_ID, // Display supplier ID
      order.PURCHASE_ORDER_DATE,
      <Status status={order.PURCHASE_ORDER_STATUS || "Pending"}>
        {order.PURCHASE_ORDER_STATUS || "Pending"}
      </Status>, // Use the new Status component
      <Button onClick={() => openDetailsModal(order)} fontSize="14px">
        Details
      </Button>,
    ];
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter purchase orders... "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledButton onClick={openAddPurchaseOrderModal}>
          <FaPlus className="icon" /> Purchase Order
        </StyledButton>
      </Controls>
      <AnalyticsContainer>
        <div onClick={() => navigate("/admin/orders/purchase-order")}>
          <CardTotalPurchaseOrder />
        </div>
      </AnalyticsContainer>
      <Table
        headers={headers.map((header, index) => (
          <TableHeader
            key={index}
            onClick={() =>
              handleSort(
                header === "Order Date" ? "PURCHASE_ORDER_DATE" : "SUPPLIER_ID"
              )
            }
          >
            {header}
            {(header === "Order Date" || header === "Supplier ID") && (
              <>
                {sortConfig.key ===
                (header === "Order Date"
                  ? "PURCHASE_ORDER_DATE"
                  : "SUPPLIER_ID") ? (
                  sortConfig.direction === "asc" ? (
                    <FaChevronUp
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                  ) : (
                    <FaChevronDown
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                  )
                ) : (
                  <span style={{ opacity: 0.5 }}>
                    <FaChevronUp
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                    <FaChevronDown
                      style={{ marginLeft: "5px", fontSize: "12px" }}
                    />
                  </span>
                )}
              </>
            )}
          </TableHeader>
        ))}
        rows={rows}
      />
      {selectedOrder && (
        <PurchaseOrderDetailsModal
          order={selectedOrder}
          onClose={closeDetailsModal}
        />
      )}
      {isAddingPurchaseOrder && (
        <AddPurchaseOrderModal onClose={closeAddPurchaseOrderModal} />
      )}
    </MainLayout>
  );
};

// Styled Components
const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const Status = styled.span`
  background-color: ${(props) =>
    props.status === "Paid"
      ? "#1DBA0B"
      : props.status === "Pending"
      ? "#f08400"
      : "#1DBA0B"}; // Change colors based on payment status
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;

  .icon {
    font-size: 20px;
    margin-right: 8px;
  }
`;

const TableHeader = styled.th`
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AdminPurchaseOrder;
