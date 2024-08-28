import React from "react";
import styled from "styled-components";
import LayoutHS from "../../components/Layout/LayoutHS";
import { AiOutlineStock } from "react-icons/ai";
import { TbUserDollar, TbCategory, TbPackage } from "react-icons/tb";
import { LuWarehouse } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import HighestSellingProducts from "../../components/AdminDashboard/HighestSellingProducts";
import LatestSales from "../../components/AdminDashboard/LatestSales";
import RecentlyAddedProducts from "../../components/AdminDashboard/RecentlyAddedProducts";

const cardData = [
  {
    title: "Sales",
    number: "₱ 21,422",
    icon: <AiOutlineStock />,
    color: "#08d908",
  },
  {
    title: "Products",
    number: "120",
    icon: <TbPackage />,
    color: "#ff6961",
  },
  {
    title: "Customers",
    number: "1,234",
    icon: <TbUserDollar />,
    color: "#ffb347",
  },
  {
    title: "Suppliers",
    number: "23",
    icon: <LuWarehouse />,
    color: "#6da6ba",
  },
  {
    title: "Staffs",
    number: "12",
    icon: <GrGroup />,
    color: "#c893c8",
  },
  {
    title: "Category",
    number: "5",
    icon: <TbCategory />,
    color: "#6b5b95",
  },
];

const AdminDashboard = () => {
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
      <TablesContainer>
        <HighestSellingProducts />
        <LatestSales />
        <RecentlyAddedProducts />
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

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content */
  justify-content: center;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 220px;
  height: 150px;

  @media (max-width: 480px) {
    width: 90%;
    height: auto;
    padding: 1rem;
  }
`;

const CardContent = styled.div`
  text-align: center; /* Center text */
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
    width: 24px;
    height: auto;
    color: white;
  }

  @media (max-width: 480px) {
    svg {
      width: 28px;
    }
  }
`;

const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const CardNumber = styled.p`
  font-size: 1.9rem;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const TablesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem auto;
  max-width: 1000px;
  width: 100%;
  gap: 1rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default AdminDashboard;
