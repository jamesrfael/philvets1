import React from "react";
import styled from "styled-components";

const SalesDashboard = ({ sales }) => {
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalOrders = sales.length;
  const averageOrderValue = totalOrders ? totalSales / totalOrders : 0;

  return (
    <DashboardContainer>
      <DashboardItem>
        <ItemTitle>Total Sales</ItemTitle>
        <ItemValue>${totalSales.toFixed(2)}</ItemValue>
      </DashboardItem>
      <DashboardItem>
        <ItemTitle>Total Orders</ItemTitle>
        <ItemValue>{totalOrders}</ItemValue>
      </DashboardItem>
      <DashboardItem>
        <ItemTitle>Average Order Value</ItemTitle>
        <ItemValue>${averageOrderValue.toFixed(2)}</ItemValue>
      </DashboardItem>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const DashboardItem = styled.div`
  text-align: center;
`;

const ItemTitle = styled.h2`
  font-size: 1.5em;
`;

const ItemValue = styled.p`
  font-size: 1.25em;
`;

export default SalesDashboard;
