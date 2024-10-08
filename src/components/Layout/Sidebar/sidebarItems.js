// src/constants/sidebarItems.js
import { TbLayoutDashboard, TbTruckDelivery, TbChevronRight, TbUserDollar, TbBasketDollar, TbTruckReturn, TbHistory, TbFileReport, } from "react-icons/tb"; // Import the arrow icon
import { MdOutlineInventory2, MdOutlineShoppingCart } from "react-icons/md";
import { LuWarehouse, LuBox } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";

// Example Sidebar Items
export const adminSidebarItems = [
  { icon: TbLayoutDashboard, label: "Dashboard", link: "/super-admin/dashboard" },
  {
    icon: MdOutlineShoppingCart, label: "Order", link: "/super-admin/orders",
    dropdown: [
      {
        icon: TbChevronRight, label: "Requests", link: "/super-admin/orders/request",
      },
      {
        icon: TbChevronRight, label: "Customer", link: "/super-admin/orders/customer-order",
      },
      {
        icon: TbChevronRight, label: "Purchase", link: "/super-admin/orders/purchase-order",
      },
    ],
  },
  { icon: TbTruckDelivery, label: "Delivery", link: "/super-admin/delivery" },
  { icon: LuBox, label: "Product", link: "/super-admin/products" },
  { icon: MdOutlineInventory2, label: "Inventory", link: "/super-admin/inventory" },
  { icon: LuWarehouse, label: "Supplier", link: "/super-admin/suppliers" },
  { icon: TbUserDollar, label: "Customer", link: "/super-admin/customers" },
  { icon: GrGroup, label: "User", link: "/super-admin/users" },
  { icon: TbBasketDollar, label: "Sales", link: "/super-admin/sales" },
  { icon: TbTruckReturn, label: "Return", link: "/super-admin/returns" },
  { icon: TbHistory, label: "Logs", link: "/super-admin/logs" },
  { icon: TbFileReport, label: "Report", link: "/super-admin/reports" },
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
