import React, { useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import { FaRegBell, FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../colors";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/orders": "Order",
  "/admin/delivery": "Delivery",
  "/admin/products": "Product",
  "/admin/inventory": "Inventory",
  "/admin/suppliers": "Supplier",
  "/admin/customers": "Customer",
  "/admin/staffs": "Staff",
  "/admin/sales": "Sales",
  "/admin/returns": "Return",
  "/admin/logs": "Log",
  "/admin/reports": "Report",
  "/admin/categories": "Product / Category",
  "/staff/dashboard": "Staff Dashboard",
  "/staff/profile": "Staff Profile",
  "/staff/orders": "Order",
  "/staff/delivery": "Delivery",
  "/staff/products": "Product",
  "/staff/inventory": "Inventory",
};

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = pageTitles[location.pathname] || "Page Title";

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const goToProfile = () => {
    if (location.pathname.startsWith("/admin")) {
        navigate("/admin/profile");
    } else if (location.pathname.startsWith("/staff")) {
        navigate("/staff/profile");
    }
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
            <span>Admin</span>
            <TbUserCircle className="h-5 w-5 ml-1" />
          </ProfileButton>
          {isDropdownOpen && (
            <DropdownContent
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <DropdownItem onClick={goToProfile}>Profile</DropdownItem>
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
  justify-content: flex-start;
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
  margin-left: auto;
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

const DropdownItem = styled.div`
  display: block;
  padding: 8px 16px;
  font-size: 12px;
  color: black;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primary};
    color: white;
  }
`;

export default Header;
