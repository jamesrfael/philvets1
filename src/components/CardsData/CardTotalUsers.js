// src/components/CardsData/CardTotalUsers.js

import React from "react";
import Card from "../Layout/Card";
import { staff } from "../../pages/data/UserData"; // Import the staff data
import styled from "styled-components";
import { FaUserTie } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalUsers = () => {
  // Calculate the total number of staff
  const totalUsers = staff.length;

  return (
    <CardContainer>
      <Card
        label="Total Users"
        value={totalUsers} // Display the total number of staff
        icon={<FaUserTie />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalUsers;
