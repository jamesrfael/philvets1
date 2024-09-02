// src/pages/AdminDashboard.js

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LayoutHS from "../../components/Layout/LayoutHS";
import HighestSellingProducts from "../../components/AdminDashboard/HighestSellingProducts";
import LatestSales from "../../components/AdminDashboard/LatestSales";
import RecentlyAddedProducts from "../../components/AdminDashboard/RecentlyAddedProducts";
import LowestStocks from "../../components/AdminDashboard/LowestStocks";
import CardLowStocks from "../../components/CardsData/CardLowStocks";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import CardTotalSales from "../../components/CardsData/CardTotalSales";

const AdminDashboard = () => {
  return (
    <LayoutHS>
      <CardContainer>
        <CardTotalProducts />
        <CardTotalSales />
        <CardLowStocks />
      </CardContainer>
      <TablesContainer>
        <Row>
          <StyledLink to="/admin/products">
            <HighestSellingProducts />
          </StyledLink>
          <StyledLink to="/admin/sales">
            <LatestSales />
          </StyledLink>
        </Row>
        <Row>
          <StyledLink to="/admin/products">
            <RecentlyAddedProducts />
          </StyledLink>
          <StyledLink to="/admin/inventory">
            <LowestStocks />
          </StyledLink>
        </Row>
      </TablesContainer>
    </LayoutHS>
  );
};

// Styled Link to ensure it does not affect table styling
const StyledLink = styled(Link)`
  text-decoration: none; /* Remove underline from link */
  display: block; /* Make the link a block element to ensure it covers the entire table */
  width: 100%; /* Ensure it takes up full width */
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  gap: 1rem;
  max-width: 1000px;
`;

const TablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  max-width: 1000px;
  width: 100%;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default AdminDashboard;
