const OUTBOUND_DELIVERY = {
    OUTBOUND_DELIVERY: [
      {
        OUTBOUND_DEL_ID: "OUT001",
        OUTBOUND_DEL_SHIPPED_DATE: "2024-08-05",
        OUTBOUND_DEL_DATE_CUST_RCVD: "2024-08-10",
        OUTBOUND_DEL_STATUS: "Delivered",
        OUTBOUND_DEL_DLVRY_OPT: "Standard",
        OUTBOUND_DEL_DLVRY_QTY: 20,
        OUTBOUND_DEL_CITY: "Los Angeles",
        OUTBOUND_DEL_PROVINCE: "CA",
        OUTBOUND_DEL_DATECREATED: "2024-08-01",
        OUTBOUND_DEL_DATEUPDATED: "2024-08-02",
        OUTBOUND_DEL_CREATED_USER_ID: "USR001",
        SALES_ORDER_ID: "SO001",
        CUSTOMER_ID: "CUST001",
      },
      {
        OUTBOUND_DEL_ID: "OUT002",
        OUTBOUND_DEL_SHIPPED_DATE: "2024-08-15",
        OUTBOUND_DEL_DATE_CUST_RCVD: null, // Not yet received
        OUTBOUND_DEL_STATUS: "In Transit",
        OUTBOUND_DEL_DLVRY_OPT: "Express",
        OUTBOUND_DEL_DLVRY_QTY: 10,
        OUTBOUND_DEL_CITY: "San Francisco",
        OUTBOUND_DEL_PROVINCE: "CA",
        OUTBOUND_DEL_DATECREATED: "2024-08-10",
        OUTBOUND_DEL_DATEUPDATED: "2024-08-15",
        OUTBOUND_DEL_CREATED_USER_ID: "USR002",
        SALES_ORDER_ID: "SO002",
        CUSTOMER_ID: "CUST002",
      },
    ],
    OUTBOUND_DELIVERY_DETAILS: [
      {
        OUTBOUND_DEL_DETAIL_ID: "OUT_DET001",
        OUTBOUND_DEL_ID: "OUT001",
        PROD_ID: "P002", // Anti-Flea Shampoo
        PROD_NAME: "Anti-Flea Shampoo",
        OUTBOUND_DEL_DETAIL_QTY_SHIPPED: 5,
        OUTBOUND_DEL_DETAIL_EXPIRY_DATE: "2025-01-01",
      },
      {
        OUTBOUND_DEL_DETAIL_ID: "OUT_DET002",
        OUTBOUND_DEL_ID: "OUT001",
        PROD_ID: "P005", // Wound Care Ointment
        PROD_NAME: "Wound Care Ointment",
        OUTBOUND_DEL_DETAIL_QTY_SHIPPED: 15,
        OUTBOUND_DEL_DETAIL_EXPIRY_DATE: "2025-06-10",
      },
      {
        OUTBOUND_DEL_DETAIL_ID: "OUT_DET003",
        OUTBOUND_DEL_ID: "OUT002",
        PROD_ID: "P003", // Syringes Pack
        PROD_NAME: "Syringes Pack",
        OUTBOUND_DEL_DETAIL_QTY_SHIPPED: 8,
        OUTBOUND_DEL_DETAIL_EXPIRY_DATE: "2025-12-12",
      },
      {
        OUTBOUND_DEL_DETAIL_ID: "OUT_DET004",
        OUTBOUND_DEL_ID: "OUT002",
        PROD_ID: "P004", // Veterinary Thermometer
        PROD_NAME: "Veterinary Thermometer",
        OUTBOUND_DEL_DETAIL_QTY_SHIPPED: 2,
        OUTBOUND_DEL_DETAIL_EXPIRY_DATE: "2026-05-01",
      },
    ],
  };
  
  export default OUTBOUND_DELIVERY;
  