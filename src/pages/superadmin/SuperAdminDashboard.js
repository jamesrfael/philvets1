// src/pages/AdminDashboard.js

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import HighestSellingProducts from "../../components/Dashboard/HighestSellingProducts";
import LatestSales from "../../components/Dashboard/LatestSales";
import RecentlyAddedProducts from "../../components/Dashboard/RecentlyAddedProducts";
import LowestStocks from "../../components/Dashboard/LowestStocks";
import CardLowStocks from "../../components/CardsData/CardLowStocks";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import CardTotalSales from "../../components/CardsData/CardTotalSales";
import CardTotalNotification from "../../components/CardsData/CardTotalNotification";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <CardContainer>
        <div onClick={() => navigate("/superadmin/products")}>
          <CardTotalProducts />
        </div>
        <div onClick={() => navigate("/superadmin/sales")}>
          <CardTotalSales />
        </div>
        <div onClick={() => navigate("/superadmin/inventory")}>
          <CardLowStocks />
        </div>
        <div onClick={() => navigate("/superadmin/notifications")}>
          <CardTotalNotification />
        </div>
      </CardContainer>
      <TablesContainer>
        <Row>
          <StyledLink to="/superadmin/products">
            <HighestSellingProducts />
          </StyledLink>
          <StyledLink to="/superadmin/sales">
            <LatestSales />
          </StyledLink>
        </Row>
        <Row>
          <StyledLink to="/superadmin/products">
            <RecentlyAddedProducts />
          </StyledLink>
          <StyledLink to="/superadmin/inventory">
            <LowestStocks />
          </StyledLink>
        </Row>
      </TablesContainer>
    </MainLayout>
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

export default SuperAdminDashboard;
