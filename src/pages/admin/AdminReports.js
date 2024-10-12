import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled from "styled-components";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import Button from "../../components/Layout/Button";
import { colors } from "../../colors"; // Colors for styling
import Card from "../../components/Layout/Card"; // Import the Card component
import {
  FaExclamationTriangle,
  FaShoppingCart,
  FaChartLine,
  FaWarehouse,
  FaDollarSign,
} from "react-icons/fa"; // Import icons

const AdminReports = () => {

  const [activeTab, setActiveTab] = useState("Sales Report"); // Track active tab
  const [startDate, setStartDate] = useState(""); // Track start date filter
  const [endDate, setEndDate] = useState(""); // Track end date filter
  const [searchTerm, setSearchTerm] = useState(""); // Search term for reports
  const [selectedReport, setSelectedReport] = useState(null); // Track selected report for details

  // Sample data for different reports
  const salesReports = [
    [
      "Sales Report 1",
      "2024-10-01",
      "Daily",
      "₱20,000 Total Sales",
      "View Details",
      { details: "Detailed info for Sales Report 1" },
    ],
    [
      "Sales Report 2",
      "2024-10-02",
      "Weekly",
      "₱50,000 Total Sales",
      "View Details",
      { details: "Detailed info for Sales Report 2" },
    ],
    [
      "Sales Report 3",
      "2024-10-03",
      "Monthly",
      "₱150,000 Total Sales",
      "View Details",
      { details: "Detailed info for Sales Report 3" },
    ],
    [
      "Sales Report 4",
      "2024-10-04",
      "Daily",
      "₱30,000 Total Sales",
      "View Details",
      { details: "Detailed info for Sales Report 4" },
    ],
    [
      "Sales Report 5",
      "2024-10-05",
      "Weekly",
      "₱60,000 Total Sales",
      "View Details",
      { details: "Detailed info for Sales Report 5" },
    ],
  ];

  const inventoryReports = [
    [
      "Inventory Report 1",
      "2024-10-01",
      "Daily",
      "500 Items In Stock",
      "View Details",
      { details: "Detailed info for Inventory Report 1" },
    ],
    [
      "Inventory Report 2",
      "2024-10-02",
      "Weekly",
      "200 Items In Stock",
      "View Details",
      { details: "Detailed info for Inventory Report 2" },
    ],
    [
      "Inventory Report 3",
      "2024-10-03",
      "Monthly",
      "750 Items In Stock",
      "View Details",
      { details: "Detailed info for Inventory Report 3" },
    ],
    [
      "Inventory Report 4",
      "2024-10-04",
      "Daily",
      "300 Items In Stock",
      "View Details",
      { details: "Detailed info for Inventory Report 4" },
    ],
    [
      "Inventory Report 5",
      "2024-10-05",
      "Weekly",
      "100 Items In Stock",
      "View Details",
      { details: "Detailed info for Inventory Report 5" },
    ],
  ];

  const orderReports = [
    [
      "Order Report 1",
      "2024-10-01",
      "Daily",
      "50 Orders Placed",
      "View Details",
      { details: "Detailed info for Order Report 1" },
    ],
    [
      "Order Report 2",
      "2024-10-02",
      "Weekly",
      "200 Orders Placed",
      "View Details",
      { details: "Detailed info for Order Report 2" },
    ],
    [
      "Order Report 3",
      "2024-10-03",
      "Monthly",
      "300 Orders Placed",
      "View Details",
      { details: "Detailed info for Order Report 3" },
    ],
    [
      "Order Report 4",
      "2024-10-04",
      "Daily",
      "75 Orders Placed",
      "View Details",
      { details: "Detailed info for Order Report 4" },
    ],
    [
      "Order Report 5",
      "2024-10-05",
      "Weekly",
      "125 Orders Placed",
      "View Details",
      { details: "Detailed info for Order Report 5" },
    ],
  ];

  // Function to render the appropriate table based on the active tab
  const renderReportContent = () => {
    let reports = [];
    switch (activeTab) {
      case "Sales Report":
        reports = salesReports;
        break;
      case "Inventory Report":
        reports = inventoryReports;
        break;
      case "Order Report":
        reports = orderReports;
        break;
      default:
        reports = [];
    }

    const filteredReports = reports.filter((report) =>
      report[0].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Table
        headers={["Title", "Date", "Type", "Description", "Action"]}
        rows={filteredReports.map((report) => [
          report[0],
          report[1],
          report[2],
          report[3],
          <Button
            key="action"
            variant="primary"
            onClick={() => setSelectedReport(report[5].details)}
          >
            {report[4]}
          </Button>,
        ])}
      />
    );
  };

  return (
    <MainLayout>
      {/* Summary Cards Section */}
      <CardsContainer>
        <Card
          label="Total Inventory Value"
          value="₱250,000"
          icon={<FaDollarSign />}
        />
        <Card
          label="Low Stocks"
          value="15 Items"
          icon={<FaExclamationTriangle />}
        />
        <Card
          label="Total Orders"
          value="1,200 Orders"
          icon={<FaShoppingCart />}
        />
        <Card
          label="Sales Performance"
          value="₱500,000"
          icon={<FaChartLine />}
        />
        <Card
          label="Current Stock Levels"
          value="1,000 Items"
          icon={<FaWarehouse />}
        />
      </CardsContainer>

      {/* Tabs for different reports */}
      <Tabs>
        <StyledTabButton
          active={activeTab === "Sales Report"}
          onClick={() => setActiveTab("Sales Report")}
        >
          Sales Report
        </StyledTabButton>
        <StyledTabButton
          active={activeTab === "Inventory Report"}
          onClick={() => setActiveTab("Inventory Report")}
        >
          Inventory Report
        </StyledTabButton>
        <StyledTabButton
          active={activeTab === "Order Report"}
          onClick={() => setActiveTab("Order Report")}
        >
          Order Report
        </StyledTabButton>
      </Tabs>

      {/* Search bar and date filters */}
      <Controls>
        <SearchBar
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DateFilters>
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
        </DateFilters>
      </Controls>

      {/* Render report content based on active tab */}
      <ReportContent>{renderReportContent()}</ReportContent>

      {/* Selected report details */}
      {selectedReport && (
        <DetailsModal>
          <h3>Report Details</h3>
          <p>{selectedReport}</p>
          <Button variant="orange" onClick={() => setSelectedReport(null)}>
            Close
          </Button>
        </DetailsModal>
      )}

      {/* Download options */}
      <DownloadButtons>
        <Button variant="primary" onClick={() => console.log("Download PDF")}>
          Download PDF
        </Button>
        <Button variant="primary" onClick={() => console.log("Download Excel")}>
          Download Excel
        </Button>
        <Button variant="primary" onClick={() => console.log("Download CSV")}>
          Download CSV
        </Button>
      </DownloadButtons>
    </MainLayout>
  );
};

// Styled components for layout and styles
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 16px; // Spacing below the cards
  gap: 16px; // Set gaps between cards
`;

const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px; /* Add a little gap below tabs */
`;

const StyledTabButton = styled(Button)`
  background-color: ${(props) =>
    props.active ? colors.primary : "#d3d3d3"}; /* Light gray for inactive */
  color: ${(props) =>
    props.active ? "white" : "#000"}; /* Black for inactive text */

  &:hover {
    background-color: ${(props) =>
      props.active ? colors.primaryHover : "#bbb"}; /* Darker gray for hover */
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const DateFilters = styled.div`
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    margin-left: 1rem;
    font-weight: bold;
  }

  input {
    margin-left: 0.5rem;
    padding: 0.3rem;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
`;

const ReportContent = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  min-height: 200px;
  text-align: center;
`;

const DownloadButtons = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const DetailsModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export default AdminReports;
