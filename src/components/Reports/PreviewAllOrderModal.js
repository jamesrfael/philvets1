import React, { useState } from "react";
import styled from "styled-components";
import { IoCloseCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa"; // Import the FaEdit icon from react-icons/fa
import EditPdfModal from './EditPdfModal'; // Import the EditPdfModal

const PreviewAllOrderModal = ({
  isOpen,
  onRequestClose,
  pdfContent,
  excelData,
  onDownloadPDF,
  onDownloadExcel,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State for edit modal

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onRequestClose();
    }
  };

  const handleEditPDF = () => {
    setEditModalOpen(true); // Open edit modal
  };

  const handleSaveCompanyDetails = (updatedDetails) => {
    // Handle the updated details (e.g., update state or context if needed)
    console.log("Updated company details:", updatedDetails);
  };

  // Provide default values to avoid undefined errors
  const totalOrders = excelData?.totalOrders || 0;
  const totalSales = excelData?.totalSales || 0; // Change from totalAmount to totalSales
  const totalExpenses = excelData?.totalExpenses || 0; // Add totalExpenses
  const netProfit = excelData?.netProfit || 0; // Add netProfit

  return (
    <Backdrop onClick={handleBackdropClick}>
      <ModalContainer>
        <Header>
          <Title>
            Preview {pdfContent ? "PDF" : "Excel"}
            {pdfContent && (
              <EditIcon onClick={handleEditPDF} />
            )}
          </Title>
          <CloseButton onClick={onRequestClose}>
            <IoCloseCircle color="#ff5757" size={24} />
          </CloseButton>
        </Header>
        <Content>
          {pdfContent ? (
            <iframe
              title="PDF Preview"
              src={pdfContent}
              width="100%"
              height="500"
              style={{ border: "none" }}
            />
          ) : (
            <ExcelTableContainer>
              <table>
                <thead>
                  <tr>
                    {excelData?.header.map((head, index) => (
                      <th key={index}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData?.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={excelData?.header.length - 1}><strong>Total Orders:</strong></td>
                    <td><strong>{totalOrders}</strong></td>
                  </tr>
                  <tr>
                    <td colSpan={excelData?.header.length - 1}><strong>Total Sales:</strong></td>
                    <td><strong>₱{totalSales.toFixed(2)}</strong></td>
                  </tr>
                  <tr>
                    <td colSpan={excelData?.header.length - 1}><strong>Total Expenses:</strong></td>
                    <td><strong>₱{totalExpenses.toFixed(2)}</strong></td>
                  </tr>
                  <tr>
                    <td colSpan={excelData?.header.length - 1}><strong>Net Profit:</strong></td>
                    <td><strong>₱{netProfit.toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </ExcelTableContainer>
          )}
        </Content>
        <ButtonContainer>
          {pdfContent ? (
            <DownloadButton onClick={onDownloadPDF}>Download PDF</DownloadButton>
          ) : (
            <DownloadButton onClick={onDownloadExcel}>Download Excel</DownloadButton>
          )}
        </ButtonContainer>
      </ModalContainer>

      {/* EditPdfModal component */}
      {isEditModalOpen && (
        <EditPdfModal 
          onClose={() => setEditModalOpen(false)} 
          onSave={handleSaveCompanyDetails} 
        />
      )}
    </Backdrop>
  );
};

// Styled components
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 1000px;
  padding: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-weight: bold;
  margin: 0;
  font-size: 25px;
  display: flex;
  align-items: center;
`;

const EditIcon = styled(FaEdit)`
  color: black;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const DownloadButton = styled.button`
  background-color: #1dbA0b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #1a9a0a;
  }
`;

const Content = styled.div`
  margin-top: 10px;
  overflow-x: auto;
`;

const ExcelTableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 8px;
      border: 1px solid #ddd;
      text-align: center;
    }

    th {
      background-color: #f4f4f4;
      font-weight: bold;
    }
  }
`;

export default PreviewAllOrderModal;