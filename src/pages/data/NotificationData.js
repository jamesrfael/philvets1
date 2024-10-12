export const notificationData = [
  {
    id: 1,
    title: "Low Stock Alert for Product A",
    message:
      "The stock level for Product A has fallen below the minimum threshold of 15 units. Please review and reorder as necessary.",
    timestamp: "2024-09-18T09:00:00Z",
    action: { label: "Reorder Now", link: "/inventory/reorder" },
    priority: "High",
  },
  {
    id: 2,
    title: "Order Received",
    message:
      "A new order has been received from Customer XYZ. Order ID: 12345.",
    timestamp: "2024-09-18T10:15:00Z",
    action: { label: "View Order", link: "/orders/12345" },
    priority: "Medium",
  },
  {
    id: 3,
    title: "Shipment Tracking Update",
    message:
      "Your shipment for Order ID: 12345 is out for delivery and is expected to arrive on 2024-09-20.",
    timestamp: "2024-09-18T11:00:00Z",
    action: { label: "Track Shipment", link: "/shipments/12345" },
    priority: "Medium",
  },
  {
    id: 4,
    title: "Inventory Count Completed",
    message:
      "The physical inventory count for the warehouse has been completed. Review the results for discrepancies.",
    timestamp: "2024-09-18T12:00:00Z",
    action: { label: "View Results", link: "/inventory/count-results" },
    priority: "Low",
  },
  {
    id: 5,
    title: "System Maintenance Scheduled",
    message:
      "The system will undergo maintenance on 2024-09-20 from 2:00 AM to 4:00 AM. Please plan accordingly.",
    timestamp: "2024-09-18T13:00:00Z",
    action: { label: "More Details", link: "/system/maintenance" },
    priority: "Low",
  },
  {
    id: 6,
    title: "User Added",
    message: "A new user has been added to the system. User ID: 67890.",
    timestamp: "2024-09-18T14:00:00Z",
    action: { label: "View User", link: "/users/67890" },
    priority: "Low",
  },
  {
    id: 7,
    title: "Expiration Reminder for Product B",
    message:
      "Product B is nearing its expiration date. The product will expire on 2024-09-25.",
    timestamp: "2024-09-18T15:00:00Z",
    action: { label: "View Product", link: "/inventory/products/B" },
    priority: "High",
  },
  {
    id: 8,
    title: "Failed Transaction Alert",
    message:
      "A transaction reded during processing. Please check the logs for more details.",
    timestamp: "2024-09-18T16:00:00Z",
    action: { label: "View Logs", link: "/transactions/logs" },
    priority: "High",
  },
  {
    id: 9,
    title: "Compliance Issue Detected",
    message:
      "A compliance issue has been detected in the current inventory. Immediate action required.",
    timestamp: "2024-09-18T17:00:00Z",
    action: { label: "Review Compliance", link: "/compliance/issues" },
    priority: "High",
  },
  {
    id: 10,
    title: "Stock Adjustment Made",
    message:
      "A stock adjustment has been made for Product C. Review the changes and verify if necessary.",
    timestamp: "2024-09-18T18:00:00Z",
    action: { label: "View Adjustment", link: "/inventory/adjustments/C" },
    priority: "Medium",
  },
];
