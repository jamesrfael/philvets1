import React from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import CardLowStocks from "../../components/CardsData/CardLowStocks";
import CardTotalCustomers from "../../components/CardsData/CardTotalCustomers";
import CardTotalDelivery from "../../components/CardsData/CardTotalDelivery";
import CardTotalLogs from "../../components/CardsData/CardTotalLogs";
import CardTotalOrders from "../../components/CardsData/CardTotalOrders";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import CardTotalReturns from "../../components/CardsData/CardTotalReturns";
import CardTotalSales from "../../components/CardsData/CardTotalSales";
import CardTotalStaffs from "../../components/CardsData/CardTotalStaffs";
import CardTotalSuppliers from "../../components/CardsData/CardTotalSuppliers";
import RevenueGraph from "../../components/AdminReports/RevenueGraph";
import CostBreakdownPieChart from "../../components/AdminReports/CostBreakdownPieChart";

const AdminReports = () => {
  return (
    <LayoutHS>
      <StatsContainer>
        <CardLowStocks />
        <CardTotalCustomers />
        <CardTotalDelivery />
        <CardTotalLogs />
        <CardTotalOrders />
        <CardTotalProducts />
        <CardTotalReturns />
        <CardTotalSales />
        <CardTotalStaffs />
        <CardTotalSuppliers />

      </StatsContainer>
      <StatsContainer>
        <StatsCard>
          <StatTitle>Transactions</StatTitle>
          <StatNumber color="black">500</StatNumber>
        </StatsCard>
        <StatsCard>
          <StatTitle>Profit</StatTitle>
          <StatNumber color="#1DBA0B">₱ 107,000</StatNumber>
        </StatsCard>
        <StatsCard>
          <StatTitle>Revenue</StatTitle>
          <StatNumber color="#00C4FF">₱ 620,000</StatNumber>
        </StatsCard>
        <StatsCard>
          <StatTitle>Expense</StatTitle>
          <StatNumber color="#ff3d3d">₱ 50,000</StatNumber>
        </StatsCard>
      </StatsContainer>
      <GraphContainer>
        <RevenueGraph />
        <CostBreakdownPieChart />
      </GraphContainer>
    </LayoutHS>
  );
};

// const CardContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin: 0 auto;
//   gap: 1rem;
//   max-width: 1000px;

//   @media (max-width: 900px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

const StatsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 2rem auto;
  max-width: 1000px;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StatsCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  flex: 1;
  text-align: left;
  min-width: 220px;
  max-width: 220px;
`;

const StatTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
`;

const StatNumber = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const GraphContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem auto;
  max-width: 1000px;
  gap: 1rem;
  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default AdminReports;
