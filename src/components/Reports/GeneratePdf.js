//GeneratePdf.js
import jsPDF from "jspdf";
import "jspdf-autotable";
import { logoBase64 } from '../../data/imageData'; // Import your base64 logo

// PDF Generation
const generatePDF = (header, data, totalOrders, totalValue, companyName = "PHILVETS", companyDetails = "123-456-789") => {
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
  doc.text("Purchase Order Report", 14, logoY + logoHeight + 24);

  // Date (below report title, left-aligned)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, logoY + logoHeight + 30);

  // Prepare data for the table (remove peso sign from Order Amount)
  const pdfData = data.map(row => {
    return row.map((cell, index) => {
      return index === 1 ? parseFloat(cell).toFixed(2) : cell; // Convert Order Amount to plain number
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

  // Move the Total Amount closer to the Total Orders
  doc.text(`Total Amount: ${totalValue.toFixed(2)}`, 14, summaryY + 6);

  // Convert to base64 string for preview or download
  return doc.output("datauristring");
};

export default generatePDF;
