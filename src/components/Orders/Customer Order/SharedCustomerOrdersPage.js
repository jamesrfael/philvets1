import React, { useState } from "react";
import styled from "styled-components";
import AddCustomerOrderModal from "./AddCustomerOrderModal";
import SearchBar from "../../../components/Layout/SearchBar";
import Table from "../../../components/Layout/Table";
import CardTotalCustomerOrder from "../../../components/CardsData/CardTotalCustomerOrder";
import Button from "../../../components/Layout/Button";
import { customerOrders } from "../../../data/CustomerOrderData";
import { FaPlus } from "react-icons/fa";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import CustomerOrderDetailsModal from "./CustomerOrderDetailsModal";

const SharedCustomerOrdersPage = () => {
  const [customer] = useState(customerOrders); // Use customer data instead of orders
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingCustomerOrder, setIsAddingCustomerOrder] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "SALES_ORDER_DATACREATED",
    direction: "desc",
  }); // Default sorting set to Date

  // Filter Customer Orders and apply search term
  const filteredSales = customer.filter((sale) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      sale.CLIENT_ID?.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.SALES_ORDER_DATACREATED.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Sort filtered customer based on sortConfig
  const sortedSales = filteredSales.sort((a, b) => {
    if (sortConfig.key === "SALES_ORDER_DATACREATED") {
      return (
        (new Date(b.SALES_ORDER_DATACREATED) -
          new Date(a.SALES_ORDER_DATACREATED)) *
        (sortConfig.direction === "asc" ? 1 : -1)
      );
    }
    return (
      a.CLIENT_ID.localeCompare(b.CLIENT_ID) *
      (sortConfig.direction === "asc" ? 1 : -1)
    );
  });

  const openDetailsModal = (sale) => setSelectedOrder(sale);
  const closeDetailsModal = () => setSelectedOrder(null);

  const openAddCustomerOrderModal = () => setIsAddingCustomerOrder(true); // Open modal function
  const closeAddCustomerOrderModal = () => setIsAddingCustomerOrder(false); // Close modal function

  // Update headers to exclude Total Amount
  const headers = ["Client ID", "Order Date", "Payment Status", "Action"]; // Updated headers

  const rows = sortedSales.map((sale) => [
    sale.CLIENT_ID, // Show CLIENT_ID
    sale.SALES_ORDER_DATACREATED, // Show order creation date
    <Status status={sale.SALES_ORDER_PYMNT_STAT}>
      {sale.SALES_ORDER_PYMNT_STAT}
    </Status>, // Example status mapping
    <Button onClick={() => openDetailsModal(sale)} fontSize="14px">
      Details
    </Button>,
  ]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <Controls>
        <SearchBar
          placeholder="Search / Filter customer... "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledButton onClick={openAddCustomerOrderModal}>
          <FaPlus className="icon" /> Customer Order
        </StyledButton>
      </Controls>
      <AnalyticsContainer>
        <CardTotalCustomerOrder />
      </AnalyticsContainer>
      <Table
        headers={headers.map((header, index) => (
          <TableHeader
            key={index}
            onClick={() =>
              handleSort(
                header === "Order Date"
                  ? "SALES_ORDER_DATACREATED"
                  : "CLIENT_ID"
              )
            }
          >
            {header}
            {(header === "Order Date" || header === "Client ID") && (
              <>
                {sortConfig.key ===
                (header === "Order Date"
                  ? "SALES_ORDER_DATACREATED"
                  : "CLIENT_ID") ? (
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
        <CustomerOrderDetailsModal
          order={selectedOrder}
          onClose={closeDetailsModal}
        />
      )}
      {isAddingCustomerOrder && (
        <AddCustomerOrderModal onClose={closeAddCustomerOrderModal} />
      )}
    </>
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
      : "#ff5757"}; // Change colors based on payment status
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
  text-align: center; /* Center the header text */
  cursor: pointer; /* Change cursor to pointer */
  display: flex; /* Use flex to align items */
  justify-content: center; /* Center content */
  align-items: center; /* Center vertically */
`;

export default SharedCustomerOrdersPage;
