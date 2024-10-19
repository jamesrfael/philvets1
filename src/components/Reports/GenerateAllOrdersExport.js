import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from 'file-saver'; // Ensure you have file-saver for Excel download
import { logoBase64 } from '../../data/imageData'; // Import your base64 logo

// PDF Generation
const generatePDF = (header, data, totalOrders, totalSales, totalExpenses, netProfit, companyName = "PHILVETS", companyDetails = "123-456-789") => {
  const doc = new jsPDF();

  // Use UTF-8 encoding to ensure peso sign renders correctly
  doc.setFont('helvetica', 'normal', 'utf-8');

  // Add the company logo at the upper left corner with aspect ratio locked
  const logoWidth = 12;   // Width for the logo
  const logoHeight = logoWidth;  // Height set to maintain 1:1 aspect ratio
  const logoX = 12;       // Margin Left
  const logoY = 5;        // Margin Top
  doc.addImage(logoBase64, 'PNG', logoX, logoY, logoWidth, logoHeight);  // Adds the logo at upper left

  // Center the company name closer to the top
  const pageWidth = doc.internal.pageSize.width;

  // Set plain styling for the company name and center it
  doc.setFontSize(16);  // Slightly smaller font size for better alignment
  doc.setFont('helvetica', 'bold');
  doc.text(companyName, pageWidth / 2, logoY + logoHeight + 8, { align: 'center' });

  // Company number (move closer to the company name)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(companyDetails, pageWidth / 2, logoY + logoHeight + 14, { align: 'center' });

  // Report title (aligned to the left, adjust position to reduce space)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("All Orders Report", 14, logoY + logoHeight + 24);

  // Date (below report title, left-aligned)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, logoY + logoHeight + 30);

  // Prepare data for the table
  const pdfData = data.map(row => {
    return row.map((cell, index) => {
      if (index === 3) { // Assuming order amount is in the last column
        const amount = parseFloat(cell.replace(/₱|,/g, '').trim());
        return isNaN(amount) ? cell : amount; // Convert to number
      }
      return cell; // Return other values unchanged
    });
  });

  // Table
  doc.autoTable({
    head: [header],
    body: pdfData,
    startY: logoY + logoHeight + 36, // Adjust start position based on where the date ends
    styles: {
      cellPadding: 3,
      fontSize: 9,
      halign: 'center',
      valign: 'middle',
    },
    headStyles: {
      fillColor: [0, 196, 255],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center',
    },
  });

  // Summary (after the table)
  const summaryY = doc.autoTable.previous.finalY + 10;
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Orders: ${totalOrders}`, 14, summaryY);
  doc.text(`Total Sales: ${totalSales.toFixed(2)}`, 14, summaryY + 6);
  doc.text(`Total Expenses: ${totalExpenses.toFixed(2)}`, 14, summaryY + 12);
  doc.text(`Net Profit: ${netProfit.toFixed(2)}`, 14, summaryY + 18);

  // Convert to base64 string for preview or download
  return doc.output("datauristring");
};

// Excel Generation
const generateExcel = async (header, data, totalOrders, totalSales, totalExpenses, netProfit) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('All Order Report');

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
  worksheet.addRow(['Total Orders', totalOrders]).getCell(1).font = { bold: true }; // Make "Total Orders" bold
  worksheet.addRow(['Total Sales', `₱${totalSales.toFixed(2)}`]).getCell(1).font = { bold: true }; // Total Sales
  worksheet.addRow(['Total Expenses', `₱${totalExpenses.toFixed(2)}`]).getCell(1).font = { bold: true }; // Total Expenses
  worksheet.addRow(['Net Profit', `₱${netProfit.toFixed(2)}`]).getCell(1).font = { bold: true }; // Net Profit

  // Center all the text in the summary cells
  worksheet.lastRow.eachCell(cell => {
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
    return blob; // Return the blob for preview instead of saving
  } catch (error) {
    console.error("Error generating Excel file:", error); // Log any errors
    throw new Error("There was an error generating the Excel file. Please try again."); // Inform the user
  }
};

// Exporting both functions
export { generatePDF, generateExcel };
