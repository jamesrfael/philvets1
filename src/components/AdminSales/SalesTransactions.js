import React from "react";
import styled from "styled-components";

const SalesTransactions = ({ sales, onSaleClick }) => {
  return (
    <TransactionsContainer>
      {sales.map((sale) => (
        <TransactionItem key={sale.id} onClick={() => onSaleClick(sale)}>
          <TransactionInfo>
            <span>{sale.date}</span>
            <span>{sale.customerName}</span>
          </TransactionInfo>
          <TransactionAmount>${sale.amount.toFixed(2)}</TransactionAmount>
        </TransactionItem>
      ))}
    </TransactionsContainer>
  );
};

const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
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

export default SalesTransactions;
