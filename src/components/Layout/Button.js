// src/components/Button.js
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../colors'; // Adjust path as necessary

const Button = ({ backgroundColor, hoverColor, color, onClick, children, ...props }) => {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      color={color}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor || colors.primary};
  color: ${(props) => props.color || 'white'};
  padding: 7px 9px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin: 2px 3.5px;
  transition: background-color 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => props.hoverColor || colors.primaryHover};
  }
`;

export default Button;
