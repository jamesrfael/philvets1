import React, { useState } from "react";
import LayoutHS from "../../components/LayoutHS";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
import { colors } from "../../colors";
import { sales as initialSales } from "../data/SalesData";
import SalesDetailsModal from "../../components/AdminSales/SalesDetailsModal";

const AdminSales = () => {
  const [sales] = useState(initialSales);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);

  // Calculate total sales in Pesos
  const totalSalesInPesos = sales.reduce(
    (total, sale) => total + sale.SALES_INV_TOTAL,
    0
  );

  // Calculate total number of transactions
  const totalTransactions = sales.length;

  // Apply the filter based on searchTerm
  const filteredSales = sales.filter((sale) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      sale.SALES_INV_ID.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.SALES_INV_DATETIME.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.SALES_INV_TOTAL.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.SALES_INV_DISCOUNT.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.SALES_INV_TOTAL_DLVRY.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.SALES_ORDER_DLVRY_OPT.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.CLIENT_ID.toLowerCase().includes(lowerCaseSearchTerm) ||
      sale.SALES_INV_CREATED_USER_ID.toLowerCase().includes(lowerCaseSearchTerm) ||
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
    "Action"
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
    <ActionButton onClick={() => setSelectedSale(sale)}>Details</ActionButton>
  ]);

  const handleCloseModal = () => {
    setSelectedSale(null);
  };

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search sales..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <AnalyticsContainer>
        <AnalyticsCard>
          <Label>Total Sales</Label>
          <Value>₱{totalSalesInPesos.toFixed(2)}</Value>
        </AnalyticsCard>
        <AnalyticsCard>
          <Label>Total Transactions</Label>
          <Value>{totalTransactions}</Value>
        </AnalyticsCard>
      </AnalyticsContainer>
      <Table headers={headers} rows={rows} />
      {selectedSale && (
        <SalesDetailsModal
          sale={selectedSale}
          onClose={handleCloseModal}
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

const AnalyticsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const AnalyticsCard = styled.div`
  background-color: ${colors.primary};
  color: white;
  padding: 16px;
  border-radius: 8px;
  flex: 1;
  max-width: 200px;
  text-align: left;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: normal;
`;

const Value = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 4px 0 0;
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

export default AdminSales;
