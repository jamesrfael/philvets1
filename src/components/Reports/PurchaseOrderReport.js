import React, { useState } from "react";
import ReportBody from "./ReportBody";
import PURCHASE_ORDERS from "../../data/PurchaseOrderData";
import { generatePDF, generateExcel } from "./ConvertReport";
import PreviewModal from "./PreviewModal";

const PurchaseOrderReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfContent, setPdfContent] = useState("");
  const [excelData, setExcelData] = useState(null);

  // Helper function to search in all fields
  const matchesSearchTerm = (order) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      order.PURCHASE_ORDER_ID.toString().toLowerCase().includes(searchStr) ||
      order.SUPPLIER_ID.toString().toLowerCase().includes(searchStr) ||
      order.USER_ID.toString().toLowerCase().includes(searchStr) ||
      order.PURCHASE_ORDER_STATUS.toLowerCase().includes(searchStr) ||
      order.PURCHASE_ORDER_DATE.toLowerCase().includes(searchStr) ||
      order.PURCHASE_ORDER_TOT_QTY.toString().toLowerCase().includes(searchStr) ||
      order.PURCHASE_ORDER_TOTAL.toString().toLowerCase().includes(searchStr)
    );
  };

  // Filter orders based on search term and date range
  const filteredOrders = PURCHASE_ORDERS.filter((order) => {
    const matchesDateRange =
      (!startDate || new Date(order.PURCHASE_ORDER_DATE) >= new Date(startDate)) &&
      (!endDate || new Date(order.PURCHASE_ORDER_DATE) <= new Date(endDate));
    return matchesSearchTerm(order) && matchesDateRange;
  });

  const totalOrders = filteredOrders.length;
  const totalOrderValue = filteredOrders.reduce(
    (acc, order) => acc + (order.PURCHASE_ORDER_TOTAL || 0),
    0
  );

  // Map the filtered orders to display only the necessary fields
  const tableData = filteredOrders.map((order) => [
    order.PURCHASE_ORDER_ID,
    order.SUPPLIER_ID,
    order.USER_ID,
    order.PURCHASE_ORDER_STATUS, // Status field
    order.PURCHASE_ORDER_DATE,
    order.PURCHASE_ORDER_TOT_QTY,
    `₱${order.PURCHASE_ORDER_TOTAL.toFixed(2)}`,
  ]);

  // Updated header to match the requested fields
  const header = [
    "Order ID",
    "Supplier ID",
    "User ID",
    "Status",
    "Order Date",
    "Quantity",
    "Order Amount",
  ];

  const handlePreviewPDF = () => {
    const pdfData = generatePDF(header, tableData, totalOrders, totalOrderValue);
    setPdfContent(pdfData);
    setExcelData(null);
    setIsModalOpen(true);
  };

  const handlePreviewExcel = () => {
    setExcelData({
      header,
      rows: tableData,
      totalOrders, // Pass total orders
      totalAmount: totalOrderValue, // Pass total amount
    });
    setPdfContent("");
    setIsModalOpen(true);
  };

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfContent;
    link.download = "purchase_order_report.pdf";
    link.click();
    setIsModalOpen(false);
  };

  const handleDownloadExcel = async () => {
    try {
      const excelBlobData = await generateExcel(header, tableData, totalOrders, totalOrderValue); // Ensure this returns the Blob
      const url = URL.createObjectURL(excelBlobData);
      const a = document.createElement("a");
      a.href = url;
      a.download = "purchase_order_report.xlsx";
      a.click();
      URL.revokeObjectURL(url);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  return (
    <>
      <ReportBody
        title="Purchase Order Report"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        headers={header}
        rows={tableData}
        totalOrders={totalOrders}
        totalOrderValue={totalOrderValue}
        onDownloadPDF={handlePreviewPDF}
        onPreviewExcel={handlePreviewExcel}
      />

      <PreviewModal
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

export default PurchaseOrderReport;
