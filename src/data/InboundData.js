const INBOUND_DELIVERY = {
    INBOUND_DELIVERY: [
      {
        INBOUND_DEL_ID: "INB001",
        INBOUND_DEL_DATE_RCVD: "2024-08-01",
        INBOUND_DEL_STATUS: "Completed",
        SUPPLIER_ID: "SUP001", // Supplier ID for tracking
        INBOUND_DEL_CREATED_USER_ID: "USR001", // User who created this delivery
      },
      {
        INBOUND_DEL_ID: "INB002",
        INBOUND_DEL_DATE_RCVD: "2024-08-10",
        INBOUND_DEL_STATUS: "Pending",
        SUPPLIER_ID: "SUP002",
        INBOUND_DEL_CREATED_USER_ID: "USR002",
      },
    ],
    INBOUND_DELIVERY_DETAILS: [
      {
        INBOUND_DEL_DETAIL_ID: "DEL001",
        INBOUND_DEL_ID: "INB001",
        PROD_ID: "P001", // Amoxicillin
        PROD_NAME: "Amoxicillin",
        INBOUND_DEL_DETAIL_QTY_DLVRD: 50,
        INBOUND_DEL_DETAIL_EXPIRY_DATE: "2025-08-01",
      },
      {
        INBOUND_DEL_DETAIL_ID: "DEL002",
        INBOUND_DEL_ID: "INB001",
        PROD_ID: "P006", // Cephalexin
        PROD_NAME: "Cephalexin",
        INBOUND_DEL_DETAIL_QTY_DLVRD: 30,
        INBOUND_DEL_DETAIL_EXPIRY_DATE: "2025-08-01",
      },
      {
        INBOUND_DEL_DETAIL_ID: "DEL003",
        INBOUND_DEL_ID: "INB002",
        PROD_ID: "P007", // Ciprofloxacin
        PROD_NAME: "Ciprofloxacin",
        INBOUND_DEL_DETAIL_QTY_DLVRD: 40,
        INBOUND_DEL_DETAIL_EXPIRY_DATE: "2025-08-15",
      },
      {
        INBOUND_DEL_DETAIL_ID: "DEL004",
        INBOUND_DEL_ID: "INB002",
        PROD_ID: "P008", // Doxycycline
        PROD_NAME: "Doxycycline",
        INBOUND_DEL_DETAIL_QTY_DLVRD: 60,
        INBOUND_DEL_DETAIL_EXPIRY_DATE: "2026-01-10",
      },
    ],
  };
  
  export default INBOUND_DELIVERY;
  