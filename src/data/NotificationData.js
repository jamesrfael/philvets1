export const notificationData = [
  {
    id: 1,
    title: "Low Stock Alert for Heartworm Prevention - Canine",
    message:
      "The stock level for Heartworm Prevention Tablets - Canine (Large) has fallen below the minimum threshold of 10 units. Please review and reorder to avoid shortages.",
    timestamp: "October 21, 2024 - 08:30:00 AM",
    action: { label: "Reorder Now", link: "/inventory/reorder/heartworm-canine" },
    priority: "High",
  },
  {
    id: 2,
    title: "New Order Received - Clinic ABC",
    message:
      "A new order has been received from Clinic ABC for 50 units of Feline Flea Prevention Spot Treatment. Order ID: 98765.",
    timestamp: "October 21, 2024 - 09:45:00 AM",
    action: { label: "View Order", link: "/orders/98765" },
    priority: "Medium",
  },
  {
    id: 3,
    title: "Shipment Tracking Update - Rabies Vaccine",
    message:
      "Your shipment for Rabies Vaccine (Canine) - 100 doses is out for delivery and expected to arrive on October 22, 2024.",
    timestamp: "October 21, 2024 - 10:30:00 AM",
    action: { label: "Track Shipment", link: "/shipments/98765" },
    priority: "Medium",
  },
  {
    id: 4,
    title: "Inventory Count Completed - Warehouse A",
    message:
      "The physical inventory count for Warehouse A has been completed. Please review the results for any discrepancies in product counts or expiration dates.",
    timestamp: "October 21, 2024 - 11:00:00 AM",
    action: { label: "View Results", link: "/inventory/count-results/warehouse-a" },
    priority: "Low",
  },
  {
    id: 5,
    title: "System Maintenance Scheduled",
    message:
      "The system will undergo maintenance on October 23, 2024, from 02:00 AM to 04:00 AM. Please plan accordingly, as access will be limited during this time.",
    timestamp: "October 21, 2024 - 12:15:00 PM",
    action: { label: "More Details", link: "/system/maintenance" },
    priority: "Low",
  },
  {
    id: 6,
    title: "New User Added - Clinic XYZ",
    message: "A new user, Dr. Jane Smith, has been added to the system. User ID: 10234.",
    timestamp: "October 21, 2024 - 01:30:00 PM",
    action: { label: "View User", link: "/users/10234" },
    priority: "Low",
  },
  {
    id: 7,
    title: "Expiration Alert - Canine Distemper Vaccine",
    message:
      "The stock of Canine Distemper Vaccine (20 doses) is nearing its expiration date. The product will expire on October 30, 2024.",
    timestamp: "October 21, 2024 - 02:00:00 PM",
    action: { label: "View Product", link: "/inventory/products/canine-distemper" },
    priority: "High",
  },
  {
    id: 8,
    title: "Failed Transaction - Clinic DEF",
    message:
      "A transaction failed during processing for Clinic DEF's order of Parvovirus Vaccines. Please review the logs and retry the transaction.",
    timestamp: "October 21, 2024 - 03:15:00 PM",
    action: { label: "View Logs", link: "/transactions/logs" },
    priority: "High",
  },
  {
    id: 9,
    title: "Compliance Issue - Expired Products",
    message:
      "Several products in the inventory have passed their expiration dates. Immediate removal from stock is required.",
    timestamp: "October 21, 2024 - 04:00:00 PM",
    action: { label: "Review Compliance", link: "/compliance/issues" },
    priority: "High",
  },
  {
    id: 10,
    title: "Stock Adjustment Completed - Feline Antibiotics",
    message:
      "A stock adjustment has been made for Feline Antibiotics (Amoxicillin 100mg). Review the changes and verify the quantities.",
    timestamp: "October 21, 2024 - 05:00:00 PM",
    action: { label: "View Adjustment", link: "/inventory/adjustments/amoxicillin" },
    priority: "Medium",
  },
];
