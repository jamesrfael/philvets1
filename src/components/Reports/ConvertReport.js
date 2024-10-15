import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver'; // Ensure you have file-saver for Excel download

// PDF Generation
const generatePDF = (header, data, totalOrders, totalValue) => {
  const doc = new jsPDF();

  // Use UTF-8 encoding to ensure peso sign renders correctly
  doc.setFont('helvetica', 'normal', 'utf-8');

  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold'); // Make the title bold
  doc.text("Purchase Order Report", 14, 22);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal'); // Reset to normal for the date
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 28); // Closer to the title

  // Prepare data for the table (remove peso sign from Order Amount)
  const pdfData = data.map(row => {
    return row.map((cell, index) => {
      // Assuming the Order Amount is at index 1 (adjust as necessary)
      return index === 1 ? parseFloat(cell).toFixed(2) : cell; // Convert Order Amount to plain number
    });
  });

  // Table
  doc.autoTable({
    head: [header],
    body: pdfData,
    startY: 38, // Start closer to the date
    styles: {
      cellPadding: 3,
      fontSize: 9, // Set font size smaller for data
      halign: 'center', // Center text horizontally in cells
      valign: 'middle', // Center text vertically
    },
    headStyles: {
      fillColor: [0, 196, 255], // Set header background color (00C4FF)
      textColor: [255, 255, 255], // Set header text color (white)
      fontStyle: 'bold', // Make headers bold
      halign: 'center', // Center header text
    },
  });

  // Summary
  const summaryY = doc.autoTable.previous.finalY + 10; // Position totals closer to the table
  doc.setFont('helvetica', 'bold'); // Make totals bold
  doc.text(`Total Orders: ${totalOrders}`, 14, summaryY);
  doc.text(`Total Amount: ${totalValue.toFixed(2)}`, 14, summaryY + 10); // Remove peso sign

  // Convert to base64 string for preview or download
  return doc.output("datauristring");
};

// Excel Generation
const generateExcel = async (header, data, totalOrders, totalValue) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Purchase Report');

  // Add header row
  worksheet.addRow(header).font = { bold: true };

  // Center the text for all header cells
  header.forEach((_, index) => {
    worksheet.getColumn(index + 1).alignment = { horizontal: 'center' };
  });

  // Add data rows and center the text in cells
  data.forEach(row => {
    const newRow = worksheet.addRow(row);
    newRow.eachCell(cell => {
      cell.alignment = { horizontal: 'center' }; // Center text in data cells
    });
  });

  // Add summary rows
  const totalOrdersRow = worksheet.addRow(['Total Orders', totalOrders]);
  totalOrdersRow.getCell(1).font = { bold: true }; // Make "Total Orders" bold

  const totalAmountRow = worksheet.addRow(['Total Amount', `₱${totalValue.toFixed(2)}`]);
  totalAmountRow.getCell(1).font = { bold: true }; // Make "Total Amount" bold

  // Center all the text in the summary cells
  totalOrdersRow.eachCell(cell => {
    cell.alignment = { horizontal: 'center' };
  });
  totalAmountRow.eachCell(cell => {
    cell.alignment = { horizontal: 'center' };
  });

  // Set the column widths based on header length
  header.forEach((col, index) => {
    worksheet.getColumn(index + 1).width = col.length + 5; // Adjust width as needed
  });

  // Generate the Excel file and return the Blob for download
  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'purchase_report.xlsx'); // Download the Excel file
  } catch (error) {
    console.error("Error generating Excel file:", error); // Log any errors
    alert("There was an error generating the Excel file. Please try again."); // Inform the user
  }
};

export { generatePDF, generateExcel };
