import React from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import { AiOutlineStock } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
import { TbUserDollar } from "react-icons/tb";
import { LuWarehouse } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import RevenueGraph from "../../components/AdminReports/RevenueGraph";
import CostBreakdownPieChart from "../../components/AdminReports/CostBreakdownPieChart";

const cardData = [
  {
    title: "Sales",
    number: "₱ 21,422",
    icon: <AiOutlineStock />,
    color: "#08d908",
  },
  {
    title: "Pending Orders",
    number: "150",
    icon: <MdOutlinePendingActions />,
    color: "#ebdf00",
  },
  {
    title: "Outgoing Deliveries",
    number: "7",
    icon: <FaRegArrowAltCircleUp />,
    color: "#77dd77",
  },
  {
    title: "Incoming Deliveries",
    number: "3",
    icon: <FaRegArrowAltCircleDown />,
    color: "#ff6961",
  },
  {
    title: "Customers",
    number: "1,234",
    icon: <TbUserDollar />,
    color: "#ffb347",
  },
  { title: "Suppliers", number: "23", icon: <LuWarehouse />, color: "#6da6ba" },
  { title: "Staffs", number: "12", icon: <GrGroup />, color: "#c893c8" },
];

const AdminReports = () => {
  return (
    <LayoutHS>
      <CardContainer>
        {cardData.map((card, index) => (
          <Card key={index}>
            <CardContent>
              <IconWrapper color={card.color}>{card.icon}</IconWrapper>
              <CardTitle>{card.title}</CardTitle>
              <CardNumber>{card.number}</CardNumber>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
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

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  gap: 1rem;
  max-width: 1000px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 220px;
  height: 150px;
`;

const CardContent = styled.div`
  text-align: left;
`;

const IconWrapper = styled.div`
  background-color: ${(props) => props.color};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 22px;
    height: auto;
    color: white;
  }
`;

const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
`;

const CardNumber = styled.p`
  font-size: 1.9rem;
  font-weight: bold;
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 2rem auto;
  max-width: 1000px;
  gap: 1rem;
  flex-wrap: wrap;
  max-width: 1000px;

  @media (max-width: 900px) {
    align-items: center;
  }
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
