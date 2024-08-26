import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table"; // Import the reusable Table component

const AdminLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const logData = [
    {
      id: 1,
      timestamp: "2024-08-26 10:15 AM",
      action: "Added Stock",
      productName: "Example Product",
      sku: "12345",
      quantityChange: "+50",
      previousValue: "100",
      newValue: "150",
      user: "John Doe",
      notes: "Restocked after inventory check"
    },
    {
      id: 2,
      timestamp: "2024-08-25 02:30 PM",
      action: "Price Change",
      productName: "Sample Item",
      sku: "67890",
      quantityChange: "N/A",
      previousValue: "₱500",
      newValue: "₱450",
      user: "Jane Smith",
      notes: "Discount applied for end-of-season sale"
    },
    {
      id: 3,
      timestamp: "2024-08-24 09:00 AM",
      action: "Order Fulfillment",
      productName: "Office Chair",
      sku: "54321",
      quantityChange: "-10",
      previousValue: "50",
      newValue: "40",
      user: "Emily Brown",
      notes: "Order #ORD1234 fulfilled"
    },
    {
      id: 4,
      timestamp: "2024-08-23 11:45 AM",
      action: "Restocking",
      productName: "Laptop",
      sku: "98765",
      quantityChange: "+20",
      previousValue: "15",
      newValue: "35",
      user: "Michael Johnson",
      notes: "Restocked after supplier delivery"
    },
    {
      id: 5,
      timestamp: "2024-08-22 03:00 PM",
      action: "Damage or Loss",
      productName: "Printer",
      sku: "11223",
      quantityChange: "-1",
      previousValue: "10",
      newValue: "9",
      user: "Sarah Lee",
      notes: "Printer damaged during transit"
    },
    {
      id: 6,
      timestamp: "2024-08-21 08:30 AM",
      action: "User Action",
      productName: "Monitor",
      sku: "33445",
      quantityChange: "N/A",
      previousValue: "N/A",
      newValue: "N/A",
      user: "Admin",
      notes: "Deleted old stock records"
    }
  ];

  const filteredLogs = logData.filter((log) =>
    log.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const headers = [
    "Date", "Action", "Product Name", "SKU", "Quantity Change", "Previous Value", "New Value", "User", "Notes"
  ];

  const rows = filteredLogs.map(log => [
    log.timestamp,
    log.action,
    log.productName,
    log.sku,
    log.quantityChange,
    log.previousValue,
    log.newValue,
    log.user,
    log.notes
  ]);

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <Table headers={headers} rows={rows} />
    </LayoutHS>
  );
};

const Controls = styled.div`
  display: flex;
  justify-content: flex-start; /* Align search bar to the left */
  align-items: center;
  margin-bottom: 16px;
  padding: 0 16px;
`;

export default AdminLogs;
