// src/constants/sidebarItems.js
import { TbLayoutDashboard, TbTruckDelivery, TbUserDollar, TbBasketDollar, TbTruckReturn, TbHistory, TbFileReport, } from "react-icons/tb"; // Import the arrow icon
import { MdOutlineInventory2, MdOutlineShoppingCart } from "react-icons/md";
import { LuWarehouse, LuBox } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";

// Example Sidebar Items
export const adminSidebarItems = [
  { icon: TbLayoutDashboard, label: "Dashboard", link: "/admin/dashboard" },
  { 
    icon: MdOutlineShoppingCart, 
    label: "Order", 
    link: "/admin/orders", 
    dropdown: [
      { icon: TbFileReport, label: "Pending Requests", link: "/admin/orders/pending-request" },
      { icon: TbBasketDollar, label: "Sales", link: "/admin/orders/sales" },
      { icon: TbTruckReturn, label: "Purchase", link: "/admin/orders/purchase" },
    ]
  },
  { icon: TbTruckDelivery, label: "Delivery", link: "/admin/delivery" },
  { icon: LuBox, label: "Product", link: "/admin/products" },
  { icon: MdOutlineInventory2, label: "Inventory", link: "/admin/inventory" },
  { icon: LuWarehouse, label: "Supplier", link: "/admin/suppliers" },
  { icon: TbUserDollar, label: "Customer", link: "/admin/customers" },
  { icon: GrGroup, label: "Staff", link: "/admin/staffs" },
  { icon: TbBasketDollar, label: "Sales", link: "/admin/sales" },
  { icon: TbTruckReturn, label: "Return", link: "/admin/returns" },
  { icon: TbHistory, label: "Logs", link: "/admin/logs" },
  { icon: TbFileReport, label: "Report", link: "/admin/reports" },
];

export const staffSidebarItems = [
  { icon: TbLayoutDashboard, label: "Dashboard", link: "/staff/dashboard" },
  { icon: MdOutlineShoppingCart, label: "Order", link: "/staff/orders",
    dropdown: [
      { icon: TbFileReport, label: "Pending Request", link: "/staff/orders/pending-request" },
      { icon: TbBasketDollar, label: "Sales", link: "/staff/orders/sales" },
    ],
   },
  { icon: TbTruckDelivery, label: "Delivery", link: "/staff/delivery" },
  { icon: LuBox, label: "Product", link: "/staff/products" },
  { icon: MdOutlineInventory2, label: "Inventory", link: "/staff/inventory" },
  { icon: TbUserDollar, label: "Customer", link: "/staff/customers" },
  { icon: TbTruckReturn, label: "Return", link: "/staff/returns" },
  { icon: TbFileReport, label: "Report", link: "/staff/reports" },
];
