import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../Layout/SearchBar";
import Table from "../Layout/Table";
import ReportCard from "../Layout/ReportCard";
import { FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { SALES_ORDER } from "../../data/CustomerOrderData";
import PURCHASE_ORDERS from "../../data/PurchaseOrderData";
import { colors } from "../../colors"; // Import colors from colors.js

const SharedSalesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const combinedOrders = [];

  // Process sales orders
  SALES_ORDER.forEach((order) => {
    combinedOrders.push({
      id: order.SALES_ORDER_ID,
      date: new Date(order.SALES_ORDER_DLVRY_DATE),
      quantity: order.SALES_ORDER_TOT_QTY,
      amount: order.SALES_ORDER_PROD_TOTAL,
      type: "Sales Order",
    });
  });

  // Process purchase orders
  PURCHASE_ORDERS.forEach((order) => {
    combinedOrders.push({
      id: order.PURCHASE_ORDER_ID,
      date: new Date(order.PURCHASE_ORDER_DATE),
      quantity: -order.PURCHASE_ORDER_TOT_QTY,
      amount: -order.PURCHASE_ORDER_TOTAL,
      type: "Purchase Order",
    });
  });

  const filteredOrders = combinedOrders.filter((order) => {
    const matchesSearchTerm =
      order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.date.toLocaleDateString().includes(searchTerm) ||
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

  const formatCurrency = (value) => {
    return `₱${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const tableData = sortedOrders.map((order) => [
    order.type,
    order.id,
    order.date.toLocaleDateString(),
    order.quantity,
    formatCurrency(order.amount),
  ]);

  const header = ["Type", "Order ID", "Date", "Quantity", "Amount"];

  const pieChartData = [
    { name: "Sales", value: totalSales },
    { name: "Expenses", value: totalExpenses },
    { name: "Profit", value: netProfit },
  ];

  // Custom Tooltip Component for formatting values
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p>{`${name} : ${formatCurrency(value)}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom label function for pie slices
  const renderCustomLabel = ({ name, value }) =>
    `${name}: ${formatCurrency(value)}`;

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
          label="Sales Value"
          value={formatCurrency(totalSales)}
          icon={<FaDollarSign />}
        />
        <ReportCard
          label="Expenses"
          value={`${formatCurrency(-totalExpenses)}`}
          icon={<FaDollarSign />}
        />
        <ReportCard
          label="Profit"
          value={formatCurrency(netProfit)}
          icon={<FaDollarSign />}
        />
      </CardsContainer>

      {/* Pie Chart Container */}
      <ChartWrapper>
        <h3>Pie Chart</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={colors.primary}
            dataKey="value"
            label={renderCustomLabel}
          >
            <Cell fill={colors.blue} />
            <Cell fill={colors.red} />
            <Cell fill={colors.green} />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ChartWrapper>

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

const ChartWrapper = styled.div`
  width: 320px;
  background-color: ${colors.background};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 20px auto;
`;

const ReportContent = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  min-height: 200px;
  text-align: center;
`;

export default SharedSalesPage;
