import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import { AiOutlineStock } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { colors } from "../../colors";

const AdminSales = () => {
  const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const sales = [
    { id: 1, date: "2024-06-01", customerName: "John Doe", amount: 150.0 },
    { id: 2, date: "2024-06-02", customerName: "Jane Smith", amount: 200.0 },
    { id: 3, date: "2024-06-03", customerName: "Michael Brown", amount: 300.0 },
  ];

  const customers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Brown" },
  ];

  const cardData = [
    {
      title: "Total Sales",
      number: `₱ ${sales.reduce((sum, sale) => sum + sale.amount, 0).toFixed(2)}`,
      icon: <AiOutlineStock />,
      color: colors.secondary,
    },
    {
      title: "Total Orders",
      number: `${sales.length}`,
      icon: <MdOutlinePendingActions />,
      color: colors.secondary,
    },
    {
      title: "Average Order Value",
      number: `₱ ${(sales.reduce((sum, sale) => sum + sale.amount, 0) / sales.length).toFixed(2)}`,
      icon: <FaRegArrowAltCircleUp />,
      color: colors.secondary,
    },
  ];

  const handleAddSale = () => {
    setIsAddSaleModalOpen(true);
  };

  const handleSaleClick = (sale) => {
    setSelectedSale(sale);
  };

  const handleCloseSaleDetail = () => {
    setSelectedSale(null);
  };

  const closeModal = () => {
    setIsAddSaleModalOpen(false);
    setSelectedSale(null);
  };

  return (
    <StyledLayoutHS>
      <Header>
        <Title></Title>
        <Button onClick={handleAddSale}>Add New Sale</Button>
      </Header>

      <CardContainer>
        {cardData.map((card, index) => (
          <Card key={index}>
            <CardContent>
              <IconWrapper color={card.color}>{card.icon}</IconWrapper>
              <CardLabel>{card.title}</CardLabel>
              <CardNumber>{card.number}</CardNumber>
            </CardContent>
          </Card>
        ))}
      </CardContainer>

      <SectionTitle>Sales Transactions</SectionTitle>
      <TransactionsContainer>
        {sales.map((sale) => (
          <TransactionItem key={sale.id} onClick={() => handleSaleClick(sale)}>
            <TransactionInfo>
              <span>{sale.date}</span>
              <span>{sale.customerName}</span>
            </TransactionInfo>
            <TransactionAmount>₱ {sale.amount.toFixed(2)}</TransactionAmount>
          </TransactionItem>
        ))}
      </TransactionsContainer>

      {isAddSaleModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Add New Sale</h2>
            <label>
              Customer:
              <select>
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Amount:
              <input type="number" />
            </label>
            <label>
              Date:
              <input type="date" />
            </label>
            <StyledSaveButton>Save</StyledSaveButton>
            <CancelButton onClick={closeModal}>Close</CancelButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {selectedSale && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Sale Details</h2>
            <p><strong>Date:</strong> {selectedSale.date}</p>
            <p><strong>Customer:</strong> {selectedSale.customerName}</p>
            <p><strong>Amount:</strong> ₱ {selectedSale.amount.toFixed(2)}</p>
            <DeleteButton>Delete Sale</DeleteButton>
            <CancelButton onClick={handleCloseSaleDetail}>Close</CancelButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </StyledLayoutHS>
  );
};

const StyledLayoutHS = styled(LayoutHS)`
  background-color: ${colors.background};
  color: ${colors.text};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-top: 32px;
  text-align: left;
  margin-bottom: 16px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  gap: 1rem;
  max-width: 1000px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 1, 0.2);
  width: 220px;
  height: 150px;
`;

const CardContent = styled.div`
  text-align: center;
`;

const IconWrapper = styled.div`
  background-color: ${(props) => props.color};
  color: white;
  border-radius: 50%;
  padding: 12px;
  margin-bottom: 0.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const CardLabel = styled.p`
  font-size: 1rem;
`;

const CardNumber = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionAmount = styled.div`
  font-weight: bold;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
`;

const StyledSaveButton = styled.button`
  background-color: ${colors.success};
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${colors.successHover};
  }
`;

const CancelButton = styled.button`
  background-color: ${colors.fail};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${colors.failHover};
  }
`;

const DeleteButton = styled.button`
  background-color: ${colors.warning};
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${colors.warningHover};
  }
`;

export default AdminSales;
