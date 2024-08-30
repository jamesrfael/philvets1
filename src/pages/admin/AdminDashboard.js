// src/pages/AdminDashboard.js

import React from "react";
import styled from "styled-components";
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
        <CardTotalProducts/>
        <CardTotalSales/>
        <CardLowStocks/>
      </CardContainer>
      <TablesContainer>
        <Row>
          <HighestSellingProducts />
          <LatestSales />
        </Row>
        <Row>
          <RecentlyAddedProducts />
          <LowestStocks />
        </Row>
      </TablesContainer>
    </LayoutHS>
  );
};

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
