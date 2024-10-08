// src/constants/sidebarItems.js
import { TbLayoutDashboard, TbTruckDelivery, TbChevronRight, TbUserDollar, TbBasketDollar, TbTruckReturn, TbHistory, TbFileReport, } from "react-icons/tb"; // Import the arrow icon
import { MdOutlineInventory2, MdOutlineShoppingCart } from "react-icons/md";
import { LuWarehouse, LuBox } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";

// Example Sidebar Items
export const superAdminSidebarItems = [
  { icon: TbLayoutDashboard, label: "Dashboard", link: "/superadmin/dashboard" },
  {
    icon: MdOutlineShoppingCart, label: "Order", link: "/superadmin/orders",
    dropdown: [
      {
        icon: TbChevronRight, label: "Requests", link: "/superadmin/orders/request",
      },
      {
        icon: TbChevronRight, label: "Customer", link: "/superadmin/orders/customer-order",
      },
      {
        icon: TbChevronRight, label: "Purchase", link: "/superadmin/orders/purchase-order",
      },
    ],
  },
  { icon: TbTruckDelivery, label: "Delivery", link: "/superadmin/delivery" },
  { icon: LuBox, label: "Product", link: "/superadmin/products" },
  { icon: MdOutlineInventory2, label: "Inventory", link: "/superadmin/inventory" },
  { icon: LuWarehouse, label: "Supplier", link: "/superadmin/suppliers" },
  { icon: TbUserDollar, label: "Customer", link: "/superadmin/customers" },
  { icon: GrGroup, label: "User", link: "/superadmin/users" },
  { icon: TbBasketDollar, label: "Sales", link: "/superadmin/sales" },
  { icon: TbTruckReturn, label: "Return", link: "/superadmin/returns" },
  { icon: TbHistory, label: "Logs", link: "/superadmin/logs" },
  { icon: TbFileReport, label: "Report", link: "/superadmin/reports" },
];

export const staffSidebarItems = [
  { icon: TbLayoutDashboard, label: "Dashboard", link: "/staff/dashboard" },
  {
    icon: MdOutlineShoppingCart, label: "Order", link: "/staff/orders",
    dropdown: [
      { icon: TbChevronRight, label: "Customer", link: "/staff/orders/customer-order" },
    ],
  },
  { icon: TbTruckDelivery, label: "Delivery", link: "/staff/delivery" },
  { icon: LuBox, label: "Product", link: "/staff/products" },
  { icon: MdOutlineInventory2, label: "Inventory", link: "/staff/inventory" },
  { icon: TbUserDollar, label: "Customer", link: "/staff/customers" },
  { icon: TbTruckReturn, label: "Return", link: "/staff/returns" },
  { icon: TbFileReport, label: "Report", link: "/staff/reports" },
];
