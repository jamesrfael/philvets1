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
  padding: 16px;
  border-radius: 8px;
  flex: 1;
  max-width: 200px;
  text-align: left;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: normal;
`;

const Value = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 4px 0 0;
`;

export default Card;