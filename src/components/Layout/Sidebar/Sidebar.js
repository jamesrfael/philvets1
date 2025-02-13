import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";
import openspaceLogo from "../../../assets/openspaceLogo.png";
import { adminSidebarItems } from "./sidebarItems"; // Ensure this is correctly imported

const theme = {
  text: "#000",
  textActive: "#FFF",
  backgroundActive: "#00C4FF",
  backgroundHover: "#00308F",
  primary: "#00C4FF",
  background: "#FFF",
};

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const matchingDropdown = adminSidebarItems.findIndex((item) =>
      item.dropdown?.some((subItem) => subItem.link === location.pathname)
    );
    if (matchingDropdown !== -1) setOpenDropdown(matchingDropdown);
  }, [location]);

  return (
    <SidebarContainer ref={sidebarRef} isOpen={isOpen} onSelectStart={() => false}>
      <SidebarHeader>
        <Logo src={openspaceLogo} alt="OPEN'SPACE Logo" />
      </SidebarHeader>

      <SidebarContent>
        {adminSidebarItems.map((item, index) => {
          const isParentActive = item.dropdown && openDropdown === index;
          return (
            <React.Fragment key={index}>
              <SidebarLink
                as={item.dropdown ? "div" : NavLink}
                to={item.dropdown ? "#" : item.link}
                className={!item.dropdown && location.pathname === item.link ? "active" : ""}
                onClick={() => item.dropdown && setOpenDropdown(isParentActive ? null : index)}
                active={isParentActive}
              >
                <IconWrapper>
                  <item.icon size={20} />
                </IconWrapper>
                <span className="label">{item.label}</span>
                {item.dropdown && <ChevronIcon isOpen={isParentActive} />}
              </SidebarLink>

              {isParentActive && (
                <DropdownContainer>
                  {item.dropdown.map((subItem, subIndex) => (
                    <NavLink key={subIndex} to={subItem.link} className={({ isActive }) => `dropdown-item ${isActive ? "active" : ""}`}>
                      <IconWrapper>
                        <subItem.icon size={20} />
                      </IconWrapper>
                      <span className="dropdown-label">{subItem.label}</span>
                    </NavLink>
                  ))}
                </DropdownContainer>
              )}
            </React.Fragment>
          );
        })}
      </SidebarContent>
    </SidebarContainer>
  );
};

// Styled Components
const SidebarContainer = styled.div`
  background: ${theme.background};
  max-width: 230px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  user-select: none; /* Prevent text selection */

  @media (max-width: 768px) {
    position: fixed;
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
    z-index: 1000;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  max-width: 90%;
  height: auto;
  padding: 15px 15px 0 20px;
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  margin: 6px 0; 
  align-items: center;
  gap: 10px; /* Added spacing between icon and label */
  padding: 6px;
  border-radius: 4px;
  color: ${({ active }) => (active ? theme.textActive : theme.text)};
  text-decoration: none;
  transition: background-color 0.3s;
  background: ${({ active }) => (active ? theme.backgroundHover : "transparent")};
  
  &:hover {
    background: ${theme.backgroundHover};
    color: ${theme.textActive};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
`;

const ChevronIcon = styled(TbChevronDown)`
  margin-left: auto;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s;
`;

const DropdownContainer = styled.div`
  margin-left: 10px;
  background: none;

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px; /* Added spacing between icon and label */
    padding: 6px;
    margin: 4px;
    border-radius: 4px;
    color: ${theme.text};
    text-decoration: none;
    transition: background-color 0.1s;

    &:hover, &.active {
      background: ${theme.backgroundHover};
      color: ${theme.textActive};
    }
  }
`;

export default Sidebar;
