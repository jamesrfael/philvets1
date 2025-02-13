// src/data/deliveryData.js

export const DELIVERY = [
  {
    DELIVERY_NAME: "Christine",
    DELIVERY_DATE: "Feb 14, 2023",
    DELIVERY_TYPE: "Sales",
    DELIVERY_STATUS: "Completed",
    COMPLETED_DATE: "Feb 20, 2023",
    DISCOUNT: "10%",
    DELIVERY_OPTION: "Standard",
    PAYMENT_TERM: "Net 30",
    PAYMENT_STATUS: "Paid",
    CLIENT_ID: "C001",
    ORDER_DETAILS: [
      { PRODUCT_NAME: "Dog Food - Premium", QUANTITY: 3, PRICE: 100 },
      { PRODUCT_NAME: "Cat Litter - Clumping", QUANTITY: 7, PRICE: 50 },
      { PRODUCT_NAME: "Flea Treatment - Medium Dogs", QUANTITY: 2, PRICE: 75 },
      { PRODUCT_NAME: "Cat Medication - Allergy Relief", QUANTITY: 5, PRICE: 150 },
      { PRODUCT_NAME: "Dog Vitamins - Joint Health", QUANTITY: 10, PRICE: 50 },
      { PRODUCT_NAME: "Bird Seed Mix - Premium", QUANTITY: 3, PRICE: 80 },
    ],
  },
  {
    DELIVERY_NAME: "John Doe",
    DELIVERY_DATE: "Mar 2, 2023",
    DELIVERY_TYPE: "Sales",
    DELIVERY_STATUS: "Pending",
    COMPLETED_DATE: "",
    DISCOUNT: "5%",
    DELIVERY_OPTION: "Express",
    PAYMENT_TERM: "Net 15",
    PAYMENT_STATUS: "Unpaid",
    CLIENT_ID: "C002",
    ORDER_DETAILS: [
      { PRODUCT_NAME: "Cat Medication - Allergy Relief", QUANTITY: 5, PRICE: 150 },
      { PRODUCT_NAME: "Dog Vitamins - Joint Health", QUANTITY: 10, PRICE: 50 },
      { PRODUCT_NAME: "Bird Seed Mix - Premium", QUANTITY: 3, PRICE: 80 },
    ],
  },
  {
    DELIVERY_NAME: "Alice Smith",
    DELIVERY_DATE: "Jan 20, 2023",
    DELIVERY_TYPE: "Supplier",
    DELIVERY_STATUS: "Cancelled",
    COMPLETED_DATE: "",
    DISCOUNT: "0%",
    DELIVERY_OPTION: "Standard",
    PAYMENT_TERM: "Net 30",
    PAYMENT_STATUS: "Cancelled",
    CLIENT_ID: "C003",
    ORDER_DETAILS: [
      { PRODUCT_NAME: "Dog Shampoo - Sensitive Skin", QUANTITY: 4, PRICE: 100 },
      { PRODUCT_NAME: "Cat Flea Collars", QUANTITY: 4, PRICE: 50 },
      { PRODUCT_NAME: "Hamster Cage - Large", QUANTITY: 2, PRICE: 75 },
    ],
  },
  {
    DELIVERY_NAME: "Michael Johnson",
    DELIVERY_DATE: "Apr 10, 2023",
    DELIVERY_TYPE: "Sales",
    DELIVERY_STATUS: "Completed",
    COMPLETED_DATE: "Apr 15, 2023",
    DISCOUNT: "15%",
    DELIVERY_OPTION: "Standard",
    PAYMENT_TERM: "Net 45",
    PAYMENT_STATUS: "Paid",
    CLIENT_ID: "C004",
    ORDER_DETAILS: [
      { PRODUCT_NAME: "Dog Bed - Orthopedic", QUANTITY: 6, PRICE: 75 },
      { PRODUCT_NAME: "Cat Scratching Post", QUANTITY: 6, PRICE: 25 },
      { PRODUCT_NAME: "Aquarium Kit - 20 Gallon", QUANTITY: 4, PRICE: 50 },
    ],
  },
  {
    DELIVERY_NAME: "Emily Davis",
    DELIVERY_DATE: "May 5, 2023",
    DELIVERY_TYPE: "Sales",
    DELIVERY_STATUS: "Completed",
    COMPLETED_DATE: "May 10, 2023",
    DISCOUNT: "20%",
    DELIVERY_OPTION: "Express",
    PAYMENT_TERM: "Net 60",
    PAYMENT_STATUS: "Paid",
    CLIENT_ID: "C005",
    ORDER_DETAILS: [
      { PRODUCT_NAME: "Horse Supplements - Performance", QUANTITY: 10, PRICE: 60 },
      { PRODUCT_NAME: "Dog Training Collar", QUANTITY: 10, PRICE: 40 },
      { PRODUCT_NAME: "Pet Carrier - Airline Approved", QUANTITY: 5, PRICE: 120 },
    ],
  },
];
