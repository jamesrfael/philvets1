// src/components/CardsData/CardTotalReturns.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card";
import returnsData from "../../pages/data/ReturnsData";
import styled from "styled-components";
import { FaUndoAlt } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalReturns = () => {
  const navigate = useNavigate();

  // Calculate the total number of returns
  const totalReturns = returnsData.length;

  return (
    <CardContainer onClick={() => navigate('/admin/returns')}>
      <Card
        label="Total Returns"
        value={totalReturns} // Display the total number of returns
        icon={<FaUndoAlt />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalReturns;
