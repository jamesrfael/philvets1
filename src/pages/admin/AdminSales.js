// src/pages/AdminSales.js
import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import { sales as initialSales } from "../data/SalesData";
import SalesDetailsModal from "../../components/Sales/SalesDetailsModal";
import CardTotalSales from "../../components/CardsData/CardTotalSales";
import CardTotalTransactions from "../../components/CardsData/CardTotalTransactions";
import Button from "../../components/Layout/Button"; // Import the Button component

const AdminSales = () => {
  const [sales] = useState(initialSales);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);

  const totalSalesInPesos = sales.reduce(
    (total, sale) => total + sale.SALES_INV_TOTAL,
    0
  );

  const totalTransactions = sales.length;

  const filteredSales = sales.filter((sale) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      sale.SALES_INV_ID.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.SALES_INV_DATETIME.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.SALES_INV_TOTAL.toString()
        .toLowerCase()
        .includes(lowerCaseSearchTerm) ||
      sale.SALES_INV_DISCOUNT.toString()
        .toLowerCase()
        .includes(lowerCaseSearchTerm) ||
      sale.SALES_INV_TOTAL_DLVRY.toString()
        .toLowerCase()
        .includes(lowerCaseSearchTerm) ||
      sale.SALES_ORDER_DLVRY_OPT.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.CLIENT_ID.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.SALES_INV_CREATED_USER_ID.toLowerCase().includes(
        lowerCaseSearchTerm
      ) ||
      sale.SALES_ORDER_ID.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const headers = [
    "Invoice ID",
    "Date/Time",
    "Total Amount",
    "Discount",
    "Delivery Fee",
    "Delivery Option",
    "Client ID",
    "Created By",
    "Order ID",
    "Action",
  ];

  const rows = filteredSales.map((sale, index) => [
    sale.SALES_INV_ID,
    sale.SALES_INV_DATETIME,
    `₱${sale.SALES_INV_TOTAL.toFixed(2)}`,
    `₱${sale.SALES_INV_DISCOUNT.toFixed(2)}`,
    `₱${sale.SALES_INV_TOTAL_DLVRY.toFixed(2)}`,
    sale.SALES_ORDER_DLVRY_OPT,
    sale.CLIENT_ID,
    sale.SALES_INV_CREATED_USER_ID,
    sale.SALES_ORDER_ID,
    <Button onClick={() => setSelectedSale(sale)}>Details</Button>,
  ]);

  const handleCloseModal = () => {
    setSelectedSale(null);
  };

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter sales..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <AnalyticsContainer>
        <CardTotalSales totalSales={totalSalesInPesos} />
        <CardTotalTransactions totalTransactions={totalTransactions} />
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {selectedSale && (
        <SalesDetailsModal sale={selectedSale} onClose={handleCloseModal} />
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

export default AdminSales;
