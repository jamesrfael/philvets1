import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../colors";

const SidebarItem = ({ icon: Icon, label, link, isCollapsed, onMouseEnter }) => {
  return (
    <StyledNavLink
      to={link}
      activeClassName="active"
      onMouseEnter={onMouseEnter}
      isCollapsed={isCollapsed}
    >
      <Icon className="icon" />
      {!isCollapsed && <span className="label">{label}</span>}
    </StyledNavLink>
  );
};

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 6px;
  margin-bottom: 4px;
  border-radius: 4px;
  color: ${colors.text};
  text-decoration: none;
  transition: background-color 0.1s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover,
  &.active {
    background-color: ${colors.primary};
    color: ${colors.background};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    .icon {
      color: ${colors.background};
    }
  }

  .icon {
    width: 20px;
    height: 20px;
    color: inherit;
    transition: color 0.1s ease-in-out;
  }

  .label {
    margin-left: 8px;
    font-size: 15px;
    transition: color 0.1s ease-in-out;
  }
`;

export default SidebarItem;
