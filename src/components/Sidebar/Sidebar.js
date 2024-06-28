import React from "react";
import styled from "styled-components";
import philvetsLogo from "../../assets/philvets.png";
import SidebarItem from "../Sidebar/SidebarItem";
import {
  TbLayoutDashboard,
  TbTruckDelivery,
  TbBoxSeam,
  TbUserDollar,
  TbBasketDollar,
  TbTruckReturn,
  TbHistory,
  TbFileReport,
  TbLogout2,
} from "react-icons/tb";

import { MdOutlineInventory2, MdOutlineShoppingCart } from "react-icons/md";
import { LuWarehouse } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <LogoContainer>
          <Logo src={philvetsLogo} alt="PHILVETS Logo" />
        </LogoContainer>
      </SidebarHeader>

      <SidebarContent>
        <SidebarItem
          icon={TbLayoutDashboard}
          label="Dashboard"
          link="/admin/dashboard"
        />
        <SidebarItem
          icon={MdOutlineShoppingCart}
          label="Orders"
          link="/admin/orders"
        />
        <SidebarItem
          icon={TbTruckDelivery}
          label="Delivery"
          link="/admin/delivery"
        />
        <SidebarItem icon={TbBoxSeam} label="Products" link="/admin/products" />
        <SidebarItem
          icon={MdOutlineInventory2}
          label="Inventory"
          link="/admin/inventory"
        />
        <SidebarItem
          icon={LuWarehouse}
          label="Suppliers"
          link="/admin/suppliers"
        />
        <SidebarItem
          icon={TbUserDollar}
          label="Customers"
          link="/admin/customers"
        />
        <SidebarItem icon={GrGroup} label="Staffs" link="/admin/staffs" />
        <SidebarItem icon={TbBasketDollar} label="Sales" link="/admin/sales" />
        <SidebarItem
          icon={TbTruckReturn}
          label="Returns"
          link="/admin/returns"
        />
        <SidebarItem icon={TbHistory} label="Logs" link="/admin/logs" />
        <SidebarItem
          icon={TbFileReport}
          label="Reports"
          link="/admin/reports"
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
  transition: width 0.3s;
  min-width: 200px;
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

export default Sidebar;
