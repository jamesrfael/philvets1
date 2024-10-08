import React, { useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import { FaRegBell, FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../colors";

// Updated pageTitles with additional staff titles
const pageTitles = {
  "/superadmin/dashboard": "Dashboard",
  "/superadmin/orders": "Order",
  "/superadmin/orders/request": "Request Order",
  "/superadmin/orders/customer": "Customer Order",
  "/superadmin/orders/purchase": "Purchase Order",
  "/superadmin/delivery": "Delivery",
  "/superadmin/products": "Product",
  "/superadmin/inventory": "Inventory",
  "/superadmin/suppliers": "Supplier",
  "/superadmin/customers": "Customer",
  "/superadmin/users": "User",
  "/superadmin/sales": "Sales",
  "/superadmin/returns": "Return",
  "/superadmin/logs": "Log",
  "/superadmin/reports": "Report",
  "/superadmin/categories": "Product / Category",
  "/superadmin/profile": "Profile",
  "/superadmin/notifications": "Notifications",
  
  "/staff/dashboard": "User Dashboard",
  "/staff/profile": "User Profile",
  "/staff/orders": "Order",
  "/staff/delivery": "Delivery",
  "/staff/products": "Product",
  "/staff/inventory": "Inventory",
  "/staff/customers": "Customers",
  "/staff/reports": "Reports",
  "/staff/returns": "Returns",
  "/staff/notifications": "Notifications",
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

  const goToNotifications = () => {
    if (location.pathname.startsWith("/admin")) {
      navigate("/admin/notifications");
    } else if (location.pathname.startsWith("/staff")) {
      navigate("/staff/notifications");
    }
  };

  const handleSignOut = () => {
    // Add any sign out logic here (e.g., clearing tokens, etc.)
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <HamburgerMenu onClick={toggleSidebar} />
      <PageTitle>{pageTitle}</PageTitle>
      <RightSection>
        <BellIcon
          className={
            location.pathname.includes("/notifications") ? "active" : ""
          }
          onClick={goToNotifications}
        />
        <ProfileContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ProfileButton
            className={location.pathname.includes("/profile") ? "active" : ""}
            onClick={goToProfile}
          >
            <span>
              {location.pathname.startsWith("/admin") ? "Admin" : "User"}
            </span>
            <TbUserCircle className="h-5 w-5 ml-1" />
          </ProfileButton>
          {isDropdownOpen && (
            <DropdownContent
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <DropdownItem onClick={goToProfile}>Profile</DropdownItem>
              <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
            </DropdownContent>
          )}
        </ProfileContainer>
      </RightSection>
    </HeaderContainer>
  );
};

// Styled components
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
  padding: 5px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  margin-left: 10px;

  svg {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }

  &.active {
    background-color: ${colors.primary};
    color: white;
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

const BellIcon = styled(FaRegBell)`
  font-size: 30px;
  margin-right: -5px;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  padding: 4px;
  color: black;

  &.active {
    background-color: ${colors.primary};
    color: white;
  }
`;

export default Header;
