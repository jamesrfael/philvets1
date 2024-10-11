// Tooltip.js
import React from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 1000;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const Tooltip = ({ children, visible, x, y }) => {
  return (
    <TooltipContainer visible={visible} style={{ left: x, top: y }}>
      {children}
    </TooltipContainer>
  );
};

export default Tooltip;
