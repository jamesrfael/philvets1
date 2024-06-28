// src/data/SalesData.js

export const sampleSales = [
    {
      id: "S001",
      customer: "John Doe",
      date: "2023-06-01",
      orderNumber: "ORD001",
      totalAmount: 120.50,
      status: "Completed",
      products: [
        { name: "Product A", quantity: 2, price: 30.00 },
        { name: "Product B", quantity: 1, price: 60.50 },
      ],
    },
    {
      id: "S002",
      customer: "Jane Smith",
      date: "2023-06-02",
      orderNumber: "ORD002",
      totalAmount: 85.75,
      status: "Pending",
      products: [
        { name: "Product C", quantity: 1, price: 40.00 },
        { name: "Product D", quantity: 3, price: 15.25 },
      ],
    },
    // Add more sample sales data as needed
  ];
  
  export const sampleCustomers = [
    {
      id: "C001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "09478925611",
      totalSpend: 120.50,
    },
    {
      id: "C002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "09213456785",
      totalSpend: 85.75,
    },
    // Add more sample customers as needed
  ];
  
  export const sampleProducts = [
    { id: "P001", name: "Product A", price: 30.00 },
    { id: "P002", name: "Product B", price: 60.50 },
    { id: "P003", name: "Product C", price: 40.00 },
    { id: "P004", name: "Product D", price: 15.25 },
    // Add more sample products as needed
  ];
  