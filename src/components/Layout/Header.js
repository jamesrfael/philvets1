import React from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { colors } from "../../colors";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/members": "Member",
  "/admin/payroll": "Payroll",
  "/admin/records": "Record",
  "/admin/13thmonthpay": "13th Month Pay",
  "/admin/settings": "Setting",
};

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Page Title";

  return (
    <HeaderContainer>
      <HamburgerMenu onClick={toggleSidebar} />
      <PageTitle>{pageTitle}</PageTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  color: black;
  padding: 8px 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const HamburgerMenu = styled(FaBars)`
  font-size: 20px;
  margin-right: 9px;
  cursor: pointer;
  display: none;
  &:hover {
    color: ${colors.primary};
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

export default Header;
