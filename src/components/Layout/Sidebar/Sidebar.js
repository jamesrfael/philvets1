import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";
import philvetsLogo from "../../../assets/philvets.png";
import { adminSidebarItems, staffSidebarItems } from "./sidebarItems";
import { TbLogout2 } from "react-icons/tb";

// Centralized theme object for colors
const theme = {
  text: "#000000", // Default text color
  textActive: "#FFFFFF", // Text color when active
  backgroundActive: "#00C4FF", // Background color when active
  backgroundHover: "#0082AA", // Background color on hover
  primary: "#00C4FF", // Primary background color (for active state)
  background: "#FFFFFF", // Background color (for active state)
};

const Sidebar = ({ isOpen, onClose, isAdmin }) => {
  const sidebarRef = useRef(null);
  const location = useLocation(); // Get the current location
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const sidebarItems = isAdmin ? adminSidebarItems : staffSidebarItems;

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); // Toggle dropdown
  };

  return (
    <SidebarContainer ref={sidebarRef} isOpen={isOpen}>
      <SidebarHeader>
        <LogoContainer>
          <Logo src={philvetsLogo} alt="PHILVETS Logo" />
        </LogoContainer>
      </SidebarHeader>

      <SidebarContent>
        {sidebarItems.map((item, index) => (
          <React.Fragment key={index}>
            <SidebarLink
              to={item.link}
              active={location.pathname === item.link}
              onClick={() => item.dropdown && handleDropdownToggle(index)}
            >
              <item.icon size={20} className="icon" />
              <span className="label">{item.label}</span>
              {item.dropdown && (
                <TbChevronDown size={16} className="arrow-icon" /> // Add the arrow icon here
              )}
            </SidebarLink>

            {item.dropdown && openDropdown === index && (
              <DropdownContainer>
                {item.dropdown.map((subItem, subIndex) => (
                  <SidebarLink
                    key={subIndex}
                    to={subItem.link}
                    active={location.pathname === subItem.link}
                    className="dropdown-item"
                  >
                    {subItem.icon && (
                      <subItem.icon size={15} className="icon" />
                    )}{" "}
                    {/* Add icon for dropdown items */}
                    {subItem.label}
                  </SidebarLink>
                ))}
              </DropdownContainer>
            )}
          </React.Fragment>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarLink to="/login">
          <TbLogout2 size={20} className="icon" />
          <span className="label">Logout</span>
        </SidebarLink>
      </SidebarFooter>
    </SidebarContainer>
  );
};

// Styled Components
const SidebarContainer = styled.div`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  background-color: white;
  color: black;
  max-width: 190px;
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
      isOpen ? "2px 0 5px rgba(0, 0, 0, 0.5)" : "none"};
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
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  max-width: 90%;
  height: auto;
  padding: 5px 15px 0px 20px;
  margin-left: 6px;
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const SidebarFooter = styled.div`
  padding: 16px;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 6px;
  margin-bottom: 4px;
  border-radius: 4px;
  color: ${({ active }) => (active ? theme.textActive : theme.text)};
  text-decoration: none;
  transition: background-color 0.1s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover,
  &.active {
    background-color: ${theme.primary};
    color: ${theme.background};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    .icon {
      color: ${theme.background};
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

const DropdownContainer = styled.div`
  padding-left: 16px; // Indent dropdown items

  .dropdown-item {
    display: block;
    padding: 6px;
    margin-bottom: 4px;
    border-radius: 4px;
    color: ${theme.text};
    text-decoration: none;

    &:hover {
      background-color: ${theme.primary};
      color: ${theme.background};
    }
  }
`;

export default Sidebar;
