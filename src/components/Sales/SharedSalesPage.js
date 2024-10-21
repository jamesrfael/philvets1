import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../Layout/SearchBar";
import Table from "../Layout/Table";
import ReportCard from "../Layout/ReportCard";
import { FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { SALES_ORDER } from "../../data/CustomerOrderData";
import PURCHASE_ORDERS from "../../data/PurchaseOrderData"; // Import purchase orders data

const SharedSalesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Combine sales and purchase orders into a single array
  const combinedOrders = [];

  // Process sales orders
  SALES_ORDER.forEach((order) => {
    combinedOrders.push({
      id: order.SALES_ORDER_ID,
      date: new Date(order.SALES_ORDER_DLVRY_DATE),
      quantity: order.SALES_ORDER_TOT_QTY,
      amount: order.SALES_ORDER_PROD_TOTAL, // Positive amount for sales
      type: "Sales Order",
    });
  });

  // Process purchase orders
  PURCHASE_ORDERS.forEach((order) => {
    combinedOrders.push({
      id: order.PURCHASE_ORDER_ID,
      date: new Date(order.PURCHASE_ORDER_DATE),
      quantity: -order.PURCHASE_ORDER_TOT_QTY, // Negative quantity for expenses
      amount: -order.PURCHASE_ORDER_TOTAL, // Negative amount for expenses
      type: "Purchase Order",
    });
  });

  // Filter combined orders based on search term and date range
  const filteredOrders = combinedOrders.filter((order) => {
    const matchesSearchTerm =
      order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.type.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by order type
      order.date.toLocaleDateString().includes(searchTerm) || // Search by formatted date
      order.quantity
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.amount.toFixed(2).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange =
      (!startDate || order.date >= new Date(startDate)) &&
      (!endDate || order.date <= new Date(endDate));

    return matchesSearchTerm && matchesDateRange;
  });

  // Sort the filtered orders by date in descending order (latest first)
  const sortedOrders = filteredOrders.sort((a, b) => b.date - a.date);

  const totalOrders = sortedOrders.length;
  const totalSales = sortedOrders.reduce(
    (acc, order) => acc + (order.amount > 0 ? order.amount : 0),
    0
  );
  const totalExpenses = sortedOrders.reduce(
    (acc, order) => acc + (order.amount < 0 ? -order.amount : 0),
    0
  );
  const netProfit = totalSales - totalExpenses;

  // Format number with currency and thousand separators
  const formatCurrency = (value) => {
    return `₱${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // Map the filtered orders to display the necessary fields in the correct order
  const tableData = sortedOrders.map((order) => [
    order.type, // Type first
    order.id,
    order.date.toLocaleDateString(),
    order.quantity,
    formatCurrency(order.amount),
  ]);

  const header = ["Type", "Order ID", "Date", "Quantity", "Amount"]; // Updated header order

  return (
    <>
      <Controls>
        <SearchBar
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DateContainer>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </DateContainer>
      </Controls>

      <CardsContainer>
        <ReportCard
          label="Total Orders"
          value={`${totalOrders} Orders`}
          icon={<FaShoppingCart />}
        />
        <ReportCard
          label="Total Sales Value"
          value={formatCurrency(totalSales)}
          icon={<FaDollarSign />}
        />
        <ReportCard
          label="Total Expenses"
          value={`${formatCurrency(-totalExpenses)}`} // Negative sign behind the value
          icon={<FaDollarSign />}
        />
        <ReportCard
          label="Net Profit"
          value={formatCurrency(netProfit)}
          icon={<FaDollarSign />}
        />
      </CardsContainer>

      <ReportContent>
        <Table headers={header} rows={tableData} />
      </ReportContent>
    </>
  );
};

// Styled components
const Controls = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  label {
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  input {
    margin-left: 0.5rem;
    padding: 0.3rem;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    margin-top: 0;

    label {
      margin-left: 1rem;
    }
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ReportContent = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  min-height: 200px;
  text-align: center;
`;

export default SharedSalesPage;
