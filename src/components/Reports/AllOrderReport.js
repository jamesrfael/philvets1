import React, { useState } from "react";
import ReportBody from "./ReportBody"; // Ensure you have this component
import { customerOrders } from "../../data/CustomerOrderData"; // Import customer orders data
import PURCHASE_ORDERS from "../../data/PurchaseOrderData"; // Import purchase orders data as default export
import { generatePDF, generateExcel } from "./GenerateAllOrdersExport"; // Import the combined export functions
import PreviewAllOrderModal from "./PreviewAllOrderModal"; // Updated import
import styled from 'styled-components';

const AllOrderReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfContent, setPdfContent] = useState("");
  const [excelData, setExcelData] = useState(null);

  // Combine customer and purchase orders
  const combinedOrders = [];

  // Process customer orders
  customerOrders.forEach(order => {
    combinedOrders.push({
      id: order.SALES_ORDER_ID,
      date: new Date(order.SALES_ORDER_DLVRY_DATE),
      quantity: order.SALES_ORDER_TOT_QTY,
      amount: order.SALES_ORDER_PROD_TOTAL, // Positive amount for sales
    });
  });

  // Process purchase orders
  PURCHASE_ORDERS.forEach(order => {
    combinedOrders.push({
      id: order.PURCHASE_ORDER_ID,
      date: new Date(order.PURCHASE_ORDER_DATE),
      quantity: order.PURCHASE_ORDER_TOT_QTY,
      amount: -order.PURCHASE_ORDER_TOTAL, // Negative amount for expenses
    });
  });

  // Filter combined orders based on search term and date range
  const filteredOrders = combinedOrders.filter(order => {
    const matchesSearchTerm = 
      order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.quantity.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.amount.toFixed(2).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange =
      (!startDate || order.date >= new Date(startDate)) &&
      (!endDate || order.date <= new Date(endDate));
    
    return matchesSearchTerm && matchesDateRange;
  });

  const totalOrders = filteredOrders.length;

  // Calculate total sales and expenses
  const totalSales = combinedOrders.reduce((acc, order) => acc + (order.amount > 0 ? order.amount : 0), 0); // Sum only sales
  const totalExpenses = combinedOrders.reduce((acc, order) => acc + (order.amount < 0 ? -order.amount : 0), 0); // Sum only expenses
  const netProfit = totalSales - totalExpenses; // Net profit

  // Format number with currency and thousand separators
  const formatCurrency = (value) => {
    return `₱${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  // Map the filtered orders to display only the necessary fields
  const tableData = filteredOrders.map(order => [
    order.id,
    order.date.toLocaleDateString(),
    order.quantity,
    formatCurrency(order.amount),
  ]);

  const header = ["Order ID", "Date", "Quantity", "Order Amount"];

  const handlePreviewPDF = async () => {
    const pdfData = await generatePDF(header, tableData, totalOrders, totalSales, totalExpenses, netProfit);
    setPdfContent(pdfData);
    setExcelData(null);
    setIsModalOpen(true);
  };

  const handlePreviewExcel = async () => {
    const excelBlobData = await generateExcel(header, tableData, totalOrders, totalSales, totalExpenses, netProfit);
    const url = URL.createObjectURL(excelBlobData);
    setExcelData({
      header,
      rows: tableData,
      totalOrders,
      totalSales, // Make sure to include totalSales for the Excel preview
      totalExpenses, // Make sure to include totalExpenses for the Excel preview
      netProfit, // Make sure to include netProfit for the Excel preview
      url // Pass the URL for preview
    });
    setPdfContent("");
    setIsModalOpen(true);
  };

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfContent;
    link.download = "all_order_report.pdf";
    link.click();
    setIsModalOpen(false);
  };

  const handleDownloadExcel = () => {
    if (!excelData) return; // Ensure there is data to download
    const link = document.createElement("a");
    link.href = excelData.url;
    link.download = "all_order_report.xlsx";
    link.click();
    setIsModalOpen(false);
  };

  return (
    <>
      <CardContainer>
        <Card>
          <CardTitle>Total Sales</CardTitle>
          <CardValue color="#f08400">{formatCurrency(totalSales)}</CardValue>
        </Card>
        <Card>
          <CardTitle>Total Expenses</CardTitle>
          <CardValue color="#ff5757">{formatCurrency(totalExpenses)}</CardValue>
        </Card>
        <Card>
          <CardTitle>Net Profit</CardTitle>
          <CardValue color="#1DBA0B">{formatCurrency(netProfit)}</CardValue>
        </Card>
      </CardContainer>

      <ReportBody
        title="All Order Report"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        headers={header}
        rows={tableData}
        totalOrders={totalOrders}
        totalOrderValue={netProfit} // Update to show net profit
        onDownloadPDF={handlePreviewPDF}
        onPreviewExcel={handlePreviewExcel}
      />

      <PreviewAllOrderModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        pdfContent={pdfContent}
        excelData={excelData}
        onDownloadPDF={handleDownloadPDF}
        onDownloadExcel={handleDownloadExcel}
      />
    </>
  );
};

// Styled components for the cards
const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  width: 30%;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CardValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.color || "#4caf50"};
`;

export default AllOrderReport;
