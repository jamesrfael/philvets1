import React, { useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import { FaRegBell, FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { colors } from "../../colors";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/delivery": "Delivery",
  "/admin/products": "Products",
  "/admin/inventory": "Inventory",
  "/admin/suppliers": "Suppliers",
  "/admin/customers": "Customers",
  "/admin/staffs": "Staffs",
  "/admin/sales": "Sales",
  "/admin/returns": "Returns",
  "/admin/logs": "Logs",
  "/admin/reports": "Reports",
  "/admin/categories": "Products / Categories",
  "/staff/dashboard": "Staff Dashboard",
  "/staff/profile": "Staff Profile",
};

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Page Title";

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <HeaderContainer>
      <HamburgerMenu onClick={toggleSidebar} />
      <PageTitle>{pageTitle}</PageTitle>
      <RightSection>
        <FaRegBell className="mr-1" />
        <ProfileContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ProfileButton>
            <span>Username</span>
            <TbUserCircle className="h-5 w-5 ml-1" />
          </ProfileButton>
          {isDropdownOpen && (
            <DropdownContent
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <DropdownItem href="#">Profile</DropdownItem>
              <DropdownItem href="#">Sign out</DropdownItem>
            </DropdownContent>
          )}
        </ProfileContainer>
      </RightSection>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  align-items: center;
  background-color: white;
  color: black;
  padding: 8px 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto; /* Pushes the right section to the far right */
`;

const HamburgerMenu = styled(FaBars)`
  font-size: 20px;
  margin-right: 9px;
  cursor: pointer;
  display: none; /* Hidden by default */

  &:hover {
    color: ${colors.primary};
  }

  @media (max-width: 768px) {
    display: block; /* Show on small screens */
  }
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  background: transparent;
  color: black;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  right: 0;
  width: 100px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const DropdownItem = styled.a`
  display: block;
  padding: 8px 16px;
  font-size: 12px;
  color: black;
  text-decoration: none;

  &:hover {
    background-color: ${colors.primary};
    color: white;
  }
`;

export default Header;
