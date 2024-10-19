//sidebaritems.js
import {
  TbLayoutDashboard,
  TbTruckDelivery,
  TbChevronRight,
  TbUserDollar,
  TbBasketDollar,
  TbTruckReturn,
  TbHistory,
  TbFileReport,
} from "react-icons/tb";
import { MdOutlineInventory2, MdOutlineShoppingCart } from "react-icons/md";
import { LuWarehouse, LuBox } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";

// Sidebar Items for SuperAdmin
export const superadminSidebarItems = [
  {
    icon: TbLayoutDashboard,
    label: "Dashboard",
    link: "/superadmin/dashboard",
  },
  {
    icon: MdOutlineShoppingCart,
    label: "Order",
    dropdown: [
      {
        icon: TbChevronRight,
        label: "Request",
        link: "/superadmin/orders/request",
      },
      {
        icon: TbChevronRight,
        label: "Customer",
        link: "/superadmin/orders/customer-order",
      },
      {
        icon: TbChevronRight,
        label: "Purchase",
        link: "/superadmin/orders/purchase-order",
      },
    ],
  },
  { icon: TbTruckDelivery, label: "Delivery", link: "/superadmin/delivery" },
  {
    icon: LuBox,
    label: "Product",
    dropdown: [
      {
        icon: TbChevronRight,
        label: "Total Products",
        link: "/superadmin/products",
      },
      {
        icon: TbChevronRight,
        label: "Categories",
        link: "/superadmin/categories",
      },
    ],
  },
  {
    icon: MdOutlineInventory2,
    label: "Inventory",
    link: "/superadmin/inventory",
  },
  { icon: LuWarehouse, label: "Supplier", link: "/superadmin/suppliers" },
  { icon: TbUserDollar, label: "Customer", link: "/superadmin/customers" },
  { icon: GrGroup, label: "User", link: "/superadmin/users" },
  { icon: TbBasketDollar, label: "Sales", link: "/superadmin/sales" },
  { icon: TbTruckReturn, label: "Return", link: "/superadmin/returns" },
  { icon: TbHistory, label: "Logs", link: "/superadmin/logs" },
  { icon: TbFileReport, label: "Report", link: "/superadmin/reports" },
];

// Sidebar Items for Admin
export const adminSidebarItems = [
  { icon: TbLayoutDashboard, label: "Dashboard", link: "/admin/dashboard" },
  {
    icon: MdOutlineShoppingCart,
    label: "Order",
    dropdown: [
      {
        icon: TbChevronRight,
        label: "Requests",
        link: "/admin/orders/request",
      },
      {
        icon: TbChevronRight,
        label: "Customer",
        link: "/admin/orders/customer-order",
      },
      {
        icon: TbChevronRight,
        label: "Purchase",
        link: "/admin/orders/purchase-order",
      },
    ],
  },
  { icon: TbTruckDelivery, label: "Delivery", link: "/admin/delivery" },
  {
    icon: LuBox,
    label: "Product",
    dropdown: [
      {
        icon: TbChevronRight,
        label: "Total Products",
        link: "/admin/products",
      },
      {
        icon: TbChevronRight,
        label: "Categories",
        link: "/admin/categories",
      },
    ],
  },
  { icon: MdOutlineInventory2, label: "Inventory", link: "/admin/inventory" },
  { icon: LuWarehouse, label: "Supplier", link: "/admin/suppliers" },
  { icon: TbUserDollar, label: "Customer", link: "/admin/customers" },
  { icon: GrGroup, label: "User", link: "/admin/users" },
  { icon: TbBasketDollar, label: "Sales", link: "/admin/sales" },
  { icon: TbTruckReturn, label: "Return", link: "/admin/returns" },
  { icon: TbHistory, label: "Logs", link: "/admin/logs" },
  { icon: TbFileReport, label: "Report", link: "/admin/reports" },
];

// Sidebar Items for Staff
export const staffSidebarItems = [
  { icon: TbLayoutDashboard, label: "Dashboard", link: "/staff/dashboard" },
  {
    icon: MdOutlineShoppingCart,
    label: "Order",
    dropdown: [
      {
        icon: TbChevronRight,
        label: "Request",
        link: "/staff/orders/request",
      },
      {
        icon: TbChevronRight,
        label: "Customer",
        link: "/staff/orders/customer-order",
      },
    ],
  },
  { icon: TbTruckDelivery, label: "Delivery", link: "/staff/delivery" },
  {
    icon: LuBox,
    label: "Product",
    dropdown: [
      {
        icon: TbChevronRight,
        label: "Total Products",
        link: "/staff/products",
      },
      {
        icon: TbChevronRight,
        label: "Categories",
        link: "/staff/categories",
      },
    ],
  },
  { icon: MdOutlineInventory2, label: "Inventory", link: "/staff/inventory" },
  { icon: TbUserDollar, label: "Customer", link: "/staff/customers" },
  { icon: TbTruckReturn, label: "Return", link: "/staff/returns" },
  { icon: TbFileReport, label: "Report", link: "/staff/reports" },
];
