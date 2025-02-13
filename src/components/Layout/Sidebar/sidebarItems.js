// src/components/sidebaritems.js

import { TbLayoutDashboard } from "react-icons/tb";
import { FaUsers, FaCog, FaUser, FaMoneyBillWave, FaFileAlt, FaCalendarCheck } from "react-icons/fa";
  
  // Sidebar Items for SuperAdmin
  export const adminSidebarItems = [
    {
      icon: TbLayoutDashboard,
      label: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      icon: FaUser,
      label: "Employees",
      dropdown: [
        {
          icon: FaUsers,
          label: "Members",
          link: "/admin/members",
        },
        {
          icon: FaMoneyBillWave,
          label: "Payroll",
          link: "/admin/payroll",
        },
        {
          icon: FaFileAlt,
          label: "Records",
          link: "/admin/records",
        },
        {
          icon: FaCalendarCheck,
          label: "13th Month",
          link: "/admin/13thmonthpay",
        },
      ],
    },
    {
      icon: FaCog,
      label: "Settings",
      link: "/admin/settings",
    },
  ];
  