import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table"; // Import the reusable Table component

const AdminLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const logData = [
    {
      id: 1,
      timestamp: "2024-08-26 10:15 AM",
      action: "Added Stock",
      productName: "Amoxicillin",
      sku: "AMX123",
      quantityChange: "+100",
      previousValue: "200",
      newValue: "300",
      user: "Dr. John Doe",
      notes: "Restocked after inventory check",
    },
    {
      id: 2,
      timestamp: "2024-08-25 02:30 PM",
      action: "Price Change",
      productName: "Syringes (Pack of 50)",
      sku: "SYR678",
      quantityChange: "N/A",
      previousValue: "₱1,200",
      newValue: "₱1,000",
      user: "Nurse Jane Smith",
      notes: "Discount applied for bulk purchase",
    },
    {
      id: 3,
      timestamp: "2024-08-24 09:00 AM",
      action: "Order Fulfillment",
      productName: "Flea Treatment",
      sku: "FLE543",
      quantityChange: "-20",
      previousValue: "50",
      newValue: "30",
      user: "Emily Brown",
      notes: "Order #ORD5678 fulfilled",
    },
    {
      id: 4,
      timestamp: "2024-08-23 11:45 AM",
      action: "Restocking",
      productName: "Veterinary Thermometer",
      sku: "THER987",
      quantityChange: "+15",
      previousValue: "25",
      newValue: "40",
      user: "Michael Johnson",
      notes: "Restocked after supplier delivery",
    },
    {
      id: 5,
      timestamp: "2024-08-22 03:00 PM",
      action: "Damage or Loss",
      productName: "Dog Shampoo",
      sku: "SHAM112",
      quantityChange: "-3",
      previousValue: "20",
      newValue: "17",
      user: "Sarah Lee",
      notes: "Shampoo bottle cracked during delivery",
    },
    {
      id: 6,
      timestamp: "2024-08-21 08:30 AM",
      action: "User Action",
      productName: "Old Inventory",
      sku: "OLD001",
      quantityChange: "N/A",
      previousValue: "N/A",
      newValue: "N/A",
      user: "Admin",
      notes: "Deleted outdated stock records",
    },
    {
      id: 7,
      timestamp: "2024-08-20 01:15 PM",
      action: "Added Stock",
      productName: "Antibiotic Ointment",
      sku: "ANTO789",
      quantityChange: "+50",
      previousValue: "30",
      newValue: "80",
      user: "Dr. Alice Cooper",
      notes: "Restocked after urgent request",
    },
    {
      id: 8,
      timestamp: "2024-08-19 11:00 AM",
      action: "Price Change",
      productName: "Cat Food (Large Bag)",
      sku: "CATFOO321",
      quantityChange: "N/A",
      previousValue: "₱1,800",
      newValue: "₱1,700",
      user: "Nurse Alex Kim",
      notes: "Price adjustment for new supplier",
    },
    {
      id: 9,
      timestamp: "2024-08-18 03:30 PM",
      action: "Order Fulfillment",
      productName: "Worming Tablets",
      sku: "WORM456",
      quantityChange: "-50",
      previousValue: "100",
      newValue: "50",
      user: "Jessica Davis",
      notes: "Order #ORD9101 processed",
    },
    {
      id: 10,
      timestamp: "2024-08-17 09:45 AM",
      action: "Restocking",
      productName: "Ear Cleaner Solution",
      sku: "EARS789",
      quantityChange: "+25",
      previousValue: "10",
      newValue: "35",
      user: "Michael Johnson",
      notes: "Additional stock from supplier",
    },
  ];

  const filteredLogs = logData.filter(
    (log) =>
      log.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const headers = [
    "Date",
    "Action",
    "Product Name",
    "SKU",
    "Quantity Change",
    "Previous Value",
    "New Value",
    "User",
    "Notes",
  ];

  const rows = filteredLogs.map((log) => [
    log.timestamp,
    log.action,
    log.productName,
    log.sku,
    log.quantityChange,
    log.previousValue,
    log.newValue,
    log.user,
    log.notes,
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
