// Sidebar.js
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import philvetsLogo from "../../../assets/philvets.png";
import SidebarItem from "./SidebarItem";
import {
  TbLayoutDashboard,
  TbTruckDelivery,
  TbBoxSeam,
  TbFileReport,
  TbLogout2,
} from "react-icons/tb";
import { MdOutlineInventory2, MdOutlineShoppingCart } from "react-icons/md";

const StaffSidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <SidebarContainer ref={sidebarRef} isOpen={isOpen}>
      <SidebarHeader>
        <LogoContainer>
          <Logo src={philvetsLogo} alt="PHILVETS Logo" />
        </LogoContainer>
      </SidebarHeader>

      <SidebarContent>
        <SidebarItem
          icon={TbLayoutDashboard}
          label="Dashboard"
          link="/staff/dashboard"
        />
        <SidebarItem
          icon={MdOutlineShoppingCart}
          label="Order"
          link="/staff/orders"
        />
        <SidebarItem
          icon={TbTruckDelivery}
          label="Delivery"
          link="/staff/delivery"
        />
        <SidebarItem 
          icon={TbBoxSeam} 
          label="Products" 
          link="/staff/products"
        />
        <SidebarItem
          icon={MdOutlineInventory2}
          label="Inventory"
          link="/staff/inventory"
        />
        <SidebarItem
          icon={TbFileReport}
          label="Report"
          link="/staff/report"
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarItem icon={TbLogout2} label="Logout" link="/login" />
      </SidebarFooter>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  background-color: white;
  color: black;
  width: 200px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;

  /* Styles for smaller screens */
  @media (max-width: 768px) {
    position: fixed;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
    z-index: 1000; /* Ensure the sidebar appears on top */
    box-shadow: ${({ isOpen }) =>
      isOpen ? "2px 0 5px rgba(0, 0, 0, 0.3)" : "none"};
  }

  /* Styles for larger screens */
  @media (min-width: 769px) {
    position: static; /* or relative, based on your layout */
    transform: translateX(0);
  }

  top: 0;
  left: 0;
  height: 100%;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  max-width: 100%;
  height: auto;
  height: 50px;
  margin-right: 8px;
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const SidebarFooter = styled.div`
  padding: 16px;
`;

export default StaffSidebar;