// src/components/Card.js
import React from "react";
import styled from "styled-components";
import { colors } from "../../colors"; // Ensure colors are correctly imported

const Card = ({ label, value, bgColor = colors.primary }) => {
  return (
    <CardContainer bgColor={bgColor}>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background-color: ${colors.primary};
  color: white;
  padding: 14px;
  border-radius: 8px;
  flex: 1;
  max-width: 150px;
  min-width: 150px;
  text-align: left;
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: normal;
`;

const Value = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export default Card;
